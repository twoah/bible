import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  FlatList,
  Share,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { GroupShareModal } from './GroupShareModal';
import { SearchModal } from './SearchModal';
import bibleDataJson from '@/assets/bibleData.json';

interface BibleVerse {
  verse: number;
  text: string;
}

interface BibleChapter {
  chapter: number;
  verses: BibleVerse[];
}

type BibleDataType = Record<string, BibleChapter[]>;

interface BibleReaderProps {
  onVerseClick?: (book: string, chapter: number, verse: number) => void;
  highlightedVerses?: Set<string>;
  onClearHighlights?: () => void;
}

function buildShareText(
  highlighted: Set<string>,
  bibleData: Record<string, BibleChapter[]>,
): string {
  const lines: { book: string; chapter: number; verse: number; text: string }[] = [];
  for (const key of highlighted) {
    const match = key.match(/^(.+)-(\d+)-(\d+)$/);
    if (!match) continue;
    const [, book, chapStr, verseStr] = match;
    const chapter = parseInt(chapStr, 10);
    const verse = parseInt(verseStr, 10);
    const chapters = bibleData[book];
    if (!chapters) continue;
    const chapterData = chapters.find((c) => c.chapter === chapter);
    if (!chapterData) continue;
    const verseData = chapterData.verses.find((v) => v.verse === verse);
    if (!verseData) continue;
    lines.push({ book, chapter, verse, text: verseData.text });
  }
  lines.sort((a, b) => {
    if (a.book !== b.book) return a.book.localeCompare(b.book);
    if (a.chapter !== b.chapter) return a.chapter - b.chapter;
    return a.verse - b.verse;
  });
  return lines.map((l) => `[${l.book} ${l.chapter}:${l.verse}]\n${l.text}`).join('\n\n');
}

const bibleData = bibleDataJson as BibleDataType;
const initialBooks = Object.keys(bibleData);

