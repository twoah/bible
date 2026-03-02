import { useState } from 'react';
import { Users, MessageCircle, User, Search, Plus } from 'lucide-react';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

interface GroupMember {
  id: string;
  name: string;
  progress: number;
  currentReading: string;
  color: string;
}

const sampleMembers: GroupMember[] = [
  { id: '1', name: '김민수', progress: 75, currentReading: '창세기 2장', color: 'bg-blue-500' },
  { id: '2', name: '이지은', progress: 60, currentReading: '요한복음 1장', color: 'bg-purple-500' },
  { id: '3', name: '박준영', progress: 85, currentReading: '시편 23장', color: 'bg-green-500' },
  { id: '4', name: '최서연', progress: 50, currentReading: '창세기 1장', color: 'bg-pink-500' },
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
  {
    id: '1',
    name: '새벽기도 성경읽기',
    description: '매일 새벽 6시 함께 성경을 읽고 묵상을 나눕니다.',
    members: 12,
    category: '새벽기도',
  },
  {
    id: '2',
    name: '청년 성경통독',
    description: '1년 1독 계획으로 청년들이 함께 읽습니다.',
    members: 24,
    category: '청년',
  },
  {
    id: '3',
    name: '주부 말씀나눔',
    description: '오전 시간을 활용한 주부들의 성경 읽기 모임',
    members: 8,
    category: '주부',
  },
  {
    id: '4',
    name: '직장인 점심 QT',
    description: '점심시간에 간단히 말씀을 읽고 나눕니다.',
    members: 15,
    category: '직장인',
  },
];

export function GroupReading() {
  const [mainTab, setMainTab] = useState<'my-groups' | 'find-groups'>('my-groups');
  const [activeTab, setActiveTab] = useState<'members' | 'comments'>('members');

  return (
    <div className="space-y-4">
      {/* Main Tab Selector */}
      <div className="flex gap-2">
        <button
          className={`flex-1 py-3 px-4 rounded-lg transition-colors font-medium ${
            mainTab === 'my-groups'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
          onClick={() => setMainTab('my-groups')}
        >
          내 그룹
        </button>
        <button
          className={`flex-1 py-3 px-4 rounded-lg transition-colors font-medium ${
            mainTab === 'find-groups'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
          onClick={() => setMainTab('find-groups')}
        >
          그룹 찾기
        </button>
      </div>

      {/* My Groups Content */}
      {mainTab === 'my-groups' && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-purple-600" />
            <h2>함께 읽기</h2>
            <Badge variant="secondary" className="ml-auto">
              {sampleMembers.length}명 참여중
            </Badge>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                activeTab === 'members'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('members')}
            >
              멤버
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                activeTab === 'comments'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('comments')}
            >
              나눔
            </button>
          </div>

          {activeTab === 'members' ? (
            <div className="space-y-4">
              {sampleMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <Avatar>
                    <AvatarFallback className={member.color}>
                      {member.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{member.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {member.progress}%
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{member.currentReading}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sampleComments.map((comment) => (
                <div key={comment.id} className="p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{comment.author}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-400">{comment.timestamp}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs mb-2">
                    {comment.reference}
                  </Badge>
                  <p className="text-sm">{comment.text}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Find Groups Content */}
      {mainTab === 'find-groups' && (
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="그룹 검색..."
                className="flex-1 outline-none bg-transparent"
              />
            </div>
          </Card>

          <div className="space-y-3">
            {sampleGroups.map((group) => (
              <Card key={group.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{group.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="text-xs">
                        {group.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{group.members}명</span>
                      </div>
                    </div>
                  </div>
                  <button className="ml-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    가입
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}