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
    { id: 1, title: '7일 연속 독서', icon: 'calendar' as const, color: '#3B82F6', earned: true },
    { id: 2, title: '첫 그룹 참여', icon: 'people' as const, color: '#9333EA', earned: true },
    { id: 3, title: '50개 장 완독', icon: 'book' as const, color: '#16A34A', earned: false },
    { id: 4, title: '10개 메모 작성', icon: 'document-text' as const, color: '#CA8A04', earned: true },
  ];

  const readingHistory = [
    { date: '2025-12-31', chapters: 2, books: ['창세기 3장', '요한복음 4장'] },
    { date: '2025-12-30', chapters: 1, books: ['시편 23장'] },
    { date: '2025-12-29', chapters: 3, books: ['창세기 1장', '창세기 2장', '요한복음 1장'] },
  ];

  const weeklyPct = Math.round((stats.weeklyProgress / stats.weeklyGoal) * 100);

  const statCards = [
    { label: '총 읽은 장', value: stats.totalChaptersRead, icon: 'book-outline' as const, color: '#3B82F6', bg: '#EFF6FF' },
    { label: '참여 그룹', value: stats.groupsJoined, icon: 'people-outline' as const, color: '#9333EA', bg: '#F5F3FF' },
    { label: '작성 메모', value: stats.notesCreated, icon: 'document-text-outline' as const, color: '#CA8A04', bg: '#FEFCE8' },
    { label: '하이라이트', value: stats.highlightedVerses, icon: 'color-wand-outline' as const, color: '#16A34A', bg: '#F0FDF4' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>프로필</Text>
      </View>

      {/* 프로필 카드 */}
      <View style={styles.card}>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>사용자님</Text>
            <Text style={styles.userSub}>함께 읽는 성경</Text>
            <View style={styles.badgeRow}>
              <View style={styles.badge}>
                <Ionicons name="calendar-outline" size={11} color="#374151" />
                <Text style={styles.badgeText}>{stats.consecutiveDays}일 연속</Text>
              </View>
              <View style={styles.badge}>
                <Ionicons name="book-outline" size={11} color="#374151" />
                <Text style={styles.badgeText}>{stats.totalChaptersRead}장 완독</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 주간 목표 */}
        <View style={styles.goalBox}>
          <View style={styles.goalHeader}>
            <Ionicons name="trending-up" size={18} color="#9333EA" />
            <Text style={styles.goalTitle}>주간 독서 목표</Text>
            <Text style={styles.goalProgress}>
              {stats.weeklyProgress} / {stats.weeklyGoal} 장
            </Text>
          </View>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${weeklyPct}%` }]} />
          </View>
        </View>
      </View>

      {/* 통계 */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>독서 통계</Text>
        <View style={styles.statsGrid}>
          {statCards.map((s) => (
            <View key={s.label} style={[styles.statCard, { backgroundColor: s.bg }]}>
              <View style={styles.statHeader}>
                <Ionicons name={s.icon} size={18} color={s.color} />
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
              <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 업적 */}
      <View style={styles.card}>
        <View style={styles.sectionRow}>
          <Ionicons name="trophy-outline" size={18} color="#EA580C" />
          <Text style={styles.sectionTitle}>업적</Text>
        </View>
        <View style={styles.achievementGrid}>
          {achievements.map((a) => (
            <View
              key={a.id}
              style={[
                styles.achievementCard,
                a.earned ? styles.achievementEarned : styles.achievementLocked,
              ]}
            >
              <View style={[styles.achievementIcon, { backgroundColor: a.color, opacity: a.earned ? 1 : 0.4 }]}>
                <Ionicons name={a.icon} size={22} color="#fff" />
              </View>
              <Text style={[styles.achievementTitle, !a.earned && styles.achievementTitleLocked]}>
                {a.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* 최근 독서 기록 */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>최근 독서 기록</Text>
        {readingHistory.map((record, idx) => {
          const d = new Date(record.date);
          return (
            <View key={idx} style={[styles.historyRow, idx < readingHistory.length - 1 && styles.historyBorder]}>
              <View style={styles.historyDate}>
                <Text style={styles.historyMonth}>{d.getMonth() + 1}월</Text>
                <Text style={styles.historyDay}>{d.getDate()}</Text>
              </View>
              <View style={styles.historyInfo}>
                <View style={styles.chapterBadge}>
                  <Text style={styles.chapterBadgeText}>{record.chapters}개 장</Text>
                </View>
                {record.books.map((b, bi) => (
                  <Text key={bi} style={styles.historyBook}>• {b}</Text>
                ))}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  backBtn: { padding: 8, borderRadius: 20, backgroundColor: '#F3F4F6' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, marginBottom: 12 },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E9D5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 36 },
  profileInfo: { flex: 1 },
  userName: { fontSize: 20, fontWeight: '700', color: '#111827' },
  userSub: { fontSize: 13, color: '#6B7280', marginTop: 2, marginBottom: 8 },
  badgeRow: { flexDirection: 'row', gap: 8 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#F3F4F6', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
  badgeText: { fontSize: 11, color: '#374151' },
  goalBox: { backgroundColor: '#F5F3FF', borderRadius: 10, padding: 14 },
  goalHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  goalTitle: { flex: 1, fontWeight: '600', color: '#111827' },
  goalProgress: { fontSize: 13, color: '#9333EA', fontWeight: '600' },
  progressBg: { height: 10, backgroundColor: '#DDD6FE', borderRadius: 5 },
  progressFill: { height: 10, backgroundColor: '#9333EA', borderRadius: 5 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 12 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statCard: { width: '47%', borderRadius: 10, padding: 14 },
  statHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  statLabel: { fontSize: 12, color: '#4B5563' },
  statValue: { fontSize: 26, fontWeight: '700' },
  achievementGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  achievementCard: { width: '47%', borderRadius: 10, borderWidth: 2, padding: 14 },
  achievementEarned: { borderColor: '#FED7AA', backgroundColor: '#FFF7ED' },
  achievementLocked: { borderColor: '#E5E7EB', backgroundColor: '#F9FAFB' },
  achievementIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  achievementTitle: { fontSize: 13, fontWeight: '500', color: '#111827' },
  achievementTitleLocked: { color: '#9CA3AF' },
  historyRow: { flexDirection: 'row', gap: 16, paddingVertical: 14 },
  historyBorder: { borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  historyDate: { alignItems: 'center', minWidth: 36 },
  historyMonth: { fontSize: 12, color: '#6B7280' },
  historyDay: { fontSize: 24, fontWeight: '700', color: '#111827' },
  historyInfo: { flex: 1 },
  chapterBadge: { backgroundColor: '#F3F4F6', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start', marginBottom: 6 },
  chapterBadgeText: { fontSize: 11, color: '#374151', fontWeight: '500' },
  historyBook: { fontSize: 13, color: '#4B5563', lineHeight: 20 },
});
