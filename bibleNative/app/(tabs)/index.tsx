import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BibleReader } from '@/components/BibleReader';

export default function ReadScreen() {
  const [highlightedVerses, setHighlightedVerses] = useState<Set<string>>(new Set());

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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <BibleReader
          onVerseClick={handleVerseClick}
          highlightedVerses={highlightedVerses}
          onClearHighlights={() => setHighlightedVerses(new Set())}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
  },
});
