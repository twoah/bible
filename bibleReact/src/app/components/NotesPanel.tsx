import { useState } from 'react';
import { StickyNote, Trash2, Plus } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';

interface Note {
  id: string;
  reference: string;
  text: string;
  createdAt: string;
}

const sampleNotes: Note[] = [
  {
    id: '1',
    reference: '창세기 1:1',
    text: '하나님의 창조는 무에서 유를 만드신 것. 모든 것의 시작이 하나님이심을 기억하자.',
    createdAt: '2025-12-30',
  },
  {
    id: '2',
    reference: '요한복음 1:1',
    text: '말씀이 곧 하나님. 예수님이 태초부터 하나님과 함께 계셨다는 진리.',
    createdAt: '2025-12-29',
  },
];

export function NotesPanel() {
  const [notes, setNotes] = useState<Note[]>(sampleNotes);
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState({ reference: '', text: '' });

  const handleAddNote = () => {
    if (newNote.reference && newNote.text) {
      const note: Note = {
        id: Date.now().toString(),
        reference: newNote.reference,
        text: newNote.text,
        createdAt: new Date().toLocaleDateString('ko-KR'),
      };
      setNotes([note, ...notes]);
      setNewNote({ reference: '', text: '' });
      setIsAdding(false);
    }
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <StickyNote className="w-6 h-6 text-yellow-600" />
        <h2>나의 메모</h2>
        <Button
          size="sm"
          variant="outline"
          className="ml-auto"
          onClick={() => setIsAdding(!isAdding)}
        >
          <Plus className="w-4 h-4 mr-2" />
          새 메모
        </Button>
      </div>

      {isAdding && (
        <div className="mb-6 p-4 rounded-lg border border-gray-200 bg-yellow-50">
          <input
            type="text"
            placeholder="성경 구절 (예: 창세기 1:1)"
            value={newNote.reference}
            onChange={(e) => setNewNote({ ...newNote, reference: e.target.value })}
            className="w-full mb-3 px-3 py-2 rounded border border-gray-300 text-sm"
          />
          <Textarea
            placeholder="메모 내용을 입력하세요..."
            value={newNote.text}
            onChange={(e) => setNewNote({ ...newNote, text: e.target.value })}
            className="mb-3"
            rows={4}
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleAddNote}>
              저장
            </Button>
            <Button size="sm" variant="outline" onClick={() => setIsAdding(false)}>
              취소
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {notes.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <StickyNote className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>아직 작성한 메모가 없습니다</p>
          </div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="p-4 rounded-lg border border-gray-200 bg-yellow-50">
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary">{note.reference}</Badge>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm mb-2">{note.text}</p>
              <p className="text-xs text-gray-400">{note.createdAt}</p>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
