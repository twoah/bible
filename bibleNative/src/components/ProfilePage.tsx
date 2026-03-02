import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Card } from './ui/Card';
import { Progress } from './ui/Progress';
import { Badge } from './ui/Badge';

interface ProfilePageProps {
  onBack: () => void;
}

export function ProfilePage({ onBack }: ProfilePageProps) {
  const stats = {
    totalChaptersRead: 47,
    consecutiveDays: 12,
    groupsJoined: 3,
    notesCreated: 15,
    highlightedVerses: 28,
    weeklyGoal: 7,
    weeklyProgress: 5,
  };

  const achievements = [
    { id: 1, title: '7일 연속 독서', icon: '📅', color: '#3b82f6', earned: true },
    { id: 2, title: '첫 그룹 참여', icon: '👥', color: '#9333ea', earned: true },
    { id: 3, title: '50개 장 완독', icon: '📖', color: '#22c55e', earned: false },
    { id: 4, title: '10개 메모 작성', icon: '📝', color: '#eab308', earned: true },
  ];

  const readingHistory = [
    { date: '2025-12-31', chapters: 2, books: ['창세기 3장', '요한복음 4장'] },
    { date: '2025-12-30', chapters: 1, books: ['시편 23장'] },
    { date: '2025-12-29', chapters: 3, books: ['창세기 1장', '창세기 2장', '요한복음 1장'] },
  ];

  const statItems = [
    { label: '총 읽은 장', value: stats.totalChaptersRead, icon: '📖', color: '#2563eb', bg: '#eff6ff' },
    { label: '참여 그룹', value: stats.groupsJoined, icon: '👥', color: '#9333ea', bg: '#f5f3ff' },
    { label: '작성 메모', value: stats.notesCreated, icon: '📝', color: '#ca8a04', bg: '#fefce8' },
    { label: '하이라이트', value: stats.highlightedVerses, icon: '🖊', color: '#16a34a', bg: '#f0fdf4' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 헤더 */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>프로필</Text>
      </View>

      {/* 프로필 카드 */}
      <Card style={styles.card}>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>사용자님</Text>
            <Text style={styles.userSub}>함께 읽는 성경</Text>
            <View style={styles.badgeRow}>
              <Badge variant="secondary">{`📅 ${stats.consecutiveDays}일 연속`}</Badge>
              <Badge variant="secondary" style={styles.badgeGap}>{`📖 ${stats.totalChaptersRead}장 완독`}</Badge>
            </View>
          </View>
        </View>

        {/* 주간 목표 */}
        <View style={styles.weeklyGoal}>
          <View style={styles.weeklyGoalHeader}>
            <Text style={styles.weeklyIcon}>📈</Text>
            <Text style={styles.weeklyLabel}>주간 독서 목표</Text>
            <Text style={styles.weeklyCount}>{stats.weeklyProgress} / {stats.weeklyGoal} 장</Text>
          </View>
          <Progress value={(stats.weeklyProgress / stats.weeklyGoal) * 100} height={10} />
        </View>
      </Card>

      {/* 통계 */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>독서 통계</Text>
        <View style={styles.statsGrid}>
          {statItems.map((item, i) => (
            <View key={i} style={[styles.statItem, { backgroundColor: item.bg }]}>
              <View style={styles.statHeader}>
                <Text style={styles.statIcon}>{item.icon}</Text>
                <Text style={styles.statLabel}>{item.label}</Text>
              </View>
              <Text style={[styles.statValue, { color: item.color }]}>{item.value}</Text>
            </View>
          ))}
        </View>
      </Card>

      {/* 업적 */}
      <Card style={styles.card}>
        <View style={styles.achieveHeader}>
          <Text style={styles.achieveHeaderIcon}>🏆</Text>
          <Text style={styles.sectionTitle}>업적</Text>
        </View>
        <View style={styles.achieveGrid}>
          {achievements.map((a) => (
            <View
              key={a.id}
              style={[
                styles.achieveItem,
                a.earned ? styles.achieveEarned : styles.achieveUnearned,
              ]}
            >
              <View style={[styles.achieveIcon, { backgroundColor: a.earned ? a.color : '#cbd5e1' }]}>
                <Text style={styles.achieveIconText}>{a.icon}</Text>
              </View>
              <Text style={[styles.achieveTitle, !a.earned && styles.achieveTitleDim]}>
                {a.title}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      {/* 독서 기록 */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>최근 독서 기록</Text>
        {readingHistory.map((record, idx) => {
          const d = new Date(record.date);
          const isLast = idx === readingHistory.length - 1;
          return (
            <View key={idx} style={[styles.historyRow, !isLast && styles.historyBorder]}>
              <View style={styles.historyDate}>
                <Text style={styles.historyMonth}>{d.getMonth() + 1}월</Text>
                <Text style={styles.historyDay}>{d.getDate()}</Text>
              </View>
              <View style={styles.historyContent}>
                <Badge variant="secondary" style={styles.historyBadge}>{`${record.chapters}개 장`}</Badge>
                {record.books.map((book, bi) => (
                  <Text key={bi} style={styles.historyBook}>• {book}</Text>
                ))}
              </View>
            </View>
          );
        })}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  backBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  backIcon: {
    fontSize: 18,
    color: '#1e293b',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#030213',
  },
  card: {
    marginBottom: 12,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#9333ea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: {
    fontSize: 32,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#030213',
  },
  userSub: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
  },
  badgeGap: {},
  weeklyGoal: {
    backgroundColor: '#f5f3ff',
    borderRadius: 10,
    padding: 14,
    gap: 10,
  },
  weeklyGoalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  weeklyIcon: {
    fontSize: 18,
  },
  weeklyLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    flex: 1,
  },
  weeklyCount: {
    fontSize: 13,
    color: '#9333ea',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#030213',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statItem: {
    width: '47%',
    borderRadius: 10,
    padding: 14,
    gap: 8,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statIcon: {
    fontSize: 16,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  statValue: {
    fontSize: 26,
    fontWeight: '700',
  },
  achieveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  achieveHeaderIcon: {
    fontSize: 18,
  },
  achieveGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  achieveItem: {
    width: '47%',
    borderRadius: 10,
    padding: 14,
    borderWidth: 2,
  },
  achieveEarned: {
    borderColor: '#fdba74',
    backgroundColor: '#fff7ed',
  },
  achieveUnearned: {
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    opacity: 0.6,
  },
  achieveIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  achieveIconText: {
    fontSize: 20,
  },
  achieveTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1e293b',
  },
  achieveTitleDim: {
    color: '#94a3b8',
  },
  historyRow: {
    flexDirection: 'row',
    paddingVertical: 14,
    gap: 16,
  },
  historyBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  historyDate: {
    alignItems: 'center',
    minWidth: 32,
  },
  historyMonth: {
    fontSize: 11,
    color: '#94a3b8',
  },
  historyDay: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    lineHeight: 28,
  },
  historyContent: {
    flex: 1,
    gap: 4,
  },
  historyBadge: {
    alignSelf: 'flex-start',
  },
  historyBook: {
    fontSize: 13,
    color: '#64748b',
  },
});
