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
  const [newRef, setNewRef] = useState('');
  const [newText, setNewText] = useState('');

  const handleAddNote = () => {
    if (newRef.trim() && newText.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        reference: newRef.trim(),
        text: newText.trim(),
        createdAt: new Date().toLocaleDateString('ko-KR'),
      };
      setNotes([note, ...notes]);
      setNewRef('');
      setNewText('');
      setIsAdding(false);
    }
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <View style={styles.card}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Ionicons name="document-text" size={22} color="#CA8A04" />
        <Text style={styles.title}>나의 메모</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setIsAdding(!isAdding)}>
          <Ionicons name="add" size={16} color="#374151" />
          <Text style={styles.addBtnText}>새 메모</Text>
        </TouchableOpacity>
      </View>

      {/* 추가 폼 */}
      {isAdding && (
        <View style={styles.addForm}>
          <TextInput
            style={styles.refInput}
            placeholder="성경 구절 (예: 창세기 1:1)"
            value={newRef}
            onChangeText={setNewRef}
            placeholderTextColor="#9CA3AF"
          />
          <TextInput
            style={styles.textInput}
            placeholder="메모 내용을 입력하세요..."
            value={newText}
            onChangeText={setNewText}
            multiline
            numberOfLines={4}
            placeholderTextColor="#9CA3AF"
            textAlignVertical="top"
          />
          <View style={styles.formBtns}>
            <TouchableOpacity style={styles.saveBtn} onPress={handleAddNote}>
              <Text style={styles.saveBtnText}>저장</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setIsAdding(false)}>
              <Text style={styles.cancelBtnText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 메모 목록 */}
      {notes.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Ionicons name="document-text-outline" size={48} color="#D1D5DB" />
          <Text style={styles.emptyText}>아직 작성한 메모가 없습니다</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {notes.map((note) => (
            <View key={note.id} style={styles.noteCard}>
              <View style={styles.noteHeader}>
                <View style={styles.refBadge}>
                  <Text style={styles.refBadgeText}>{note.reference}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDeleteNote(note.id)} hitSlop={8}>
                  <Ionicons name="trash-outline" size={16} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
              <Text style={styles.noteText}>{note.text}</Text>
              <Text style={styles.noteDate}>{note.createdAt}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  title: { fontSize: 16, fontWeight: '600', flex: 1 },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  addBtnText: { fontSize: 13, color: '#374151' },
  addForm: {
    backgroundColor: '#FEFCE8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 14,
    marginBottom: 16,
    gap: 10,
  },
  refInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    backgroundColor: '#fff',
    color: '#111827',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    backgroundColor: '#fff',
    color: '#111827',
    minHeight: 80,
  },
  formBtns: { flexDirection: 'row', gap: 8 },
  saveBtn: { backgroundColor: '#111827', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 8 },
  saveBtnText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  cancelBtn: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 8 },
  cancelBtnText: { color: '#374151', fontSize: 13 },
  emptyWrap: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40, gap: 8 },
  emptyText: { fontSize: 14, color: '#9CA3AF' },
  noteCard: {
    backgroundColor: '#FEFCE8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 14,
    marginBottom: 10,
  },
  noteHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  refBadge: { backgroundColor: '#E5E7EB', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 },
  refBadgeText: { fontSize: 11, color: '#374151', fontWeight: '500' },
  noteText: { fontSize: 13, color: '#374151', lineHeight: 20, marginBottom: 6 },
  noteDate: { fontSize: 11, color: '#9CA3AF' },
});
