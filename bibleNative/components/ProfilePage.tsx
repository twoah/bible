import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
    { id: 1, title: '7일 연속 독서', icon: 'calendar-outline' as const, color: '#3B82F6', earned: true },
    { id: 2, title: '첫 그룹 참여', icon: 'people-outline' as const, color: '#9333EA', earned: true },
    { id: 3, title: '50개 장 완독', icon: 'book-outline' as const, color: '#16A34A', earned: false },
    { id: 4, title: '10개 메모 작성', icon: 'document-text-outline' as const, color: '#CA8A04', earned: true },
  ];

  const readingHistory = [
    { date: '2025-12-31', chapters: 2, books: ['창세기 3장', '요한복음 4장'] },
    { date: '2025-12-30', chapters: 1, books: ['시편 23장'] },
    { date: '2025-12-29', chapters: 3, books: ['창세기 1장', '창세기 2장', '요한복음 1장'] },
  ];

  const weeklyPercent = (stats.weeklyProgress / stats.weeklyGoal) * 100;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 헤더 */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>프로필</Text>
      </View>

      {/* 프로필 카드 */}
      <View style={styles.card}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>사용자님</Text>
            <Text style={styles.userSub}>함께 읽는 성경</Text>
            <View style={styles.statBadges}>
              <View style={styles.badge}>
                <Ionicons name="calendar-outline" size={12} color="#374151" />
                <Text style={styles.badgeText}>{stats.consecutiveDays}일 연속</Text>
              </View>
              <View style={styles.badge}>
                <Ionicons name="book-outline" size={12} color="#374151" />
                <Text style={styles.badgeText}>{stats.totalChaptersRead}장 완독</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 주간 목표 */}
        <View style={styles.weeklyGoal}>
          <View style={styles.weeklyHeader}>
            <View style={styles.weeklyTitleRow}>
              <Ionicons name="trending-up" size={18} color="#9333EA" />
              <Text style={styles.weeklyTitle}>주간 독서 목표</Text>
            </View>
            <Text style={styles.weeklyCount}>
              {stats.weeklyProgress} / {stats.weeklyGoal} 장
            </Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${weeklyPercent}%` as any }]} />
          </View>
        </View>
      </View>

      {/* 통계 카드 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>독서 통계</Text>
        <View style={styles.statsGrid}>
          <View style={[styles.statItem, { backgroundColor: '#EFF6FF' }]}>
            <Ionicons name="book-outline" size={20} color="#2563EB" />
            <Text style={styles.statLabel}>총 읽은 장</Text>
            <Text style={[styles.statValue, { color: '#2563EB' }]}>{stats.totalChaptersRead}</Text>
          </View>
          <View style={[styles.statItem, { backgroundColor: '#FAF5FF' }]}>
            <Ionicons name="people-outline" size={20} color="#9333EA" />
            <Text style={styles.statLabel}>참여 그룹</Text>
            <Text style={[styles.statValue, { color: '#9333EA' }]}>{stats.groupsJoined}</Text>
          </View>
          <View style={[styles.statItem, { backgroundColor: '#FEFCE8' }]}>
            <Ionicons name="document-text-outline" size={20} color="#CA8A04" />
            <Text style={styles.statLabel}>작성 메모</Text>
            <Text style={[styles.statValue, { color: '#CA8A04' }]}>{stats.notesCreated}</Text>
          </View>
          <View style={[styles.statItem, { backgroundColor: '#F0FDF4' }]}>
            <Ionicons name="color-wand-outline" size={20} color="#16A34A" />
            <Text style={styles.statLabel}>하이라이트</Text>
            <Text style={[styles.statValue, { color: '#16A34A' }]}>{stats.highlightedVerses}</Text>
          </View>
        </View>
      </View>

      {/* 업적 */}
      <View style={styles.card}>
        <View style={styles.achievementHeader}>
          <Ionicons name="trophy-outline" size={18} color="#EA580C" />
          <Text style={styles.cardTitle}>업적</Text>
        </View>
        <View style={styles.achievementGrid}>
          {achievements.map((achievement) => (
            <View
              key={achievement.id}
              style={[
                styles.achievementItem,
                achievement.earned ? styles.achievementItemEarned : styles.achievementItemUnearned,
              ]}
            >
              <View
                style={[
                  styles.achievementIcon,
                  { backgroundColor: achievement.color },
                  !achievement.earned && styles.achievementIconUnearned,
                ]}
              >
                <Ionicons name={achievement.icon} size={22} color="#fff" />
              </View>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 최근 독서 기록 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>최근 독서 기록</Text>
        {readingHistory.map((record, index) => {
          const date = new Date(record.date);
          return (
            <View
              key={index}
              style={[styles.historyRow, index < readingHistory.length - 1 && styles.historyRowBorder]}
            >
              <View style={styles.historyDate}>
                <Text style={styles.historyMonth}>{date.getMonth() + 1}월</Text>
                <Text style={styles.historyDay}>{date.getDate()}</Text>
              </View>
              <View style={styles.historyContent}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{record.chapters}개 장</Text>
                </View>
                {record.books.map((book, bookIndex) => (
                  <Text key={bookIndex} style={styles.historyBook}>
                    • {book}
                  </Text>
                ))}
              </View>
            </View>
          );
        })}
      </View>
      <View style={{ height: 20 }} />
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
    gap: 8,
    marginBottom: 16,
  },
  backBtn: {
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E9D5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 32,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  userSub: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  statBadges: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 12,
    color: '#374151',
  },
  weeklyGoal: {
    backgroundColor: '#FAF5FF',
    borderRadius: 10,
    padding: 12,
  },
  weeklyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weeklyTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  weeklyTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  weeklyCount: {
    fontSize: 13,
    color: '#9333EA',
  },
  progressBarBg: {
    height: 10,
    backgroundColor: '#E9D5FF',
    borderRadius: 5,
  },
  progressBarFill: {
    height: 10,
    backgroundColor: '#9333EA',
    borderRadius: 5,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    borderRadius: 10,
    padding: 12,
    gap: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  achievementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  achievementItem: {
    flex: 1,
    minWidth: '45%',
    borderRadius: 10,
    padding: 12,
    borderWidth: 2,
    gap: 8,
  },
  achievementItemEarned: {
    borderColor: '#FCA5A5',
    backgroundColor: '#FFF7ED',
  },
  achievementItemUnearned: {
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    opacity: 0.6,
  },
  achievementIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementIconUnearned: {
    opacity: 0.4,
  },
  achievementTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#111827',
  },
  historyRow: {
    flexDirection: 'row',
    gap: 16,
    paddingVertical: 12,
  },
  historyRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  historyDate: {
    alignItems: 'center',
    minWidth: 32,
  },
  historyMonth: {
    fontSize: 12,
    color: '#6B7280',
  },
  historyDay: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  historyContent: {
    flex: 1,
    gap: 4,
  },
  historyBook: {
    fontSize: 13,
    color: '#6B7280',
  },
});
