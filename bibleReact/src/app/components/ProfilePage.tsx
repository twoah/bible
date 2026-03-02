import { ArrowLeft, BookOpen, Calendar, Users, StickyNote, Highlighter, Award, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface ProfilePageProps {
  onBack: () => void;
}

export function ProfilePage({ onBack }: ProfilePageProps) {
  // 샘플 통계 데이터
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
    { id: 1, title: '7일 연속 독서', icon: Calendar, color: 'bg-blue-500', earned: true },
    { id: 2, title: '첫 그룹 참여', icon: Users, color: 'bg-purple-500', earned: true },
    { id: 3, title: '50개 장 완독', icon: BookOpen, color: 'bg-green-500', earned: false },
    { id: 4, title: '10개 메모 작성', icon: StickyNote, color: 'bg-yellow-500', earned: true },
  ];

  const readingHistory = [
    { date: '2025-12-31', chapters: 2, books: ['창세기 3장', '요한복음 4장'] },
    { date: '2025-12-30', chapters: 1, books: ['시편 23장'] },
    { date: '2025-12-29', chapters: 3, books: ['창세기 1장', '창세기 2장', '요한복음 1장'] },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2>프로필</h2>
      </div>

      {/* 프로필 카드 */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
            <span className="text-2xl">👤</span>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold">사용자님</h3>
            <p className="text-sm text-gray-500">함께 읽는 성경</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">
                <Calendar className="w-3 h-3 mr-1" />
                {stats.consecutiveDays}일 연속
              </Badge>
              <Badge variant="secondary">
                <BookOpen className="w-3 h-3 mr-1" />
                {stats.totalChaptersRead}장 완독
              </Badge>
            </div>
          </div>
        </div>

        {/* 주간 목표 */}
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span className="font-medium">주간 독서 목표</span>
            </div>
            <span className="text-sm text-purple-600">
              {stats.weeklyProgress} / {stats.weeklyGoal} 장
            </span>
          </div>
          <Progress value={(stats.weeklyProgress / stats.weeklyGoal) * 100} className="h-3" />
        </div>
      </Card>

      {/* 통계 카드 */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">독서 통계</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">총 읽은 장</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{stats.totalChaptersRead}</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-gray-600">참여 그룹</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">{stats.groupsJoined}</p>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <StickyNote className="w-5 h-5 text-yellow-600" />
              <span className="text-sm text-gray-600">작성 메모</span>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{stats.notesCreated}</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Highlighter className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">하이라이트</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{stats.highlightedVerses}</p>
          </div>
        </div>
      </Card>

      {/* 업적 */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-orange-600" />
          <h3 className="font-semibold">업적</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.earned
                    ? 'border-orange-300 bg-orange-50'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full ${achievement.color} flex items-center justify-center mb-2 ${
                    !achievement.earned ? 'grayscale' : ''
                  }`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium">{achievement.title}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 최근 독서 기록 */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">최근 독서 기록</h3>
        <div className="space-y-4">
          {readingHistory.map((record, index) => (
            <div key={index} className="flex gap-4 pb-4 border-b last:border-b-0">
              <div className="flex-shrink-0 text-center">
                <div className="text-sm text-gray-500">{new Date(record.date).getMonth() + 1}월</div>
                <div className="text-2xl font-bold">{new Date(record.date).getDate()}</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary">{record.chapters}개 장</Badge>
                </div>
                <div className="space-y-1">
                  {record.books.map((book, bookIndex) => (
                    <p key={bookIndex} className="text-sm text-gray-600">
                      • {book}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
