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
import { sampleMembers, sampleComments, myGroups, findGroups } from '@/data/groupsData';

export function GroupReading() {
  const [mainTab, setMainTab] = useState<'my-groups' | 'find-groups'>('my-groups');
  const [activeTab, setActiveTab] = useState<'members' | 'comments'>('members');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGroups = findGroups.filter(
    (g) =>
      g.name.includes(searchQuery) ||
      g.description.includes(searchQuery) ||
      g.category.includes(searchQuery),
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 메인 탭 */}
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

      {/* 내 그룹 */}
      {mainTab === 'my-groups' && (
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="people-outline" size={22} color="#9333EA" />
            <Text style={styles.cardTitle}>함께 읽기</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{sampleMembers.length}명 참여중</Text>
            </View>
          </View>

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
            <View style={styles.list}>
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
            <View style={styles.list}>
              {sampleComments.map((comment) => (
                <View key={comment.id} style={styles.commentCard}>
                  <View style={styles.commentHeader}>
                    <Ionicons name="person-outline" size={14} color="#6B7280" />
                    <Text style={styles.commentAuthor}>{comment.author}</Text>
                    <Text style={styles.commentDot}>•</Text>
                    <Text style={styles.commentTime}>{comment.timestamp}</Text>
                  </View>
                  <View style={[styles.badge, styles.commentBadge]}>
                    <Text style={styles.badgeText}>{comment.reference}</Text>
                  </View>
                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}

      {/* 그룹 찾기 */}
      {mainTab === 'find-groups' && (
        <View style={styles.findContainer}>
          <View style={styles.searchCard}>
            <Ionicons name="search" size={18} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="그룹 검색..."
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {filteredGroups.map((group) => (
            <View key={group.id} style={styles.findCard}>
              <View style={styles.findCardContent}>
                <Text style={styles.findGroupName}>{group.name}</Text>
                <Text style={styles.findGroupDesc}>{group.description}</Text>
                <View style={styles.findGroupMeta}>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{group.category}</Text>
                  </View>
                  <View style={styles.memberCountRow}>
                    <Ionicons name="people-outline" size={14} color="#6B7280" />
                    <Text style={styles.memberCountText}>{group.members}명</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.joinBtn}>
                <Ionicons name="add" size={16} color="#fff" />
                <Text style={styles.joinBtnText}>가입</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainTabRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  mainTabBtn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  mainTabBtnActive: {
    backgroundColor: '#9333EA',
  },
  mainTabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6B7280',
  },
  mainTabTextActive: {
    color: '#fff',
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
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
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
  },
  subTabRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  subTabBtn: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  subTabBtnActive: {
    backgroundColor: '#9333EA',
  },
  subTabText: {
    fontSize: 14,
    color: '#6B7280',
  },
  subTabTextActive: {
    color: '#fff',
  },
  list: {
    gap: 8,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  memberInfo: {
    flex: 1,
  },
  memberNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  memberName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
  },
  outlineBadge: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  outlineBadgeText: {
    fontSize: 11,
    color: '#6B7280',
  },
  memberReading: {
    fontSize: 13,
    color: '#6B7280',
  },
  commentCard: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  commentAuthor: {
    fontSize: 13,
    color: '#374151',
  },
  commentDot: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  commentTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  commentBadge: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  commentText: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 20,
  },
  findContainer: {
    gap: 12,
  },
  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  findCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  findCardContent: {
    flex: 1,
    marginRight: 12,
  },
  findGroupName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  findGroupDesc: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 10,
    lineHeight: 19,
  },
  findGroupMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  memberCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  memberCountText: {
    fontSize: 13,
    color: '#6B7280',
  },
  joinBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#9333EA',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  joinBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
});
