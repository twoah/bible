import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Card } from './ui/Card';
import { Progress } from './ui/Progress';
import { Checkbox } from './ui/Checkbox';
import { Badge } from './ui/Badge';

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
    color: '#3b82f6',
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
    color: '#9333ea',
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
    color: '#22c55e',
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
      const next = new Set(prev);
      next.has(groupId) ? next.delete(groupId) : next.add(groupId);
      return next;
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.titleRow}>
        <Text style={styles.titleIcon}>📅</Text>
        <Text style={styles.title}>독서 계획</Text>
      </View>

      {groupPlans.map((group) => {
        const completedCount = group.tasks.filter((t) => t.completed).length;
        const progressPct = (completedCount / group.tasks.length) * 100;
        const isExpanded = expandedGroups.has(group.id);

        return (
          <Card key={group.id} style={styles.groupCard}>
            {/* 그룹 헤더 */}
            <TouchableOpacity onPress={() => toggleGroup(group.id)} activeOpacity={0.7}>
              <View style={styles.groupHeader}>
                <View style={[styles.groupIcon, { backgroundColor: group.color }]}>
                  <Text style={styles.groupIconText}>👥</Text>
                </View>
                <View style={styles.groupInfo}>
                  <Text style={styles.groupName}>{group.name}</Text>
                  <View style={styles.groupMeta}>
                    <Badge variant="secondary">{group.members}명</Badge>
                    <Text style={styles.groupProgress}>
                      {completedCount} / {group.tasks.length} 완료
                    </Text>
                  </View>
                </View>
                <Text style={styles.pctText}>{Math.round(progressPct)}%</Text>
              </View>
              <Progress value={progressPct} height={6} style={styles.progressBar} />
            </TouchableOpacity>

            {/* 태스크 목록 */}
            {isExpanded && (
              <View style={styles.taskList}>
                {group.tasks.map((task) => (
                  <View key={task.id} style={styles.taskRow}>
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(group.id, task.id)}
                    />
                    <View style={styles.taskLabel}>
                      <Text style={styles.dayText}>Day {task.day}</Text>
                      <Text style={styles.dot}> • </Text>
                      <Text style={[styles.taskText, task.completed && styles.taskDone]}>
                        {task.book} {task.chapter}장
                      </Text>
                    </View>
                    <Text style={task.completed ? styles.checkIcon : styles.circleIcon}>
                      {task.completed ? '✓' : '○'}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </Card>
        );
      })}
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
    marginBottom: 12,
    gap: 8,
  },
  titleIcon: {
    fontSize: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#030213',
  },
  groupCard: {
    marginBottom: 12,
    padding: 0,
    overflow: 'hidden',
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupIconText: {
    fontSize: 18,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#030213',
    marginBottom: 4,
  },
  groupMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  groupProgress: {
    fontSize: 12,
    color: '#64748b',
  },
  pctText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9333ea',
  },
  progressBar: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  taskList: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 4,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  taskLabel: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 13,
    color: '#94a3b8',
  },
  dot: {
    fontSize: 13,
    color: '#94a3b8',
  },
  taskText: {
    fontSize: 14,
    color: '#1e293b',
  },
  taskDone: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
  },
  checkIcon: {
    fontSize: 16,
    color: '#22c55e',
    fontWeight: '700',
  },
  circleIcon: {
    fontSize: 16,
    color: '#cbd5e1',
  },
});
