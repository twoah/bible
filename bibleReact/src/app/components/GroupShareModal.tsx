import { useState } from 'react';
import { Users, Check, X } from 'lucide-react';
import { myGroups } from '@/data/groupsData';

interface GroupShareModalProps {
  verseCount: number;
  onClose: () => void;
}

export function GroupShareModal({ verseCount, onClose }: GroupShareModalProps) {
  const [shared, setShared] = useState<string | null>(null);

  const handleShare = (groupId: string, groupName: string) => {
    setShared(groupName);
    setTimeout(onClose, 1200);
  };

  return (
    <>
      {/* 배경 딤처리 */}
      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={onClose}
      />

      {/* 바텀 시트 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl">
        <div className="max-w-4xl mx-auto px-4 pt-4 pb-8">
          {/* 핸들 */}
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />

          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900">그룹에 공유</h3>
              <p className="text-sm text-gray-500 mt-0.5">{verseCount}개 구절을 공유합니다</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-2">
            {myGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => handleShare(group.id, group.name)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{group.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">멤버 {group.members}명</p>
                </div>
                {shared === group.name ? (
                  <div className="flex items-center gap-1 text-purple-600 text-sm font-medium">
                    <Check className="w-4 h-4" />
                    공유됨
                  </div>
                ) : (
                  <span className="text-xs text-purple-600 font-medium px-3 py-1.5 bg-purple-50 rounded-lg border border-purple-100">
                    공유
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
