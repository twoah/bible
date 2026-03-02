import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Select } from './ui/Select';

interface BibleVerse {
  verse: number;
  text: string;
}

interface BibleChapter {
  chapter: number;
  verses: BibleVerse[];
}

const bibleData: Record<string, BibleChapter[]> = {
  창세기: [
    {
      chapter: 1,
      verses: [
        { verse: 1, text: '태초에 하나님이 천지를 창조하시니라' },
        { verse: 2, text: '땅이 혼돈하고 공허하며 흑암이 깊음 위에 있고 하나님의 영은 수면 위에 운행하시니라' },
        { verse: 3, text: '하나님이 이르시되 빛이 있으라 하시니 빛이 있었고' },
        { verse: 4, text: '빛이 하나님이 보시기에 좋았더라 하나님이 빛과 어둠을 나누사' },
        { verse: 5, text: '하나님이 빛을 낮이라 부르시고 어둠을 밤이라 부르시니라 저녁이 되고 아침이 되니 이는 첫째 날이니라' },
      ],
    },
    {
      chapter: 2,
      verses: [
        { verse: 1, text: '천지와 만물이 다 이루어지니라' },
        { verse: 2, text: '하나님이 그가 하시던 일을 일곱째 날에 마치시니 그가 하시던 모든 일을 그치고 일곱째 날에 안식하시니라' },
        { verse: 3, text: '하나님이 그 일곱째 날을 복되게 하사 거룩하게 하셨으니 이는 하나님이 그 창조하시며 만드시던 모든 일을 마치시고 그 날에 안식하셨음이라' },
      ],
    },
  ],
  요한복음: [
    {
      chapter: 1,
      verses: [
        { verse: 1, text: '태초에 말씀이 계시니라 이 말씀이 하나님과 함께 계셨으니 이 말씀은 곧 하나님이시니라' },
        { verse: 2, text: '그가 태초에 하나님과 함께 계셨고' },
        { verse: 3, text: '만물이 그로 말미암아 지은 바 되었으니 지은 것이 하나도 그가 없이는 된 것이 없느니라' },
        { verse: 4, text: '그 안에 생명이 있었으니 이 생명은 사람들의 빛이라' },
        { verse: 5, text: '빛이 어둠에 비치되 어둠이 깨닫지 못하더라' },
      ],
    },
  ],
  시편: [
    {
      chapter: 23,
      verses: [
        { verse: 1, text: '여호와는 나의 목자시니 내게 부족함이 없으리로다' },
        { verse: 2, text: '그가 나를 푸른 풀밭에 누이시며 쉴 만한 물가로 인도하시는도다' },
        { verse: 3, text: '내 영혼을 소생시키시고 자기 이름을 위하여 의의 길로 인도하시는도다' },
        { verse: 4, text: '내가 사망의 음침한 골짜기로 다닐지라도 해를 두려워하지 않을 것은 주께서 나와 함께 하심이라 주의 지팡이와 막대기가 나를 안위하시나이다' },
        { verse: 5, text: '주께서 내 원수의 목전에서 내게 상을 차려 주시고 기름을 내 머리에 부으셨으니 내 잔이 넘치나이다' },
        { verse: 6, text: '내 평생에 선하심과 인자하심이 반드시 나를 따르리니 내가 여호와의 집에 영원히 살리로다' },
      ],
    },
  ],
};

interface BibleReaderProps {
  onVerseClick?: (book: string, chapter: number, verse: number) => void;
  highlightedVerses?: Set<string>;
}

export function BibleReader({ onVerseClick, highlightedVerses = new Set() }: BibleReaderProps) {
  const books = Object.keys(bibleData);
  const [selectedBook, setSelectedBook] = useState(books[0]);
  const [currentChapter, setCurrentChapter] = useState(0);

  const chapters = bibleData[selectedBook] || [];
  const currentChapterData = chapters[currentChapter];

  const selectItems = books.map((b) => ({ label: b, value: b }));

  return (
    <Card style={styles.card}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerIcon}>📖</Text>
        <Text style={styles.headerTitle}>성경 읽기</Text>
        <View style={styles.selectWrapper}>
          <Select
            items={selectItems}
            value={selectedBook}
            onValueChange={(val) => {
              setSelectedBook(val);
              setCurrentChapter(0);
            }}
          />
        </View>
      </View>

      {currentChapterData && (
        <>
          {/* 장 이동 */}
          <View style={styles.chapterNav}>
            <Button
              variant="outline"
              onPress={() => currentChapter > 0 && setCurrentChapter(currentChapter - 1)}
              disabled={currentChapter === 0}
              style={styles.navButton}
            >
              <Text style={styles.navButtonText}>‹ 이전 장</Text>
            </Button>
            <Text style={styles.chapterTitle}>
              {selectedBook} {currentChapterData.chapter}장
            </Text>
            <Button
              variant="outline"
              onPress={() => currentChapter < chapters.length - 1 && setCurrentChapter(currentChapter + 1)}
              disabled={currentChapter === chapters.length - 1}
              style={styles.navButton}
            >
              <Text style={styles.navButtonText}>다음 장 ›</Text>
            </Button>
          </View>

          {/* 절 목록 */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {currentChapterData.verses.map((verse) => {
              const verseKey = `${selectedBook}-${currentChapterData.chapter}-${verse.verse}`;
              const isHighlighted = highlightedVerses.has(verseKey);

              return (
                <TouchableOpacity
                  key={verse.verse}
                  style={[styles.verseRow, isHighlighted && styles.verseHighlighted]}
                  onPress={() => onVerseClick?.(selectedBook, currentChapterData.chapter, verse.verse)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.verseNum}>{verse.verse}</Text>
                  <Text style={styles.verseText}>{verse.text}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  headerIcon: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#030213',
    flex: 1,
  },
  selectWrapper: {
    alignSelf: 'flex-start',
  },
  chapterNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  navButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  navButtonText: {
    fontSize: 13,
    color: '#030213',
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#030213',
  },
  verseRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  verseHighlighted: {
    backgroundColor: '#fef9c3',
  },
  verseNum: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
    marginRight: 10,
    minWidth: 20,
  },
  verseText: {
    fontSize: 15,
    color: '#1e293b',
    flex: 1,
    lineHeight: 22,
  },
});
