import { useState } from 'react';
import { CalendarCheck, CheckCircle2, Circle, Users } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';

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
    color: 'bg-blue-500',
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
    color: 'bg-purple-500',
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
    color: 'bg-green-500',
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
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <CalendarCheck className="w-6 h-6 text-green-600" />
        <h2>독서 계획</h2>
      </div>

      {groupPlans.map((group) => {
        const completedCount = group.tasks.filter((task) => task.completed).length;
        const progressPercentage = (completedCount / group.tasks.length) * 100;
        const isExpanded = expandedGroups.has(group.id);

        return (
          <Card key={group.id} className="overflow-hidden">
            <div
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleGroup(group.id)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-full ${group.color} flex items-center justify-center text-white flex-shrink-0`}>
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{group.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {group.members}명
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {completedCount} / {group.tasks.length} 완료
                    </span>
                  </div>
                </div>
                <span className="text-lg font-medium text-purple-600">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            {isExpanded && (
              <div className="px-4 pb-4 space-y-2 border-t">
                <div className="pt-4 space-y-3">
                  {group.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        id={task.id}
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(group.id, task.id)}
                      />
                      <label
                        htmlFor={task.id}
                        className={`flex-1 cursor-pointer ${
                          task.completed ? 'line-through text-gray-400' : ''
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Day {task.day}</span>
                          <span>•</span>
                          <span>
                            {task.book} {task.chapter}장
                          </span>
                        </div>
                      </label>
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}