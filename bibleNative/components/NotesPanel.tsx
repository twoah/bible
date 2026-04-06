import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Ionicons name="document-text-outline" size={22} color="#CA8A04" />
          <Text style={styles.title}>나의 메모</Text>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => setIsAdding(!isAdding)}
          >
            <Ionicons name="add" size={16} color="#374151" />
            <Text style={styles.addBtnText}>새 메모</Text>
          </TouchableOpacity>
        </View>

        {isAdding && (
          <View style={styles.addForm}>
            <TextInput
              style={styles.refInput}
              placeholder="성경 구절 (예: 창세기 1:1)"
              placeholderTextColor="#9CA3AF"
              value={newNote.reference}
              onChangeText={(t) => setNewNote({ ...newNote, reference: t })}
            />
            <TextInput
              style={styles.textInput}
              placeholder="메모 내용을 입력하세요..."
              placeholderTextColor="#9CA3AF"
              value={newNote.text}
              onChangeText={(t) => setNewNote({ ...newNote, text: t })}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <View style={styles.formBtns}>
              <TouchableOpacity style={styles.saveBtn} onPress={handleAddNote}>
                <Text style={styles.saveBtnText}>저장</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setIsAdding(false)}
              >
                <Text style={styles.cancelBtnText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {notes.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={48} color="#D1D5DB" />
            <Text style={styles.emptyText}>아직 작성한 메모가 없습니다</Text>
          </View>
        ) : (
          <View style={styles.noteList}>
            {notes.map((note) => (
              <View key={note.id} style={styles.noteCard}>
                <View style={styles.noteHeader}>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{note.reference}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleDeleteNote(note.id)}>
                    <Ionicons name="trash-outline" size={16} color="#9CA3AF" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.noteText}>{note.text}</Text>
                <Text style={styles.noteDate}>{note.createdAt}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
  },
  addBtnText: {
    fontSize: 13,
    color: '#374151',
  },
  addForm: {
    backgroundColor: '#FEFCE8',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 10,
  },
  refInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    backgroundColor: '#fff',
    color: '#111827',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    backgroundColor: '#fff',
    minHeight: 80,
    color: '#111827',
  },
  formBtns: {
    flexDirection: 'row',
    gap: 8,
  },
  saveBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#9333EA',
    borderRadius: 8,
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
  },
  cancelBtnText: {
    fontSize: 14,
    color: '#374151',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  noteList: {
    gap: 12,
  },
  noteCard: {
    backgroundColor: '#FEFCE8',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  noteText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  noteDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
