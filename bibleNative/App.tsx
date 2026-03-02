import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BibleReader } from './src/components/BibleReader';
import { ReadingPlan } from './src/components/ReadingPlan';
import { GroupReading } from './src/components/GroupReading';
import { NotesPanel } from './src/components/NotesPanel';
import { MoreMenu } from './src/components/MoreMenu';
import { ProfilePage } from './src/components/ProfilePage';

type TabType = 'read' | 'plan' | 'group' | 'more' | 'notes' | 'profile';

const bottomTabs: { id: TabType; label: string; icon: string }[] = [
  { id: 'read', label: '성경 읽기', icon: '📖' },
  { id: 'plan', label: '독서 계획', icon: '📅' },
  { id: 'group', label: '함께 읽기', icon: '👥' },
  { id: 'more', label: '더보기', icon: '☰' },
];

function AppContent() {
  const insets = useSafeAreaInsets();
  const [highlightedVerses, setHighlightedVerses] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<TabType>('read');

  const handleVerseClick = (book: string, chapter: number, verse: number) => {
    const key = `${book}-${chapter}-${verse}`;
    setHighlightedVerses((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const showBottomTabs = activeTab !== 'notes' && activeTab !== 'profile';

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f3ff" />

      {/* 배경 그라디언트 대체 */}
      <View style={[styles.bg, { paddingTop: insets.top }]} />

      {/* 콘텐츠 영역 */}
      <View style={[styles.content, { paddingTop: insets.top + 8 }]}>
        {activeTab === 'read' && (
          <BibleReader
            onVerseClick={handleVerseClick}
            highlightedVerses={highlightedVerses}
          />
        )}
        {activeTab === 'plan' && <ReadingPlan />}
        {activeTab === 'group' && <GroupReading />}
        {activeTab === 'more' && (
          <MoreMenu
            onNavigateToNotes={() => setActiveTab('notes')}
            onNavigateToProfile={() => setActiveTab('profile')}
          />
        )}
        {activeTab === 'notes' && <NotesPanel />}
        {activeTab === 'profile' && <ProfilePage onBack={() => setActiveTab('more')} />}
      </View>

      {/* 하단 탭 바 */}
      {showBottomTabs && (
        <View style={[styles.tabBar, { paddingBottom: insets.bottom || 12 }]}>
          {bottomTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={styles.tabItem}
                onPress={() => setActiveTab(tab.id)}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>
                  {tab.icon}
                </Text>
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  bg: {
    backgroundColor: '#f0f4ff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 0,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    minWidth: 60,
  },
  tabIcon: {
    fontSize: 22,
    marginBottom: 2,
    opacity: 0.5,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#9333ea',
    fontWeight: '600',
  },
});
