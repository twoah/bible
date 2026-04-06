import { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, ChevronRight } from 'lucide-react';

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
  bibleData: Record<string, BibleChapter[]>;
  onNavigate: (book: string, chapter: number) => void;
  onClose: () => void;
}

const RECENT_KEY = 'bible_recent_searches';
const MAX_RECENT = 10;

function getRecent(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function saveRecent(query: string) {
  const prev = getRecent().filter((q) => q !== query);
  localStorage.setItem(RECENT_KEY, JSON.stringify([query, ...prev].slice(0, MAX_RECENT)));
}

function removeRecent(query: string) {
  const prev = getRecent().filter((q) => q !== query);
  localStorage.setItem(RECENT_KEY, JSON.stringify(prev));
}

export function SearchModal({ bibleData, onNavigate, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(getRecent);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
    if (query.trim()) {
      saveRecent(query.trim());
    }
    onNavigate(book, chapter);
    onClose();
  };

  const handleRecentClick = (recent: string) => {
    setQuery(recent);
    inputRef.current?.focus();
  };

  const handleDeleteRecent = (recent: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeRecent(recent);
    setRecentSearches(getRecent());
  };

  const handleClearAll = () => {
    localStorage.removeItem(RECENT_KEY);
    setRecentSearches([]);
  };

  const highlightText = (text: string, q: string) => {
    const idx = text.indexOf(q);
    if (idx === -1) return <span>{text}</span>;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-yellow-200 text-gray-900 rounded px-0.5">{text.slice(idx, idx + q.length)}</mark>
        {text.slice(idx + q.length)}
      </>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="구절 검색..."
            className="w-full pl-9 pr-9 py-2 text-sm bg-gray-100 rounded-xl outline-none focus:bg-gray-50 focus:ring-2 focus:ring-blue-100 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors text-gray-400"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 shrink-0"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 overflow-y-auto">
        {!query.trim() ? (
          /* 최근 검색어 */
          recentSearches.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
              <Search className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm">검색어를 입력하세요</p>
            </div>
          ) : (
            <div className="px-4 pt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">최근 검색어</span>
                <button
                  onClick={handleClearAll}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  전체 삭제
                </button>
              </div>
              <ul className="space-y-1">
                {recentSearches.map((recent) => (
                  <li key={recent}>
                    <button
                      onClick={() => handleRecentClick(recent)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      <Clock className="w-4 h-4 text-gray-300 shrink-0" />
                      <span className="flex-1 text-left text-sm text-gray-700">{recent}</span>
                      <button
                        onClick={(e) => handleDeleteRecent(recent, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-gray-200 transition-all text-gray-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )
        ) : (
          /* 검색 결과 */
          <div>
            {searchResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                <p className="text-sm">검색 결과가 없습니다</p>
                <p className="text-xs mt-1 text-gray-300">"{query.trim()}"</p>
              </div>
            ) : (
              <>
                <p className="px-4 pt-4 pb-2 text-xs text-gray-400">
                  검색 결과 {searchResults.length >= 100 ? '100+' : searchResults.length}개
                </p>
                <ul>
                  {searchResults.map((r, i) => (
                    <li key={i}>
                      <button
                        onClick={() => handleSelect(r.book, r.chapter)}
                        className="w-full flex items-start gap-3 px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0"
                      >
                        <div className="flex-1 text-left min-w-0">
                          <span className="text-xs font-semibold text-blue-600 block mb-0.5">
                            {r.book} {r.chapter}:{r.verse}
                          </span>
                          <span className="text-sm text-gray-700 leading-relaxed">
                            {highlightText(r.text, query.trim())}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 mt-1" />
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
