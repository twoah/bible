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
import { sampleMembers, sampleComments, myGroups, findGroups } from '../data/groupsData';

export function GroupReading() {
  const [mainTab, setMainTab] = useState<'my-groups' | 'find-groups'>('my-groups');
  const [activeTab, setActiveTab] = useState<'members' | 'comments'>('members');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGroups = findGroups.filter(
    (g) =>
      searchQuery === '' ||
      g.name.includes(searchQuery) ||
      g.description.includes(searchQuery)
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Main Tab */}
      <View style={styles.mainTabRow}>
        <TouchableOpacity
          style={[styles.mainTabBtn, mainTab === 'my-groups' && styles.mainTabBtnActive]}
          onPress={() => setMainTab('my-groups')}
        >
          <Text style={[styles.mainTabText, mainTab === 'my-groups' && styles.mainTabTextActive]}>
            내 그룹
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.mainTabBtn, mainTab === 'find-groups' && styles.mainTabBtnActive]}
          onPress={() => setMainTab('find-groups')}
        >
          <Text style={[styles.mainTabText, mainTab === 'find-groups' && styles.mainTabTextActive]}>
            그룹 찾기
          </Text>
        </TouchableOpacity>
      </View>

      {/* My Groups */}
      {mainTab === 'my-groups' && (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="people" size={22} color="#9333EA" />
            <Text style={styles.cardTitle}>함께 읽기</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{sampleMembers.length}명 참여중</Text>
            </View>
          </View>

          {/* Sub Tab */}
          <View style={styles.subTabRow}>
            <TouchableOpacity
              style={[styles.subTabBtn, activeTab === 'members' && styles.subTabBtnActive]}
              onPress={() => setActiveTab('members')}
            >
              <Text style={[styles.subTabText, activeTab === 'members' && styles.subTabTextActive]}>
                멤버
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.subTabBtn, activeTab === 'comments' && styles.subTabBtnActive]}
              onPress={() => setActiveTab('comments')}
            >
              <Text style={[styles.subTabText, activeTab === 'comments' && styles.subTabTextActive]}>
                나눔
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'members' ? (
            <View>
              {sampleMembers.map((member) => (
                <View key={member.id} style={styles.memberRow}>
                  <View style={[styles.avatar, { backgroundColor: member.color }]}>
                    <Text style={styles.avatarText}>{member.name.charAt(0)}</Text>
                  </View>
                  <View style={styles.memberInfo}>
                    <View style={styles.memberNameRow}>
                      <Text style={styles.memberName}>{member.name}</Text>
                      <View style={styles.outlineBadge}>
                        <Text style={styles.outlineBadgeText}>{member.progress}%</Text>
                      </View>
                    </View>
                    <Text style={styles.memberReading}>{member.currentReading}</Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View>
              {sampleComments.map((comment) => (
                <View key={comment.id} style={styles.commentCard}>
                  <View style={styles.commentHeader}>
                    <Ionicons name="person" size={14} color="#6B7280" />
                    <Text style={styles.commentAuthor}>{comment.author}</Text>
                    <Text style={styles.commentDot}>•</Text>
                    <Text style={styles.commentTime}>{comment.timestamp}</Text>
                  </View>
                  <View style={styles.refBadge}>
                    <Text style={styles.refBadgeText}>{comment.reference}</Text>
                  </View>
                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}

      {/* Find Groups */}
      {mainTab === 'find-groups' && (
        <View>
          <View style={styles.searchCard}>
            <Ionicons name="search" size={18} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="그룹 검색..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          {filteredGroups.map((group) => (
            <View key={group.id} style={styles.groupCard}>
              <View style={styles.groupCardInner}>
                <View style={styles.groupInfo}>
                  <Text style={styles.groupName}>{group.name}</Text>
                  <Text style={styles.groupDesc}>{group.description}</Text>
                  <View style={styles.groupMeta}>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryText}>{group.category}</Text>
                    </View>
                    <View style={styles.memberCount}>
                      <Ionicons name="people" size={14} color="#6B7280" />
                      <Text style={styles.memberCountText}>{group.members}명</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.joinBtn}>
                  <Ionicons name="add" size={16} color="#fff" />
                  <Text style={styles.joinBtnText}>가입</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mainTabRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  mainTabBtn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  mainTabBtnActive: { backgroundColor: '#9333EA' },
  mainTabText: { fontWeight: '600', color: '#4B5563' },
  mainTabTextActive: { color: '#fff' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: '600', flex: 1 },
  badge: { backgroundColor: '#F3F4F6', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText: { fontSize: 12, color: '#374151' },
  subTabRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  subTabBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  subTabBtnActive: { backgroundColor: '#9333EA' },
  subTabText: { color: '#4B5563' },
  subTabTextActive: { color: '#fff' },
  memberRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 },
  avatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  memberInfo: { flex: 1 },
  memberNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 },
  memberName: { fontWeight: '500' },
  outlineBadge: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 1 },
  outlineBadgeText: { fontSize: 11, color: '#374151' },
  memberReading: { fontSize: 13, color: '#6B7280' },
  commentCard: { backgroundColor: '#F9FAFB', borderRadius: 10, padding: 14, marginBottom: 10 },
  commentHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  commentAuthor: { fontSize: 13, fontWeight: '500' },
  commentDot: { color: '#9CA3AF', fontSize: 12 },
  commentTime: { fontSize: 11, color: '#9CA3AF' },
  refBadge: { backgroundColor: '#E5E7EB', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2, alignSelf: 'flex-start', marginBottom: 6 },
  refBadgeText: { fontSize: 11, color: '#374151' },
  commentText: { fontSize: 13, color: '#374151', lineHeight: 20 },
  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#111827' },
  groupCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10 },
  groupCardInner: { flexDirection: 'row', alignItems: 'flex-start' },
  groupInfo: { flex: 1 },
  groupName: { fontWeight: '600', fontSize: 15, marginBottom: 4 },
  groupDesc: { fontSize: 13, color: '#4B5563', marginBottom: 10 },
  groupMeta: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  categoryBadge: { backgroundColor: '#F3F4F6', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 },
  categoryText: { fontSize: 11, color: '#374151' },
  memberCount: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  memberCountText: { fontSize: 13, color: '#6B7280' },
  joinBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#9333EA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 12,
  },
  joinBtnText: { color: '#fff', fontWeight: '600', fontSize: 13 },
});
