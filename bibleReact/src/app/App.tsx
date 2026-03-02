import { useState } from 'react';
import { BookOpen, CalendarCheck, Users, Menu } from 'lucide-react';
import { BibleReader } from './components/BibleReader';
import { ReadingPlan } from './components/ReadingPlan';
import { GroupReading } from './components/GroupReading';
import { NotesPanel } from './components/NotesPanel';
import { MoreMenu } from './components/MoreMenu';
import { ProfilePage } from './components/ProfilePage';

type TabType = 'read' | 'plan' | 'group' | 'more' | 'notes' | 'profile';

export default function App() {
  const [highlightedVerses, setHighlightedVerses] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<TabType>('read');

  const handleVerseClick = (book: string, chapter: number, verse: number) => {
    const verseKey = `${book}-${chapter}-${verse}`;
    setHighlightedVerses((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(verseKey)) {
        newSet.delete(verseKey);
      } else {
        newSet.add(verseKey);
      }
      return newSet;
    });
  };

  const menuItems = [
    { id: 'read' as TabType, label: '성경 읽기', icon: BookOpen },
    { id: 'plan' as TabType, label: '독서 계획', icon: CalendarCheck },
    { id: 'group' as TabType, label: '함께 읽기', icon: Users },
    { id: 'more' as TabType, label: '더보기', icon: Menu },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col">
      <div className="flex-1 overflow-auto pb-20">
        <div className="container mx-auto px-4 py-4 max-w-7xl h-full">
          <div className="h-full">
            {activeTab === 'read' && (
              <div className="max-w-4xl mx-auto h-full">
                <BibleReader
                  onVerseClick={handleVerseClick}
                  highlightedVerses={highlightedVerses}
                />
              </div>
            )}

            {activeTab === 'plan' && (
              <div className="max-w-2xl mx-auto">
                <ReadingPlan />
              </div>
            )}

            {activeTab === 'group' && (
              <div className="max-w-2xl mx-auto">
                <GroupReading />
              </div>
            )}

            {activeTab === 'more' && (
              <MoreMenu 
                onNavigateToNotes={() => setActiveTab('notes')}
                onNavigateToProfile={() => setActiveTab('profile')}
              />
            )}

            {activeTab === 'notes' && (
              <div className="max-w-2xl mx-auto">
                <NotesPanel />
              </div>
            )}

            {activeTab === 'profile' && (
              <ProfilePage onBack={() => setActiveTab('more')} />
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="container mx-auto px-4 max-w-7xl">
          <nav className="flex items-center justify-around">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center justify-center py-3 px-4 min-w-[80px] transition-colors ${
                    isActive ? 'text-purple-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-1 ${isActive ? 'text-purple-600' : ''}`} />
                  <span className="text-xs">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}