import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

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
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <Card style={styles.card}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerIcon}>📝</Text>
        <Text style={styles.headerTitle}>나의 메모</Text>
        <Button
          size="sm"
          variant="outline"
          onPress={() => setIsAdding(!isAdding)}
          style={styles.addBtn}
        >
          <Text style={styles.addBtnText}>➕ 새 메모</Text>
        </Button>
      </View>

      {/* 메모 추가 폼 */}
      {isAdding && (
        <View style={styles.addForm}>
          <TextInput
            placeholder="성경 구절 (예: 창세기 1:1)"
            placeholderTextColor="#94a3b8"
            value={newNote.reference}
            onChangeText={(t) => setNewNote({ ...newNote, reference: t })}
            style={styles.referenceInput}
          />
          <TextInput
            placeholder="메모 내용을 입력하세요..."
            placeholderTextColor="#94a3b8"
            value={newNote.text}
            onChangeText={(t) => setNewNote({ ...newNote, text: t })}
            multiline
            numberOfLines={4}
            style={styles.textArea}
            textAlignVertical="top"
          />
          <View style={styles.formBtns}>
            <Button size="sm" onPress={handleAddNote}>
              저장
            </Button>
            <Button size="sm" variant="outline" onPress={() => setIsAdding(false)} style={styles.cancelBtn}>
              취소
            </Button>
          </View>
        </View>
      )}

      {/* 메모 목록 */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {notes.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyText}>아직 작성한 메모가 없습니다</Text>
          </View>
        ) : (
          <View style={styles.noteList}>
            {notes.map((note) => (
              <View key={note.id} style={styles.noteCard}>
                <View style={styles.noteTopRow}>
                  <Badge variant="secondary">{note.reference}</Badge>
                  <TouchableOpacity
                    onPress={() => handleDeleteNote(note.id)}
                    style={styles.deleteBtn}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.deleteIcon}>🗑</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.noteText}>{note.text}</Text>
                <Text style={styles.noteDate}>{note.createdAt}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
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
  addBtn: {},
  addBtnText: {
    fontSize: 13,
    color: '#030213',
  },
  addForm: {
    backgroundColor: '#fefce8',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    gap: 10,
  },
  referenceInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#1e293b',
    backgroundColor: '#ffffff',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#1e293b',
    backgroundColor: '#ffffff',
    minHeight: 90,
  },
  formBtns: {
    flexDirection: 'row',
    gap: 8,
  },
  cancelBtn: {
    marginLeft: 4,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  emptyIcon: {
    fontSize: 40,
    opacity: 0.4,
  },
  emptyText: {
    fontSize: 14,
    color: '#94a3b8',
  },
  noteList: {
    gap: 12,
  },
  noteCard: {
    backgroundColor: '#fefce8',
    borderRadius: 10,
    padding: 12,
    gap: 8,
  },
  noteTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteBtn: {
    padding: 4,
  },
  deleteIcon: {
    fontSize: 16,
  },
  noteText: {
    fontSize: 14,
    color: '#1e293b',
    lineHeight: 20,
  },
  noteDate: {
    fontSize: 12,
    color: '#94a3b8',
  },
});
