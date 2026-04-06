import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ReadingTask {
  id: string;
  book: string;
  chapter: number;
  day: number;
  completed: boolean;
}

interface GroupPlan {
  id: string;
  name: string;
  members: number;
  color: string;
  tasks: ReadingTask[];
}

const sampleGroupPlans: GroupPlan[] = [
  {
    id: '1',
    name: '새벽기도 성경읽기',
    members: 12,
    color: '#3B82F6',
    tasks: [
      { id: '1-1', book: '창세기', chapter: 1, day: 1, completed: true },
      { id: '1-2', book: '창세기', chapter: 2, day: 2, completed: true },
      { id: '1-3', book: '창세기', chapter: 3, day: 3, completed: false },
      { id: '1-4', book: '창세기', chapter: 4, day: 4, completed: false },
      { id: '1-5', book: '창세기', chapter: 5, day: 5, completed: false },
    ],
  },
  {
    id: '2',
    name: '청년 성경통독',
    members: 24,
    color: '#9333EA',
    tasks: [
      { id: '2-1', book: '요한복음', chapter: 1, day: 1, completed: true },
      { id: '2-2', book: '요한복음', chapter: 2, day: 2, completed: true },
      { id: '2-3', book: '요한복음', chapter: 3, day: 3, completed: true },
      { id: '2-4', book: '요한복음', chapter: 4, day: 4, completed: false },
      { id: '2-5', book: '요한복음', chapter: 5, day: 5, completed: false },
      { id: '2-6', book: '요한복음', chapter: 6, day: 6, completed: false },
    ],
  },
  {
    id: '3',
    name: '직장인 점심 QT',
    members: 15,
    color: '#16A34A',
    tasks: [
      { id: '3-1', book: '시편', chapter: 1, day: 1, completed: true },
      { id: '3-2', book: '시편', chapter: 23, day: 2, completed: false },
      { id: '3-3', book: '시편', chapter: 91, day: 3, completed: false },
      { id: '3-4', book: '시편', chapter: 100, day: 4, completed: false },
    ],
  },
];

export function ReadingPlan() {
  const [groupPlans, setGroupPlans] = useState<GroupPlan[]>(sampleGroupPlans);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['1']));

  const toggleTask = (groupId: string, taskId: string) => {
    setGroupPlans((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              tasks: group.tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
            }
          : group
      )
    );
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      newSet.has(groupId) ? newSet.delete(groupId) : newSet.add(groupId);
      return newSet;
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.pageHeader}>
        <Ionicons name="calendar-outline" size={22} color="#16A34A" />
        <Text style={styles.pageTitle}>독서 계획</Text>
      </View>

      {groupPlans.map((group) => {
        const completedCount = group.tasks.filter((t) => t.completed).length;
        const progress = (completedCount / group.tasks.length) * 100;
        const isExpanded = expandedGroups.has(group.id);

        return (
          <View key={group.id} style={styles.card}>
            {/* 그룹 헤더 */}
            <TouchableOpacity style={styles.groupHeader} onPress={() => toggleGroup(group.id)}>
              <View style={[styles.groupIcon, { backgroundColor: group.color }]}>
                <Ionicons name="people" size={18} color="#fff" />
              </View>
              <View style={styles.groupInfo}>
                <Text style={styles.groupName}>{group.name}</Text>
                <View style={styles.groupMeta}>
                  <View style={styles.memberBadge}>
                    <Text style={styles.memberBadgeText}>{group.members}명</Text>
                  </View>
                  <Text style={styles.progressLabel}>
                    {completedCount} / {group.tasks.length} 완료
                  </Text>
                </View>
              </View>
              <Text style={[styles.progressPct, { color: '#9333EA' }]}>
                {Math.round(progress)}%
              </Text>
            </TouchableOpacity>

            {/* 프로그레스 바 */}
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
            </View>

            {/* 태스크 목록 */}
            {isExpanded && (
              <View style={styles.taskList}>
                {group.tasks.map((task) => (
                  <TouchableOpacity
                    key={task.id}
                    style={styles.taskRow}
                    onPress={() => toggleTask(group.id, task.id)}
                  >
                    <View style={[styles.checkbox, task.completed && styles.checkboxDone]}>
                      {task.completed && <Ionicons name="checkmark" size={12} color="#fff" />}
                    </View>
                    <Text style={[styles.taskLabel, task.completed && styles.taskLabelDone]}>
                      <Text style={styles.taskDay}>Day {task.day}</Text>
                      {'  '}
                      {task.book} {task.chapter}장
                    </Text>
                    {task.completed ? (
                      <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
                    ) : (
                      <Ionicons name="ellipse-outline" size={18} color="#D1D5DB" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  pageHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  pageTitle: { fontSize: 18, fontWeight: '700' },
  card: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', marginBottom: 12 },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupInfo: { flex: 1 },
  groupName: { fontWeight: '600', fontSize: 15, marginBottom: 4 },
  groupMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  memberBadge: { backgroundColor: '#F3F4F6', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  memberBadgeText: { fontSize: 11, color: '#374151' },
  progressLabel: { fontSize: 13, color: '#6B7280' },
  progressPct: { fontSize: 18, fontWeight: '700' },
  progressBarBg: { height: 6, backgroundColor: '#F3F4F6', marginHorizontal: 16, borderRadius: 3, marginBottom: 4 },
  progressBarFill: { height: 6, backgroundColor: '#9333EA', borderRadius: 3 },
  taskList: { borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingHorizontal: 16, paddingVertical: 12, gap: 4 },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: { backgroundColor: '#9333EA', borderColor: '#9333EA' },
  taskLabel: { flex: 1, fontSize: 14, color: '#111827' },
  taskLabelDone: { textDecorationLine: 'line-through', color: '#9CA3AF' },
  taskDay: { color: '#6B7280', fontSize: 13 },
});
