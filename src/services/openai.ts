import * as SecureStore from 'expo-secure-store';

const OPENAI_SECURE_KEY = 'OPENAI_API_KEY';

export async function saveOpenAIKey(key: string) {
  await SecureStore.setItemAsync(OPENAI_SECURE_KEY, key);
}

export async function getOpenAIKey(): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(OPENAI_SECURE_KEY);
  } catch (_) {
    return null;
  }
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function chatWithOpenAI(messages: ChatMessage[], model?: string): Promise<string> {
  const apiKey = (await getOpenAIKey()) || process.env.EXPO_PUBLIC_OPENAI_API_KEY || '';
  if (!apiKey) throw new Error('OpenAI API key not set');
  const mdl = model || process.env.EXPO_PUBLIC_OPENAI_MODEL || 'gpt-4o-mini';

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: mdl,
      messages,
      temperature: 0.2,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${text}`);
  }
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content ?? '';
  return content;
}
