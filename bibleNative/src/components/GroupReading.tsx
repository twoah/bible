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
import { Avatar } from './ui/Avatar';
import { Badge } from './ui/Badge';

interface GroupMember {
  id: string;
  name: string;
  progress: number;
  currentReading: string;
  color: string;
}

const sampleMembers: GroupMember[] = [
  { id: '1', name: '김민수', progress: 75, currentReading: '창세기 2장', color: '#3b82f6' },
  { id: '2', name: '이지은', progress: 60, currentReading: '요한복음 1장', color: '#9333ea' },
  { id: '3', name: '박준영', progress: 85, currentReading: '시편 23장', color: '#22c55e' },
  { id: '4', name: '최서연', progress: 50, currentReading: '창세기 1장', color: '#ec4899' },
];

interface Comment {
  id: string;
  author: string;
  text: string;
  reference: string;
  timestamp: string;
}

const sampleComments: Comment[] = [
  {
    id: '1',
    author: '김민수',
    text: '이 구절이 정말 은혜롭네요. 하나님의 창조 섭리가 느껴집니다.',
    reference: '창세기 1:3',
    timestamp: '2시간 전',
  },
  {
    id: '2',
    author: '이지은',
    text: '말씀이 곧 하나님이시라는 부분에서 깊이 묵상하게 됩니다.',
    reference: '요한복음 1:1',
    timestamp: '5시간 전',
  },
  {
    id: '3',
    author: '박준영',
    text: '여호와는 나의 목자... 이 시편을 읽을 때마다 평안함을 느낍니다.',
    reference: '시편 23:1',
    timestamp: '1일 전',
  },
];

interface GroupInfo {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
}

const sampleGroups: GroupInfo[] = [
  { id: '1', name: '새벽기도 성경읽기', description: '매일 새벽 6시 함께 성경을 읽고 묵상을 나눕니다.', members: 12, category: '새벽기도' },
  { id: '2', name: '청년 성경통독', description: '1년 1독 계획으로 청년들이 함께 읽습니다.', members: 24, category: '청년' },
  { id: '3', name: '주부 말씀나눔', description: '오전 시간을 활용한 주부들의 성경 읽기 모임', members: 8, category: '주부' },
  { id: '4', name: '직장인 점심 QT', description: '점심시간에 간단히 말씀을 읽고 나눕니다.', members: 15, category: '직장인' },
];

