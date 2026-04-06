import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

export function SearchModal({ visible, bibleData, onNavigate, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const books = Object.keys(bibleData);

  const searchResults: SearchResult[] = (() => {
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
  })();

  const handleSelect = (book: string, chapter: number) => {
    const q = query.trim();
    if (q && !recentSearches.includes(q)) {
      setRecentSearches((prev) => [q, ...prev].slice(0, 10));
    }
    onNavigate(book, chapter);
    onClose();
    setQuery('');
  };

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  const renderHighlight = (text: string, q: string) => {
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
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <View style={styles.container}>
        {/* 헤더 */}
        <View style={styles.header}>
          <View style={styles.inputWrapper}>
            <Ionicons name="search" size={16} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              value={query}
              onChangeText={setQuery}
              placeholder="구절 검색..."
              placeholderTextColor="#9CA3AF"
              autoFocus
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery('')} style={styles.clearBtn}>
                <Ionicons name="close-circle" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={handleClose} style={styles.cancelBtn}>
            <Ionicons name="close" size={22} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* 콘텐츠 */}
        {!query.trim() ? (
          recentSearches.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="search" size={40} color="#D1D5DB" />
              <Text style={styles.emptyText}>검색어를 입력하세요</Text>
            </View>
          ) : (
            <ScrollView style={styles.content}>
              <View style={styles.recentHeader}>
                <Text style={styles.recentLabel}>최근 검색어</Text>
                <TouchableOpacity onPress={() => setRecentSearches([])}>
                  <Text style={styles.clearAllText}>전체 삭제</Text>
                </TouchableOpacity>
              </View>
              {recentSearches.map((recent) => (
                <TouchableOpacity
                  key={recent}
                  style={styles.recentRow}
                  onPress={() => setQuery(recent)}
                >
                  <Ionicons name="time-outline" size={16} color="#D1D5DB" />
                  <Text style={styles.recentText}>{recent}</Text>
                  <TouchableOpacity
                    onPress={() => setRecentSearches((prev) => prev.filter((r) => r !== recent))}
                  >
                    <Ionicons name="close" size={14} color="#9CA3AF" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )
        ) : searchResults.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>검색 결과가 없습니다</Text>
            <Text style={styles.emptySubText}>"{query.trim()}"</Text>
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
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultRow}
                onPress={() => handleSelect(item.book, item.chapter)}
              >
                <View style={styles.resultContent}>
                  <Text style={styles.resultRef}>
                    {item.book} {item.chapter}:{item.verse}
                  </Text>
                  {renderHighlight(item.text, query.trim())}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
    color: '#111827',
  },
  clearBtn: {
    padding: 4,
  },
  cancelBtn: {
    padding: 6,
    borderRadius: 8,
  },
  content: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  emptySubText: {
    fontSize: 12,
    color: '#D1D5DB',
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  recentLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  clearAllText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  recentText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },
  resultCount: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    fontSize: 12,
    color: '#9CA3AF',
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resultContent: {
    flex: 1,
  },
  resultRef: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
    marginBottom: 2,
  },
  resultText: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 20,
  },
  highlight: {
    backgroundColor: '#FEF08A',
    color: '#111827',
    borderRadius: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#F9FAFB',
  },
});
