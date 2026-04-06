import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface BibleVerse {
  verse: number;
  text: string;
}

interface BibleChapter {
  chapter: number;
  verses: BibleVerse[];
}

interface SearchResult {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

interface SearchModalProps {
  visible: boolean;
  bibleData: Record<string, BibleChapter[]>;
  onNavigate: (book: string, chapter: number) => void;
  onClose: () => void;
}

const RECENT_KEY = 'bible_recent_searches';
const MAX_RECENT = 10;

async function getRecent(): Promise<string[]> {
  try {
    const val = await AsyncStorage.getItem(RECENT_KEY);
    return val ? JSON.parse(val) : [];
  } catch {
    return [];
  }
}

async function saveRecent(query: string) {
  const prev = await getRecent();
  const updated = [query, ...prev.filter((q) => q !== query)].slice(0, MAX_RECENT);
  await AsyncStorage.setItem(RECENT_KEY, JSON.stringify(updated));
}

async function removeRecent(query: string) {
  const prev = await getRecent();
  await AsyncStorage.setItem(RECENT_KEY, JSON.stringify(prev.filter((q) => q !== query)));
}

export function SearchModal({ visible, bibleData, onNavigate, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<TextInput>(null);

  React.useEffect(() => {
    getRecent().then(setRecentSearches);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const books = Object.keys(bibleData);

  const searchResults: SearchResult[] = React.useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    const results: SearchResult[] = [];
    for (const book of books) {
      for (const chapterData of bibleData[book] ?? []) {
        for (const v of chapterData.verses) {
          if (v.text.includes(q)) {
            results.push({ book, chapter: chapterData.chapter, verse: v.verse, text: v.text });
            if (results.length >= 100) return results;
          }
        }
      }
    }
    return results;
  }, [query, bibleData]);

  const handleSelect = async (book: string, chapter: number) => {
    if (query.trim()) await saveRecent(query.trim());
    onNavigate(book, chapter);
    onClose();
  };

  const handleRecentClick = (recent: string) => {
    setQuery(recent);
  };

  const handleDeleteRecent = async (recent: string) => {
    await removeRecent(recent);
    setRecentSearches(await getRecent());
  };

  const handleClearAll = async () => {
    await AsyncStorage.removeItem(RECENT_KEY);
    setRecentSearches([]);
  };

  const highlightText = (text: string, q: string) => {
    const idx = text.indexOf(q);
    if (idx === -1) return <Text style={styles.resultText}>{text}</Text>;
    return (
      <Text style={styles.resultText}>
        {text.slice(0, idx)}
        <Text style={styles.highlight}>{text.slice(idx, idx + q.length)}</Text>
        {text.slice(idx + q.length)}
      </Text>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* 헤더 */}
        <View style={styles.header}>
          <View style={styles.inputWrap}>
            <Ionicons name="search" size={16} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              ref={inputRef}
              style={styles.input}
              value={query}
              onChangeText={setQuery}
              placeholder="구절 검색..."
              placeholderTextColor="#9CA3AF"
              returnKeyType="search"
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery('')} style={styles.clearBtn}>
                <Ionicons name="close-circle" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* 콘텐츠 */}
        {!query.trim() ? (
          recentSearches.length === 0 ? (
            <View style={styles.emptyWrap}>
              <Ionicons name="search" size={40} color="#D1D5DB" />
              <Text style={styles.emptyText}>검색어를 입력하세요</Text>
            </View>
          ) : (
            <View style={styles.recentWrap}>
              <View style={styles.recentHeader}>
                <Text style={styles.recentLabel}>최근 검색어</Text>
                <TouchableOpacity onPress={handleClearAll}>
                  <Text style={styles.clearAll}>전체 삭제</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={recentSearches}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.recentRow} onPress={() => handleRecentClick(item)}>
                    <Ionicons name="time-outline" size={16} color="#D1D5DB" />
                    <Text style={styles.recentText}>{item}</Text>
                    <TouchableOpacity onPress={() => handleDeleteRecent(item)} hitSlop={8}>
                      <Ionicons name="close" size={14} color="#9CA3AF" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                )}
              />
            </View>
          )
        ) : searchResults.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>검색 결과가 없습니다</Text>
            <Text style={styles.emptyQuery}>"{query.trim()}"</Text>
          </View>
        ) : (
          <FlatList
            data={searchResults}
            keyExtractor={(_, i) => String(i)}
            ListHeaderComponent={
              <Text style={styles.resultCount}>
                검색 결과 {searchResults.length >= 100 ? '100+' : searchResults.length}개
              </Text>
            }
            renderItem={({ item: r }) => (
              <TouchableOpacity
                style={styles.resultRow}
                onPress={() => handleSelect(r.book, r.chapter)}
              >
                <View style={styles.resultInfo}>
                  <Text style={styles.resultRef}>{r.book} {r.chapter}:{r.verse}</Text>
                  {highlightText(r.text, query.trim())}
                </View>
                <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  searchIcon: { marginRight: 6 },
  input: { flex: 1, paddingVertical: 8, fontSize: 14, color: '#111827' },
  clearBtn: { padding: 4 },
  closeBtn: { padding: 6 },
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  emptyText: { fontSize: 14, color: '#9CA3AF' },
  emptyQuery: { fontSize: 12, color: '#D1D5DB' },
  recentWrap: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  recentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  recentLabel: { fontSize: 11, fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', letterSpacing: 0.5 },
  clearAll: { fontSize: 12, color: '#9CA3AF' },
  recentRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  recentText: { flex: 1, fontSize: 14, color: '#374151' },
  resultCount: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4, fontSize: 12, color: '#9CA3AF' },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resultInfo: { flex: 1 },
  resultRef: { fontSize: 12, fontWeight: '700', color: '#2563EB', marginBottom: 2 },
  resultText: { fontSize: 13, color: '#374151', lineHeight: 20 },
  highlight: { backgroundColor: '#FEF08A', color: '#111827', borderRadius: 2 },
  separator: { height: 1, backgroundColor: '#F9FAFB', marginHorizontal: 16 },
});
