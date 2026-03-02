import { useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
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

// 샘플 성경 데이터 (창세기 1장 일부)
const bibleData: Record<string, BibleChapter[]> = {
  '창세기': [
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
  '요한복음': [
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
  '시편': [
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

  const handlePrevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const handleNextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const handleBookChange = (book: string) => {
    setSelectedBook(book);
    setCurrentChapter(0);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <BookOpen className="w-6 h-6 text-blue-600" />
        <h2>성경 읽기</h2>
        <div className="ml-auto">
          <Select value={selectedBook} onValueChange={handleBookChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {books.map((book) => (
                <SelectItem key={book} value={book}>
                  {book}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {currentChapterData && (
        <>
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              onClick={handlePrevChapter}
              disabled={currentChapter === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              이전 장
            </Button>
            <span className="text-lg">
              {selectedBook} {currentChapterData.chapter}장
            </span>
            <Button
              variant="outline"
              onClick={handleNextChapter}
              disabled={currentChapter === chapters.length - 1}
            >
              다음 장
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="space-y-4">
            {currentChapterData.verses.map((verse) => {
              const verseKey = `${selectedBook}-${currentChapterData.chapter}-${verse.verse}`;
              const isHighlighted = highlightedVerses.has(verseKey);

              return (
                <div
                  key={verse.verse}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    isHighlighted ? 'bg-yellow-100' : 'hover:bg-gray-50'
                  }`}
                  onClick={() =>
                    onVerseClick?.(selectedBook, currentChapterData.chapter, verse.verse)
                  }
                >
                  <span className="mr-2 text-blue-600">{verse.verse}</span>
                  <span>{verse.text}</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </Card>
  );
}
