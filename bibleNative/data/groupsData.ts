export interface GroupMember {
  id: string;
  name: string;
  progress: number;
  currentReading: string;
  color: string;
}

export interface GroupComment {
  id: string;
  author: string;
  authorColor: string;
  text: string;
  reference: string;
  timestamp: string;
}

export interface GroupInfo {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
}

export const sampleMembers: GroupMember[] = [
  { id: '1', name: '김민수', progress: 75, currentReading: '창세기 2장', color: '#3B82F6' },
  { id: '2', name: '이지은', progress: 60, currentReading: '요한복음 1장', color: '#9333EA' },
  { id: '3', name: '박준영', progress: 85, currentReading: '시편 23장', color: '#16A34A' },
  { id: '4', name: '최서연', progress: 50, currentReading: '창세기 1장', color: '#EC4899' },
];

export const sampleComments: GroupComment[] = [
  {
    id: '1',
    author: '김민수',
    authorColor: '#3B82F6',
    text: '이 구절이 정말 은혜롭네요. 하나님의 창조 섭리가 느껴집니다.',
    reference: '창세기 1:3',
    timestamp: '2시간 전',
  },
  {
    id: '2',
    author: '이지은',
    authorColor: '#9333EA',
    text: '말씀이 곧 하나님이시라는 부분에서 깊이 묵상하게 됩니다.',
    reference: '요한복음 1:1',
    timestamp: '5시간 전',
  },
  {
    id: '3',
    author: '박준영',
    authorColor: '#16A34A',
    text: '여호와는 나의 목자... 이 시편을 읽을 때마다 평안함을 느낍니다.',
    reference: '시편 23:1',
    timestamp: '1일 전',
  },
];

export const myGroups: GroupInfo[] = [
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
];

export const findGroups: GroupInfo[] = [
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