export function GroupReading() {
  const [mainTab, setMainTab] = useState<'my-groups' | 'find-groups'>('my-groups');
  const [activeTab, setActiveTab] = useState<'members' | 'comments'>('members');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 메인 탭 */}
      <View style={styles.mainTabRow}>
        <TouchableOpacity
          style={[styles.mainTabBtn, mainTab === 'my-groups' && styles.mainTabActive]}
          onPress={() => setMainTab('my-groups')}
          activeOpacity={0.7}
        >
          <Text style={[styles.mainTabText, mainTab === 'my-groups' && styles.mainTabActiveText]}>
            내 그룹
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.mainTabBtn, mainTab === 'find-groups' && styles.mainTabActive]}
          onPress={() => setMainTab('find-groups')}
          activeOpacity={0.7}
        >
          <Text style={[styles.mainTabText, mainTab === 'find-groups' && styles.mainTabActiveText]}>
            그룹 찾기
          </Text>
        </TouchableOpacity>
      </View>

      {/* 내 그룹 */}
      {mainTab === 'my-groups' && (
        <Card>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>👥</Text>
            <Text style={styles.sectionTitle}>함께 읽기</Text>
            <Badge variant="secondary" style={styles.memberBadge}>
              {`${sampleMembers.length}명 참여중`}
            </Badge>
          </View>

          <View style={styles.subTabRow}>
            {(['members', 'comments'] as const).map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.subTabBtn, activeTab === tab && styles.subTabActive]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.7}
              >
                <Text style={[styles.subTabText, activeTab === tab && styles.subTabActiveText]}>
                  {tab === 'members' ? '멤버' : '나눔'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {activeTab === 'members' ? (
            <View style={styles.list}>
              {sampleMembers.map((member) => (
                <View key={member.id} style={styles.memberRow}>
                  <Avatar
                    initial={member.name.charAt(0)}
                    backgroundColor={member.color}
                    size={40}
                  />
                  <View style={styles.memberInfo}>
                    <View style={styles.memberNameRow}>
                      <Text style={styles.memberName}>{member.name}</Text>
                      <Badge variant="outline">{`${member.progress}%`}</Badge>
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
                    <Text style={styles.commentAuthorIcon}>👤</Text>
                    <Text style={styles.commentAuthor}>{comment.author}</Text>
                    <Text style={styles.commentDot}> · </Text>
                    <Text style={styles.commentTime}>{comment.timestamp}</Text>
                  </View>
                  <Badge variant="secondary" style={styles.commentRef}>
                    {comment.reference}
                  </Badge>
                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
              ))}
            </View>
          )}
        </Card>
      )}

      {/* 그룹 찾기 */}
      {mainTab === 'find-groups' && (
        <View style={styles.list}>
          <Card style={styles.searchCard}>
            <View style={styles.searchRow}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                placeholder="그룹 검색..."
                placeholderTextColor="#94a3b8"
                style={styles.searchInput}
              />
            </View>
          </Card>

          {sampleGroups.map((group) => (
            <Card key={group.id} style={styles.groupCard}>
              <View style={styles.groupCardHeader}>
                <View style={styles.groupCardInfo}>
                  <Text style={styles.groupCardName}>{group.name}</Text>
                  <Text style={styles.groupCardDesc}>{group.description}</Text>
                  <View style={styles.groupCardMeta}>
                    <Badge variant="secondary">{group.category}</Badge>
                    <View style={styles.groupMemberCount}>
                      <Text style={styles.groupMemberIcon}>👥</Text>
                      <Text style={styles.groupMemberText}>{group.members}명</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.joinBtn} activeOpacity={0.7}>
                  <Text style={styles.joinBtnText}>➕ 가입</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </View>
      )}
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
    marginBottom: 12,
  },
  mainTabBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  mainTabActive: {
    backgroundColor: '#9333ea',
  },
  mainTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  mainTabActiveText: {
    color: '#ffffff',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionIcon: {
    fontSize: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#030213',
    flex: 1,
  },
  memberBadge: {
    alignSelf: 'flex-start',
  },
  subTabRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  subTabBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
  },
  subTabActive: {
    backgroundColor: '#9333ea',
  },
  subTabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748b',
  },
  subTabActiveText: {
    color: '#ffffff',
  },
  list: {
    gap: 8,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  memberInfo: {
    flex: 1,
  },
  memberNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
  },
  memberReading: {
    fontSize: 13,
    color: '#64748b',
  },
  commentCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    padding: 12,
    gap: 6,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commentAuthorIcon: {
    fontSize: 13,
  },
  commentAuthor: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1e293b',
  },
  commentDot: {
    color: '#94a3b8',
    fontSize: 13,
  },
  commentTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
  commentRef: {
    alignSelf: 'flex-start',
  },
  commentText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 20,
  },
  searchCard: {
    marginBottom: 4,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1e293b',
    paddingVertical: 4,
  },
  groupCard: {
    marginBottom: 4,
  },
  groupCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  groupCardInfo: {
    flex: 1,
    gap: 6,
  },
  groupCardName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
  },
  groupCardDesc: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
  },
  groupCardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  groupMemberCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  groupMemberIcon: {
    fontSize: 13,
  },
  groupMemberText: {
    fontSize: 13,
    color: '#64748b',
  },
  joinBtn: {
    backgroundColor: '#9333ea',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 12,
  },
  joinBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
  },
});
