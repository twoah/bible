import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const bookNameMap = {
  '창': '창세기', '출': '출애굽기', '레': '레위기', '민': '민수기', '신': '신명기',
  '수': '여호수아', '삿': '사사기', '룻': '룻기', '삼상': '사무엘상', '삼하': '사무엘하',
  '왕상': '열왕기상', '왕하': '열왕기하', '대상': '역대상', '대하': '역대하',
  '스': '에스라', '느': '느헤미야', '에': '에스더', '욥': '욥기', '시': '시편',
  '잠': '잠언', '전': '전도서', '아': '아가', '사': '이사야', '렘': '예레미야',
  '애': '예레미야애가', '겔': '에스겔', '단': '다니엘', '호': '호세아', '욜': '요엘',
  '암': '아모스', '옵': '오바댜', '욘': '요나', '미': '미가', '나': '나훔',
  '합': '하박국', '습': '스바냐', '학': '학개', '슥': '스가랴', '말': '말라기',
  '마': '마태복음', '막': '마가복음', '눅': '누가복음', '요': '요한복음', '행': '사도행전',
  '롬': '로마서', '고전': '고린도전서', '고후': '고린도후서', '갈': '갈라디아서',
  '엡': '에베소서', '빌': '빌립보서', '골': '골로새서', '살전': '데살로니가전서',
  '살후': '데살로니가후서', '딤전': '디모데전서', '딤후': '디모데후서', '딛': '디도서',
  '몬': '빌레몬서', '히': '히브리서', '약': '야고보서', '벧전': '베드로전서',
  '벧후': '베드로후서', '요일': '요한일서', '요이': '요한이서', '요삼': '요한삼서',
  '유': '유다서', '계': '요한계시록',
};

const bookOrder = Object.keys(bookNameMap);

const content = fs.readFileSync(path.join(__dirname, '../bibleText_utf8.txt'), 'utf-8');
const lines = content.split(/\r?\n/).filter(Boolean);

// bookAbbr -> { chapterNum -> verse[] }
const raw = {};

for (const line of lines) {
  // match e.g. "창1:3" or "고전2:10"
  const match = line.match(/^([가-힣]+)(\d+):(\d+)\s+(.*)$/);
  if (!match) continue;

  const [, abbr, chap, verse, rawText] = match;
  const fullName = bookNameMap[abbr];
  if (!fullName) continue;

  const chapNum = parseInt(chap, 10);
  const verseNum = parseInt(verse, 10);
  // strip section titles like <...>
  const text = rawText.replace(/<[^>]+>\s*/g, '').trim();

  if (!raw[abbr]) raw[abbr] = {};
  if (!raw[abbr][chapNum]) raw[abbr][chapNum] = [];
  raw[abbr][chapNum].push({ verse: verseNum, text });
}

// Build ordered result
const result = {};
for (const abbr of bookOrder) {
  if (!raw[abbr]) continue;
  const fullName = bookNameMap[abbr];
  const chapters = Object.keys(raw[abbr])
    .map(Number)
    .sort((a, b) => a - b)
    .map(chapNum => ({
      chapter: chapNum,
      verses: raw[abbr][chapNum].sort((a, b) => a.verse - b.verse),
    }));
  result[fullName] = chapters;
}

const outPath = path.join(__dirname, '../src/data/bibleData.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(result), 'utf-8');
console.log(`Done. ${Object.keys(result).length} books written to ${outPath}`);
