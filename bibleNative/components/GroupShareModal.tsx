import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { myGroups } from '../data/groupsData';

interface GroupShareModalProps {
  visible: boolean;
  verseCount: number;
  onClose: () => void;
}

export function GroupShareModal({ visible, verseCount, onClose }: GroupShareModalProps) {
  const [shared, setShared] = useState<string | null>(null);

  const handleShare = (groupId: string, groupName: string) => {
    setShared(groupName);
    setTimeout(onClose, 1200);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      {/* 배경 딤 */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* 바텀 시트 */}
      <View style={styles.sheet}>
        {/* 핸들 */}
        <View style={styles.handle} />

        <View style={styles.header}>
          <View>
            <Text style={styles.title}>그룹에 공유</Text>
            <Text style={styles.subtitle}>{verseCount}개 구절을 공유합니다</Text>
          </View>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {myGroups.map((group) => (
          <TouchableOpacity
            key={group.id}
            style={styles.groupRow}
            onPress={() => handleShare(group.id, group.name)}
          >
            <View style={styles.groupIconWrap}>
              <Ionicons name="people" size={20} color="#9333EA" />
            </View>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName} numberOfLines={1}>{group.name}</Text>
              <Text style={styles.groupMembers}>멤버 {group.members}명</Text>
            </View>
            {shared === group.name ? (
              <View style={styles.sharedIndicator}>
                <Ionicons name="checkmark" size={16} color="#9333EA" />
                <Text style={styles.sharedText}>공유됨</Text>
              </View>
            ) : (
              <View style={styles.shareBtn}>
                <Text style={styles.shareBtnText}>공유</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: { fontSize: 16, fontWeight: '600', color: '#111827' },
  subtitle: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  closeBtn: { padding: 6, borderRadius: 20 },
  groupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 4,
  },
  groupIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupInfo: { flex: 1 },
  groupName: { fontSize: 14, fontWeight: '500', color: '#111827' },
  groupMembers: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  sharedIndicator: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  sharedText: { fontSize: 13, fontWeight: '600', color: '#9333EA' },
  shareBtn: {
    borderWidth: 1,
    borderColor: '#DDD6FE',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F5F3FF',
  },
  shareBtnText: { fontSize: 12, fontWeight: '600', color: '#9333EA' },
});