export function BibleReader({
  onVerseClick,
  highlightedVerses = new Set(),
  onClearHighlights,
}: BibleReaderProps) {
  const [selectedBook, setSelectedBook] = useState(initialBooks[0] ?? '');
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showBookPicker, setShowBookPicker] = useState(false);
  const [showChapterPicker, setShowChapterPicker] = useState(false);

  const books = initialBooks;
  const chapters = selectedBook ? (bibleData[selectedBook] ?? []) : [];
  const currentChapterData = chapters[currentChapterIdx];

  // ── 슬라이드 제스처 ──────────────────────────────────────
  const translateX = useSharedValue(0);

  const goToPrev = () => {
    if (currentChapterIdx > 0) {
      setCurrentChapterIdx((i) => i - 1);
      onClearHighlights?.();
    }
  };

  const goToNext = () => {
    if (currentChapterIdx < chapters.length - 1) {
      setCurrentChapterIdx((i) => i + 1);
      onClearHighlights?.();
    }
  };

  const swipeGesture = Gesture.Pan()
    .activeOffsetX([-15, 15])   // 수평 15px 이상 이동 시 활성화
    .failOffsetY([-10, 10])     // 수직 10px 먼저 이동하면 실패 (세로 스크롤 우선)
    .onUpdate((e) => {
      const atStart = currentChapterIdx === 0;
      const atEnd = currentChapterIdx === chapters.length - 1;
      const overEdge = (e.translationX > 0 && atStart) || (e.translationX < 0 && atEnd);
      translateX.value = e.translationX * (overEdge ? 0.15 : 0.4);
    })
    .onEnd((e) => {
      const THRESHOLD = 60;
      if (e.translationX < -THRESHOLD) runOnJS(goToNext)();
      else if (e.translationX > THRESHOLD) runOnJS(goToPrev)();
      translateX.value = withSpring(0, { damping: 20, stiffness: 300 });
    });

  const swipeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  // ──────────────────────────────────────────────────────────

  const handleSearchNavigate = (book: string, chapter: number) => {
    const bookChapters = bibleData[book] ?? [];
    const idx = bookChapters.findIndex((c) => c.chapter === chapter);
    if (idx !== -1) {
      setSelectedBook(book);
      setCurrentChapterIdx(idx);
      onClearHighlights?.();
    }
  };

  const handleBookChange = (book: string) => {
    setSelectedBook(book);
    setCurrentChapterIdx(0);
    onClearHighlights?.();
    setShowBookPicker(false);
  };

  const handleChapterChange = (idx: number) => {
    setCurrentChapterIdx(idx);
    onClearHighlights?.();
    setShowChapterPicker(false);
  };

  const handleShare = async () => {
    const shareText = buildShareText(highlightedVerses, bibleData);
    if (!shareText) return;
    try {
      await Share.share({ message: shareText });
    } catch {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* 권 / 장 선택 */}
        <View style={styles.pickerRow}>
          <TouchableOpacity
            style={styles.pickerBtn}
            onPress={() => setShowBookPicker(true)}
          >
            <Text style={styles.pickerText}>{selectedBook || '권 선택'}</Text>
            <Ionicons name="chevron-down" size={16} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.pickerBtn, styles.chapterPickerBtn]}
            onPress={() => setShowChapterPicker(true)}
            disabled={chapters.length === 0}
          >
            <Text style={styles.pickerText}>
              {currentChapterData ? `${currentChapterData.chapter}장` : '장 선택'}
            </Text>
            <Ionicons name="chevron-down" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* 이전 / 다음 장 네비게이션 */}
        {currentChapterData && (
          <>
            <View style={styles.navRow}>
              <TouchableOpacity
                style={[styles.navBtn, currentChapterIdx === 0 && styles.navBtnDisabled]}
                onPress={() => {
                  if (currentChapterIdx > 0) {
                    setCurrentChapterIdx((i) => i - 1);
                    onClearHighlights?.();
                  }
                }}
                disabled={currentChapterIdx === 0}
              >
                <Ionicons name="chevron-back" size={16} color={currentChapterIdx === 0 ? '#D1D5DB' : '#374151'} />
                <Text style={[styles.navBtnText, currentChapterIdx === 0 && styles.navBtnTextDisabled]}>이전</Text>
              </TouchableOpacity>

              <Text style={styles.chapterTitle}>
                {selectedBook} {currentChapterData.chapter}장
              </Text>

              <View style={styles.navRight}>
                <TouchableOpacity
                  style={styles.searchBtn}
                  onPress={() => setShowSearchModal(true)}
                >
                  <Ionicons name="search" size={18} color="#9CA3AF" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.navBtn, currentChapterIdx === chapters.length - 1 && styles.navBtnDisabled]}
                  onPress={() => {
                    if (currentChapterIdx < chapters.length - 1) {
                      setCurrentChapterIdx((i) => i + 1);
                      onClearHighlights?.();
                    }
                  }}
                  disabled={currentChapterIdx === chapters.length - 1}
                >
                  <Text style={[styles.navBtnText, currentChapterIdx === chapters.length - 1 && styles.navBtnTextDisabled]}>다음</Text>
                  <Ionicons name="chevron-forward" size={16} color={currentChapterIdx === chapters.length - 1 ? '#D1D5DB' : '#374151'} />
                </TouchableOpacity>
              </View>
            </View>

            {/* 절 목록 — 절 번호 인라인 + 좌우 슬라이드로 장 이동 */}
            <GestureDetector gesture={swipeGesture}>
              <Animated.View style={[styles.verseList, swipeStyle]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={styles.verseParagraph}>
                    {currentChapterData.verses.map((verse) => {
                      const verseKey = `${selectedBook}-${currentChapterData.chapter}-${verse.verse}`;
                      const isHighlighted = highlightedVerses.has(verseKey);
                      return (
                        <Text
                          key={verse.verse}
                          style={isHighlighted ? styles.verseSpanHighlighted : undefined}
                          onPress={() =>
                            onVerseClick?.(selectedBook, currentChapterData.chapter, verse.verse)
                          }
                        >
                          <Text style={styles.verseNumber}>{verse.verse} </Text>
                          {verse.text + ' '}
                        </Text>
                      );
                    })}
                  </Text>
                  <View style={{ height: highlightedVerses.size > 0 ? 80 : 20 }} />
                </ScrollView>
              </Animated.View>
            </GestureDetector>
          </>
        )}
      </View>

      {/* 하단 공유 바 */}
      {highlightedVerses.size > 0 && (
        <View style={styles.shareBar}>
          <Text style={styles.shareBarCount}>{highlightedVerses.size}개 구절 선택됨</Text>
          <TouchableOpacity
            style={styles.groupShareBtn}
            onPress={() => setShowGroupModal(true)}
          >
            <Ionicons name="people-outline" size={16} color="#fff" />
            <Text style={styles.groupShareBtnText}>그룹 공유</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
            <Ionicons name="share-outline" size={16} color="#374151" />
            <Text style={styles.shareBtnText}>공유</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearBtn} onPress={onClearHighlights}>
            <Ionicons name="close" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
      )}

      {/* 권 선택 모달 */}
      <Modal visible={showBookPicker} transparent animationType="slide" onRequestClose={() => setShowBookPicker(false)}>
        <TouchableOpacity style={styles.pickerBackdrop} onPress={() => setShowBookPicker(false)} />
        <View style={styles.pickerSheet}>
          <Text style={styles.pickerSheetTitle}>권 선택</Text>
          <FlatList
            data={books}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.pickerItem, item === selectedBook && styles.pickerItemSelected]}
                onPress={() => handleBookChange(item)}
              >
                <Text style={[styles.pickerItemText, item === selectedBook && styles.pickerItemTextSelected]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      {/* 장 선택 모달 */}
      <Modal visible={showChapterPicker} transparent animationType="slide" onRequestClose={() => setShowChapterPicker(false)}>
        <TouchableOpacity style={styles.pickerBackdrop} onPress={() => setShowChapterPicker(false)} />
        <View style={styles.pickerSheet}>
          <Text style={styles.pickerSheetTitle}>장 선택</Text>
          <FlatList
            data={chapters}
            keyExtractor={(item) => String(item.chapter)}
            numColumns={4}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[styles.chapterItem, index === currentChapterIdx && styles.chapterItemSelected]}
                onPress={() => handleChapterChange(index)}
              >
                <Text style={[styles.chapterItemText, index === currentChapterIdx && styles.chapterItemTextSelected]}>
                  {item.chapter}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      {/* 그룹 공유 모달 */}
      <GroupShareModal
        visible={showGroupModal}
        verseCount={highlightedVerses.size}
        onClose={() => setShowGroupModal(false)}
      />

      {/* 검색 모달 */}
      <SearchModal
        visible={showSearchModal}
        bibleData={bibleData}
        onNavigate={handleSearchNavigate}
        onClose={() => setShowSearchModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  pickerRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  pickerBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  chapterPickerBtn: {
    flex: 0,
    width: 110,
  },
  pickerText: {
    fontSize: 14,
    color: '#374151',
    marginRight: 4,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
  },
  navBtnDisabled: {
    borderColor: '#F3F4F6',
  },
  navBtnText: {
    fontSize: 13,
    color: '#374151',
  },
  navBtnTextDisabled: {
    color: '#D1D5DB',
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchBtn: {
    padding: 6,
    borderRadius: 8,
  },
  chapterTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  verseList: {
    flex: 1,
  },
  verseParagraph: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    lineHeight: 22,
    color: '#111827',
  },
  verseSpanHighlighted: {
    backgroundColor: '#FEF9C3',
  },
  verseNumber: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2563EB',
  },
  shareBar: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  shareBarCount: {
    flex: 1,
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  groupShareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#9333EA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  groupShareBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  shareBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  clearBtn: {
    padding: 8,
    borderRadius: 10,
  },
  pickerBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  pickerSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '60%',
    paddingTop: 16,
    paddingBottom: 32,
  },
  pickerSheetTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  pickerItem: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  pickerItemSelected: {
    backgroundColor: '#FAF5FF',
  },
  pickerItemText: {
    fontSize: 15,
    color: '#374151',
  },
  pickerItemTextSelected: {
    color: '#9333EA',
    fontWeight: '600',
  },
  chapterItem: {
    flex: 1,
    margin: 4,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  chapterItemSelected: {
    backgroundColor: '#9333EA',
  },
  chapterItemText: {
    fontSize: 14,
    color: '#374151',
  },
  chapterItemTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
});
