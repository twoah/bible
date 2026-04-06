import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Share2, Users, X, Search } from 'lucide-react';
import { GroupShareModal } from './GroupShareModal';
import { SearchModal } from './SearchModal';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

declare global {
  interface Window {
    Kakao: {
      isInitialized: () => boolean;
      init: (key: string) => void;
      Share: {
        sendDefault: (options: {
          objectType: string;
          text: string;
          link: { mobileWebUrl: string; webUrl: string };
        }) => void;
      };
    };
  }
}

interface BibleVerse {
  verse: number;
  text: string;
}

interface BibleChapter {
  chapter: number;
  verses: BibleVerse[];
}

interface BibleReaderProps {
  onVerseClick?: (book: string, chapter: number, verse: number) => void;
  highlightedVerses?: Set<string>;
  onClearHighlights?: () => void;
  isAtTop?: boolean;
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

  // 책 순서 → 장 → 절 순으로 정렬
  lines.sort((a, b) => {
    if (a.book !== b.book) return a.book.localeCompare(b.book);
    if (a.chapter !== b.chapter) return a.chapter - b.chapter;
    return a.verse - b.verse;
  });

  return lines.map((l) => `[${l.book} ${l.chapter}:${l.verse}]\n${l.text}`).join('\n\n');
}

export function BibleReader({
  onVerseClick,
  highlightedVerses = new Set(),
  onClearHighlights,
  isAtTop = true,
}: BibleReaderProps) {
  const [bibleData, setBibleData] = useState<Record<string, BibleChapter[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState('');
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    fetch('/bibleData.json')
      .then((res) => res.json())
      .then((data: Record<string, BibleChapter[]>) => {
        setBibleData(data);
        setSelectedBook(Object.keys(data)[0]);
        setLoading(false);
      });
  }, []);

  const books = Object.keys(bibleData);
  const chapters = selectedBook ? (bibleData[selectedBook] ?? []) : [];
  const currentChapterData = chapters[currentChapterIdx];

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
  };

  const handleChapterChange = (value: string) => {
    setCurrentChapterIdx(parseInt(value, 10));
    onClearHighlights?.();
  };

  const handlePrevChapter = () => {
    if (currentChapterIdx > 0) {
      setCurrentChapterIdx((i) => i - 1);
      onClearHighlights?.();
    }
  };

  const handleNextChapter = () => {
    if (currentChapterIdx < chapters.length - 1) {
      setCurrentChapterIdx((i) => i + 1);
      onClearHighlights?.();
    }
  };

  const handleKakaoShare = () => {
    const shareText = buildShareText(highlightedVerses, bibleData);
    if (!shareText) return;

    const appKey = import.meta.env.VITE_KAKAO_APP_KEY;

    if (!appKey || appKey === 'your_kakao_javascript_key_here') {
      alert('카카오 앱 키를 .env 파일의 VITE_KAKAO_APP_KEY에 설정해주세요.');
      return;
    }

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(appKey);
    }

    window.Kakao.Share.sendDefault({
      objectType: 'text',
      text: shareText,
      link: {
        mobileWebUrl: window.location.href,
        webUrl: window.location.href,
      },
    });
  };

  if (loading) {
    return (
      <Card className="p-6 flex items-center justify-center min-h-[200px]">
        <span className="text-gray-500">성경 데이터 로딩 중...</span>
      </Card>
    );
  }

  return (
    <>
      <Card className="p-6">
        {/* 권 / 장 선택 */}
        <div className="flex gap-3 mb-4">
          <Select value={selectedBook} onValueChange={handleBookChange}>
            <SelectTrigger className="flex-1 *:data-[slot=select-value]:flex-1 *:data-[slot=select-value]:justify-center">
              <SelectValue placeholder="권 선택" />
            </SelectTrigger>
            <SelectContent>
              {books.map((book) => (
                <SelectItem key={book} value={book}>
                  {book}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={String(currentChapterIdx)}
            onValueChange={handleChapterChange}
            disabled={chapters.length === 0}
          >
            <SelectTrigger className="w-[110px] *:data-[slot=select-value]:flex-1 *:data-[slot=select-value]:justify-center">
              <SelectValue placeholder="장 선택" />
            </SelectTrigger>
            <SelectContent>
              {chapters.map((ch, idx) => (
                <SelectItem key={ch.chapter} value={String(idx)}>
                  {ch.chapter}장
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 이전 / 다음 장 네비게이션 */}
        {currentChapterData && (
          <>
            <div className="flex items-center justify-between mb-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevChapter}
                disabled={currentChapterIdx === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                이전
              </Button>
              <span className="text-sm font-medium text-gray-700">
                {selectedBook} {currentChapterData.chapter}장
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowSearchModal(true)}
                  className="p-1.5 rounded-lg transition-colors text-gray-400 hover:bg-gray-100"
                  aria-label="구절 검색"
                >
                  <Search className="w-4 h-4" />
                </button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextChapter}
                  disabled={currentChapterIdx === chapters.length - 1}
                >
                  다음
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* 절 목록 - 줄바꿈 없이 이어서 표시 */}
            <div className="px-3 py-2 text-sm leading-relaxed">
              {currentChapterData.verses.map((verse) => {
                const verseKey = `${selectedBook}-${currentChapterData.chapter}-${verse.verse}`;
                const isHighlighted = highlightedVerses.has(verseKey);

                return (
                  <span
                    key={verse.verse}
                    className={`cursor-pointer rounded transition-colors ${
                      isHighlighted ? 'bg-yellow-100' : 'hover:bg-gray-100'
                    }`}
                    onClick={() =>
                      onVerseClick?.(selectedBook, currentChapterData.chapter, verse.verse)
                    }
                  >
                    <span className="text-blue-600 font-semibold text-xs mr-0.5">{verse.verse}</span>{verse.text}{' '}
                  </span>
                );
              })}
            </div>
          </>
        )}
      </Card>

      {/* 하단 공유 바 - 하이라이트된 절이 있을 때만 표시 */}
      {highlightedVerses.size > 0 && isAtTop && (
        <div className="fixed bottom-16 left-0 right-0 z-40 px-4 pb-2">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white text-gray-900 rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-gray-200">
              <span className="text-sm font-medium text-gray-500 mr-auto">
                {highlightedVerses.size}개 구절 선택됨
              </span>
              <button
                onClick={() => setShowGroupModal(true)}
                className="flex items-center gap-1.5 bg-purple-600 text-white text-sm font-semibold px-3 py-2 rounded-xl hover:bg-purple-500 transition-all active:scale-95"
              >
                <Users className="w-4 h-4" />
                그룹 공유
              </button>
              <button
                onClick={handleKakaoShare}
                className="flex items-center gap-1.5 bg-[#FEE500] text-[#3C1E1E] text-sm font-semibold px-3 py-2 rounded-xl hover:brightness-95 transition-all active:scale-95"
              >
                <Share2 className="w-4 h-4" />
                카카오톡
              </button>
              <button
                onClick={onClearHighlights}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                aria-label="선택 해제"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 그룹 공유 모달 */}
      {showGroupModal && (
        <GroupShareModal
          verseCount={highlightedVerses.size}
          onClose={() => setShowGroupModal(false)}
        />
      )}

      {/* 검색 모달 */}
      {showSearchModal && (
        <SearchModal
          bibleData={bibleData}
          onNavigate={handleSearchNavigate}
          onClose={() => setShowSearchModal(false)}
        />
      )}
    </>
  );
}
