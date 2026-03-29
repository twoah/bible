import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

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
}

export function BibleReader({ onVerseClick, highlightedVerses = new Set() }: BibleReaderProps) {
  const [bibleData, setBibleData] = useState<Record<string, BibleChapter[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState('');
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);

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

  const handleBookChange = (book: string) => {
    setSelectedBook(book);
    setCurrentChapterIdx(0);
  };

  const handleChapterChange = (value: string) => {
    setCurrentChapterIdx(parseInt(value, 10));
  };

  const handlePrevChapter = () => {
    if (currentChapterIdx > 0) setCurrentChapterIdx((i) => i - 1);
  };

  const handleNextChapter = () => {
    if (currentChapterIdx < chapters.length - 1) setCurrentChapterIdx((i) => i + 1);
  };

  if (loading) {
    return (
      <Card className="p-6 flex items-center justify-center min-h-[200px]">
        <span className="text-gray-500">성경 데이터 로딩 중...</span>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      {/* 권 / 장 선택 */}
      <div className="flex gap-3 mb-4">
        <Select value={selectedBook} onValueChange={handleBookChange}>
          <SelectTrigger className="flex-1">
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
          <SelectTrigger className="w-[110px]">
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
          <div className="flex items-center justify-between mb-5">
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

          {/* 절 목록 */}
          <div className="space-y-3">
            {currentChapterData.verses.map((verse) => {
              const verseKey = `${selectedBook}-${currentChapterData.chapter}-${verse.verse}`;
              const isHighlighted = highlightedVerses.has(verseKey);

              return (
                <div
                  key={verse.verse}
                  className={`px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                    isHighlighted ? 'bg-yellow-100' : 'hover:bg-gray-50'
                  }`}
                  onClick={() =>
                    onVerseClick?.(selectedBook, currentChapterData.chapter, verse.verse)
                  }
                >
                  <span className="mr-2 text-blue-600 font-semibold text-sm">{verse.verse}</span>
                  <span className="text-sm leading-relaxed">{verse.text}</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </Card>
  );
}
