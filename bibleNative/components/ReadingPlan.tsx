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
                task.id === taskId ? { ...task, completed: !task.completed } : task,
              ),
            }
          : group,
      ),
    );
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.titleRow}>
        <Ionicons name="calendar-outline" size={22} color="#16A34A" />
        <Text style={styles.title}>독서 계획</Text>
      </View>

      {groupPlans.map((group) => {
        const completedCount = group.tasks.filter((task) => task.completed).length;
        const progressPercentage = (completedCount / group.tasks.length) * 100;
        const isExpanded = expandedGroups.has(group.id);

        return (
          <View key={group.id} style={styles.card}>
            <TouchableOpacity
              style={styles.cardHeader}
              onPress={() => toggleGroup(group.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.groupIcon, { backgroundColor: group.color }]}>
                <Ionicons name="people-outline" size={18} color="#fff" />
              </View>
              <View style={styles.groupInfo}>
                <Text style={styles.groupName}>{group.name}</Text>
                <View style={styles.groupMeta}>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{group.members}명</Text>
                  </View>
                  <Text style={styles.progressText}>
                    {completedCount} / {group.tasks.length} 완료
                  </Text>
                </View>
              </View>
              <Text style={styles.progressPercent}>{Math.round(progressPercentage)}%</Text>
            </TouchableOpacity>

            {/* Progress bar */}
            <View style={styles.progressBarBg}>
              <View
                style={[styles.progressBarFill, { width: `${progressPercentage}%` as any, backgroundColor: group.color }]}
              />
            </View>

            {isExpanded && (
              <View style={styles.taskList}>
                {group.tasks.map((task) => (
                  <TouchableOpacity
                    key={task.id}
                    style={styles.taskRow}
                    onPress={() => toggleTask(group.id, task.id)}
                    activeOpacity={0.7}
                  >
                    <TouchableOpacity
                      style={[styles.checkbox, task.completed && styles.checkboxChecked]}
                      onPress={() => toggleTask(group.id, task.id)}
                    >
                      {task.completed && (
                        <Ionicons name="checkmark" size={12} color="#fff" />
                      )}
                    </TouchableOpacity>
                    <View style={styles.taskInfo}>
                      <Text style={[styles.taskText, task.completed && styles.taskTextCompleted]}>
                        <Text style={styles.dayText}>Day {task.day}</Text>
                        {'  •  '}
                        {task.book} {task.chapter}장
                      </Text>
                    </View>
                    {task.completed ? (
                      <Ionicons name="checkmark-circle" size={20} color="#16A34A" />
                    ) : (
                      <Ionicons name="ellipse-outline" size={20} color="#D1D5DB" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        );
      })}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  cardHeader: {
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
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
  },
  groupMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  badge: {
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 12,
    color: '#374151',
  },
  progressText: {
    fontSize: 13,
    color: '#6B7280',
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: '500',
    color: '#9333EA',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
    marginBottom: 4,
    borderRadius: 3,
  },
  progressBarFill: {
    height: 6,
    borderRadius: 3,
  },
  taskList: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 4,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#9333EA',
    borderColor: '#9333EA',
  },
  taskInfo: {
    flex: 1,
  },
  taskText: {
    fontSize: 14,
    color: '#111827',
  },
  taskTextCompleted: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  dayText: {
    color: '#6B7280',
    fontSize: 13,
  },
});
