import { StickyNote, User, Settings, Bell, HelpCircle, Share2 } from 'lucide-react';
import { Card } from './ui/card';

interface MoreMenuProps {
  onNavigateToNotes: () => void;
  onNavigateToProfile?: () => void;
}

export function MoreMenu({ onNavigateToNotes, onNavigateToProfile }: MoreMenuProps) {
  const menuItems = [
    {
      id: 'notes',
      label: '나의 메모',
      icon: StickyNote,
      description: '저장된 메모와 묵상 보기',
      onClick: onNavigateToNotes,
    },
    {
      id: 'profile',
      label: '프로필',
      icon: User,
      description: '내 정보 및 독서 통계',
      onClick: onNavigateToProfile,
    },
    {
      id: 'notifications',
      label: '알림',
      icon: Bell,
      description: '그룹 알림 및 독서 리마인더',
    },
    {
      id: 'settings',
      label: '설정',
      icon: Settings,
      description: '앱 설정 및 환경설정',
    },
    {
      id: 'share',
      label: '공유하기',
      icon: Share2,
      description: '친구 초대 및 앱 공유',
    },
    {
      id: 'help',
      label: '도움말',
      icon: HelpCircle,
      description: '사용 가이드 및 문의',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2>사용자님</h2>
            <p className="text-sm text-gray-500">함께 읽는 성경</p>
          </div>
        </div>

        <div className="grid gap-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.onClick ? () => item.onClick!() : undefined}
                disabled={!item.onClick}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      <div className="text-center text-sm text-gray-500 p-4">
        <p>버전 1.0.0</p>
        <p className="mt-1">© 2025 함께 읽는 성경</p>
      </div>
    </div>
  );
}