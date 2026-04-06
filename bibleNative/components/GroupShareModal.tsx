import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { myGroups } from '@/data/groupsData';

interface GroupShareModalProps {
  visible: boolean;
  verseCount: number;
  onClose: () => void;
}

export function GroupShareModal({ visible, verseCount, onClose }: GroupShareModalProps) {
  const [shared, setShared] = useState<string | null>(null);

  const handleShare = (groupId: string, groupName: string) => {
    setShared(groupName);
    setTimeout(() => {
      setShared(null);
      onClose();
    }, 1200);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>그룹에 공유</Text>
            <Text style={styles.subtitle}>{verseCount}개 구절을 공유합니다</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {myGroups.map((group) => (
          <TouchableOpacity
            key={group.id}
            style={styles.groupRow}
            onPress={() => handleShare(group.id, group.name)}
          >
            <View style={styles.groupIcon}>
              <Ionicons name="people-outline" size={20} color="#9333EA" />
            </View>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{group.name}</Text>
              <Text style={styles.groupMembers}>멤버 {group.members}명</Text>
            </View>
            {shared === group.name ? (
              <View style={styles.sharedBadge}>
                <Ionicons name="checkmark" size={14} color="#9333EA" />
                <Text style={styles.sharedText}>공유됨</Text>
              </View>
            ) : (
              <View style={styles.shareBadge}>
                <Text style={styles.shareText}>공유</Text>
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
    shadowRadius: 8,
    elevation: 10,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  closeBtn: {
    padding: 8,
    borderRadius: 20,
  },
  groupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  groupMembers: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  sharedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sharedText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#9333EA',
  },
  shareBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FAF5FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9D5FF',
  },
  shareText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9333EA',
  },
});
