import React, { useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, Modal } from 'react-native';
import { Colors, Fonts } from '../constants';
import { Header } from '../components/Header';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import testData from '../data/testData.json';
import { chatWithOpenAI, saveOpenAIKey } from '../services/openai';

interface UIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const SearchScreen: React.FC = () => {
  const [messages, setMessages] = useState<UIMessage[]>([{
    id: 'sys-1',
    role: 'system',
    content: 'You are an assistant for the Daytona Beach mobile application. Only use information from the mobile app content provided in context and public pages on daytonabeach.gov. If a query is out of scope, say you do not have enough information and suggest visiting daytonabeach.gov in a browser. Keep answers concise for mobile. '
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const listRef = useRef<FlatList<UIMessage>>(null);

  const appContext = useMemo(() => {
    // Provide compact app data context to the model
    const highlights = testData.cityHighlights?.map(h => ({ title: h.title, date: h.date, category: h.category })) ?? [];
    const events = testData.events?.map(e => ({ title: e.title, date: e.date, time: e.time, location: e.location })) ?? [];
    const parks = testData.parks?.map(p => ({ name: p.name, address: p.address, amenities: p.amenities })) ?? [];
    const services = testData.services?.map(s => ({ title: s.title, category: s.category, availability: s.availability })) ?? [];
    return { highlights, events, parks, services };
  }, []);

  const systemPreamble = useMemo(() => {
    return `SYSTEM RULES:\n- Only answer using: (1) mobile app context below, and (2) public info from daytonabeach.gov.\n- If the answer would require other sources, say you lack information.\n- Be concise.\n\nMOBILE APP CONTEXT (summaries):\n${JSON.stringify(appContext).slice(0, 8000)}`;
  }, [appContext]);

  const send = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    const userMsg: UIMessage = { id: `u-${Date.now()}`, role: 'user', content: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const history = [
        { role: 'system' as const, content: systemPreamble },
        ...messages.filter(m => m.role !== 'system').map(m => ({ role: m.role, content: m.content })),
        { role: 'user' as const, content: trimmed },
      ];
      const answer = await chatWithOpenAI(history);
      const aiMsg: UIMessage = { id: `a-${Date.now()}`, role: 'assistant', content: answer };
      setMessages(prev => [...prev, aiMsg]);
      requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
    } catch (e: any) {
      const errMsg: UIMessage = { id: `e-${Date.now()}`, role: 'assistant', content: `Error: ${e?.message || 'Failed to fetch response.'}` };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const saveKey = async (k: string) => {
    const key = k.trim();
    if (!key) return;
    await saveOpenAIKey(key);
    setShowKeyModal(false);
  };

  const renderItem = ({ item }: { item: UIMessage }) => {
    const isUser = item.role === 'user';
    const isSystem = item.role === 'system';
    return (
      <View style={[styles.msgRow, isUser ? styles.msgRowRight : styles.msgRowLeft]}>
        {!isUser && <Icon name={isSystem ? 'info' : 'smart-toy'} size={18} color={Colors.mutedForeground} style={styles.msgIcon} />}
        <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAssistant]}>
          <Text style={styles.msgText}>{item.content}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Search" showBack />
      <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={styles.flex}>
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => m.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        />
        <View style={styles.inputBar}>
          <TouchableOpacity onPress={() => setShowKeyModal(true)} style={styles.keyBtn} accessibilityLabel="Set OpenAI API key">
            <Icon name="vpn-key" size={20} color={Colors.headerForeground} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Ask about events, parks, or services..."
            placeholderTextColor={Colors.mutedForeground}
            multiline
          />
          <TouchableOpacity onPress={send} style={styles.sendBtn} disabled={loading} accessibilityLabel="Send message">
            {loading ? <ActivityIndicator color="white" /> : <Icon name="send" size={20} color="white" />}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Modal visible={showKeyModal} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Enter OpenAI API Key</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="sk-..."
              placeholderTextColor={Colors.mutedForeground}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              onSubmitEditing={(e) => saveKey(e.nativeEvent.text)}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setShowKeyModal(false)} style={[styles.modalBtn, styles.modalCancel]}>
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {/* handled by submit */}} style={[styles.modalBtn, styles.modalSave]}>
                <Text style={[styles.modalBtnText, styles.modalSaveText]}>Save</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalHint}>Your key is stored securely on this device via Expo SecureStore.</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  listContent: { padding: 12 },
  msgRow: { flexDirection: 'row', marginBottom: 8, alignItems: 'flex-end' },
  msgRowLeft: { justifyContent: 'flex-start' },
  msgRowRight: { justifyContent: 'flex-end' },
  msgIcon: { marginRight: 6 },
  bubble: { maxWidth: '80%', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
  bubbleAssistant: { backgroundColor: Colors.secondary },
  bubbleUser: { backgroundColor: Colors.primary },
  msgText: { color: 'white', fontSize: Fonts.sizes.base },
  inputBar: { flexDirection: 'row', alignItems: 'center', padding: 8, borderTopWidth: 1, borderTopColor: Colors.border, backgroundColor: Colors.cardBackground },
  keyBtn: { backgroundColor: Colors.secondaryBlue, padding: 8, borderRadius: 8, marginRight: 8 },
  input: { flex: 1, minHeight: 40, maxHeight: 110, color: Colors.cardForeground, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: Colors.secondary, borderRadius: 8 },
  sendBtn: { marginLeft: 8, backgroundColor: Colors.accent, padding: 10, borderRadius: 8 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center', padding: 20 },
  modalCard: { width: '100%', backgroundColor: Colors.cardBackground, borderRadius: 12, padding: 16 },
  modalTitle: { color: Colors.cardForeground, fontWeight: Fonts.weights.bold, fontSize: Fonts.sizes.lg, marginBottom: 12 },
  modalInput: { backgroundColor: Colors.secondary, color: Colors.cardForeground, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12, gap: 8 },
  modalBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  modalCancel: { backgroundColor: Colors.secondary },
  modalSave: { backgroundColor: Colors.primary },
  modalBtnText: { color: Colors.cardForeground },
  modalSaveText: { color: Colors.primaryForeground },
  modalHint: { color: Colors.mutedForeground, fontSize: Fonts.sizes.xs, marginTop: 8 },
});
