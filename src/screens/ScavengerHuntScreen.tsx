import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header';
import { useAppTheme } from '../providers/ThemeProvider';

interface Hunt {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  reward: string;
  tasks: number;
  completed: number;
  image: string;
}

export const ScavengerHuntScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeHunt, setActiveHunt] = useState<number | null>(null);
  const { Colors, Fonts } = useAppTheme();
  
  const hunts: Hunt[] = [
    {
      id: 1,
      title: 'Riverfront Explorer',
      description: 'Discover the hidden gems along the Halifax River',
      difficulty: 'Easy',
      duration: '30-45 min',
      reward: 'River Explorer Badge',
      tasks: 5,
      completed: 0,
      image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg',
    },
    {
      id: 2,
      title: 'Historic Daytona',
      description: 'Uncover the stories behind our city\'s landmarks',
      difficulty: 'Medium',
      duration: '60-90 min',
      reward: 'History Buff Badge',
      tasks: 8,
      completed: 3,
      image: 'https://images.pexels.com/photos/8112199/pexels-photo-8112199.jpeg',
    },
    {
      id: 3,
      title: 'Nature Detective',
      description: 'Find and identify local wildlife and plants',
      difficulty: 'Hard',
      duration: '90+ min',
      reward: 'Nature Expert Badge',
      tasks: 12,
      completed: 0,
      image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg',
    },
  ];

  const currentTasks = [
    { id: 1, title: 'Find the bronze plaque near the bridge', completed: true },
    { id: 2, title: 'Take a photo with the riverfront gazebo', completed: true },
    { id: 3, title: 'Locate the historic marker stone', completed: true },
    { id: 4, title: 'Scan QR code at the boat ramp', completed: false },
    { id: 5, title: 'Find the hidden artistic tile', completed: false },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return { color: Colors.success, backgroundColor: Colors.success + '20' };
      case 'Medium':
        return { color: Colors.warning, backgroundColor: Colors.warning + '20' };
      case 'Hard':
        return { color: Colors.error, backgroundColor: Colors.error + '20' };
      default:
        return { color: Colors.mutedForeground, backgroundColor: Colors.muted };
    }
  };

  const startHunt = (huntId: number) => {
    Alert.alert(
      'Start Scavenger Hunt',
      'This will begin your interactive adventure. Are you ready?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Start Hunt',
          onPress: () => {
            setActiveHunt(huntId);
            // In a real app, this would initialize the AR/GPS tracking
            Alert.alert('Hunt Started!', 'Use your camera and GPS to find the first clue.');
          },
        },
      ]
    );
  };

  const simulateTaskCompletion = (taskId: number) => {
    Alert.alert(
      'Task Completed!',
      'Great job! You\'ve completed this challenge. Keep exploring to find the next one.',
      [{ text: 'Continue', style: 'default' }]
    );
  };

  if (activeHunt) {
    const hunt = hunts.find(h => h.id === activeHunt);
    const completedTasks = currentTasks.filter(task => task.completed).length;
    const progress = (completedTasks / currentTasks.length) * 100;

    return (
      <View style={styles.container}>
        <Header
          title="Scavenger Hunt"
          showBack
          onBackPress={() => navigation.goBack()}
        />
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Active Hunt Header */}
          <View style={styles.activeHuntHeader}>
            <View style={styles.huntInfo}>
              <Text style={styles.activeHuntTitle}>{hunt?.title}</Text>
              <Text style={styles.activeHuntDescription}>{hunt?.description}</Text>
              
              <View style={styles.huntMeta}>
                <View style={styles.metaItem}>
                  <Icon name="schedule" size={16} color={Colors.primary} />
                  <Text style={styles.metaText}>{hunt?.duration}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Icon name="emoji-events" size={16} color={Colors.primary} />
                  <Text style={styles.metaText}>{hunt?.reward}</Text>
                </View>
              </View>

              <View style={styles.progressContainer}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Progress</Text>
                  <Text style={styles.progressText}>{completedTasks}/{currentTasks.length} tasks</Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progress}%` }]} />
                </View>
              </View>
            </View>
            
            <TouchableOpacity
              style={styles.exitButton}
              onPress={() => setActiveHunt(null)}
            >
              <Text style={styles.exitButtonText}>Exit Hunt</Text>
            </TouchableOpacity>
          </View>

          {/* Task List */}
          <View style={styles.tasksSection}>
            <Text style={styles.sectionTitle}>Tasks</Text>
            {currentTasks.map((task) => (
              <View
                key={task.id}
                style={[
                  styles.taskCard,
                  task.completed && styles.completedTaskCard,
                ]}
              >
                <View style={styles.taskContent}>
                  <Text style={[
                    styles.taskTitle,
                    task.completed && styles.completedTaskTitle,
                  ]}>
                    {task.title}
                  </Text>
                </View>
                
                <View style={styles.taskStatus}>
                  {task.completed ? (
                    <Icon name="check-circle" size={24} color={Colors.success} />
                  ) : (
                    <View style={styles.incompleteIcon} />
                  )}
                </View>
                
                {!task.completed && (
                  <View style={styles.taskActions}>
                    <TouchableOpacity style={styles.hintButton}>
                      <Icon name="location-on" size={16} color={Colors.primary} />
                      <Text style={styles.hintButtonText}>Get Hint</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.completeButton}
                      onPress={() => simulateTaskCompletion(task.id)}
                    >
                      <Text style={styles.completeButtonText}>Mark Complete</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="Scavenger Hunt"
        showBack
        onBackPress={() => navigation.goBack()}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>AR Scavenger Hunts</Text>
          <Text style={styles.headerSubtitle}>
            Explore Daytona Beach parks through interactive challenges
          </Text>
        </View>

        {/* Hunt Cards */}
        <View style={styles.huntsContainer}>
          {hunts.map((hunt) => {
            const difficultyStyle = getDifficultyColor(hunt.difficulty);
            
            return (
              <View key={hunt.id} style={styles.huntCard}>
                <Image source={{ uri: hunt.image }} style={styles.huntImage} />
                
                <View style={styles.difficultyBadge}>
                  <View style={[styles.difficultyBadgeInner, { backgroundColor: difficultyStyle.backgroundColor }]}>
                    <Text style={[styles.difficultyText, { color: difficultyStyle.color }]}>
                      {hunt.difficulty}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.huntCardContent}>
                  <Text style={styles.huntTitle}>{hunt.title}</Text>
                  <Text style={styles.huntDescription}>{hunt.description}</Text>
                  
                  <View style={styles.huntMeta}>
                    <View style={styles.metaItem}>
                      <Icon name="schedule" size={16} color={Colors.mutedForeground} />
                      <Text style={styles.metaText}>{hunt.duration}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Icon name="star" size={16} color={Colors.mutedForeground} />
                      <Text style={styles.metaText}>{hunt.tasks} tasks</Text>
                    </View>
                    {hunt.completed > 0 && (
                      <Text style={styles.completedText}>
                        {hunt.completed}/{hunt.tasks} completed
                      </Text>
                    )}
                  </View>

                  <View style={styles.huntFooter}>
                    <View style={styles.rewardContainer}>
                      <Icon name="emoji-events" size={16} color={Colors.mutedForeground} />
                      <Text style={styles.rewardText}>{hunt.reward}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.startButton}
                      onPress={() => startHunt(hunt.id)}
                    >
                      <Icon name="play-arrow" size={16} color="white" />
                      <Text style={styles.startButtonText}>Start Hunt</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

  const styles = useMemo(() => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  headerTitle: {
    fontSize: Fonts.sizes['2xl'],
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: Fonts.sizes.base,
    color: Colors.mutedForeground,
  },
  huntsContainer: {
    padding: 16,
    gap: 16,
  },
  huntCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  huntImage: {
    width: '100%',
    height: 150,
  },
  difficultyBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  difficultyBadgeInner: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: Fonts.weights.medium,
  },
  huntCardContent: {
    padding: 16,
  },
  huntTitle: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.bold,
    color: Colors.cardForeground,
    marginBottom: 8,
  },
  huntDescription: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    marginBottom: 16,
    lineHeight: 20,
  },
  huntMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    marginLeft: 4,
  },
  completedText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.primary,
    fontWeight: Fonts.weights.medium,
    marginLeft: 'auto',
  },
  huntFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rewardText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    marginLeft: 4,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  startButtonText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.medium,
    color: 'white',
    marginLeft: 4,
  },
  // Active Hunt Styles
  activeHuntHeader: {
    backgroundColor: Colors.cardBackground,
    padding: 16,
    margin: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  huntInfo: {
    marginBottom: 16,
  },
  activeHuntTitle: {
    fontSize: Fonts.sizes.xl,
    fontWeight: Fonts.weights.bold,
    color: Colors.cardForeground,
    marginBottom: 8,
  },
  activeHuntDescription: {
    fontSize: Fonts.sizes.base,
    color: Colors.mutedForeground,
    marginBottom: 16,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: Fonts.sizes.sm,
    color: Colors.foreground,
  },
  progressText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.foreground,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.muted,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  exitButton: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  exitButtonText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.medium,
    color: Colors.secondaryForeground,
  },
  tasksSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.semibold,
    color: Colors.foreground,
    marginBottom: 16,
  },
  taskCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.border,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  completedTaskCard: {
    borderLeftColor: Colors.success,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  taskTitle: {
    flex: 1,
    fontSize: Fonts.sizes.base,
    fontWeight: Fonts.weights.medium,
    color: Colors.cardForeground,
  },
  completedTaskTitle: {
    textDecorationLine: 'line-through',
    color: Colors.mutedForeground,
  },
  taskStatus: {
    marginLeft: 12,
  },
  incompleteIcon: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 12,
  },
  taskActions: {
    flexDirection: 'row',
    gap: 8,
  },
  hintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  hintButtonText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.primary,
    marginLeft: 4,
  },
  completeButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  completeButtonText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.medium,
    color: 'white',
  },
  }),
  [Colors, Fonts]);