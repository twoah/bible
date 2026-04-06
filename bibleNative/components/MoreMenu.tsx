import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MoreMenuProps {
  onNavigateToNotes: () => void;
  onNavigateToProfile?: () => void;
}

export function MoreMenu({ onNavigateToNotes, onNavigateToProfile }: MoreMenuProps) {
  const menuItems = [
    {
      id: 'notes',
      label: '나의 메모',
      icon: 'document-text-outline' as const,
      description: '저장된 메모와 묵상 보기',
      onPress: onNavigateToNotes,
    },
    {
      id: 'profile',
      label: '프로필',
      icon: 'person-outline' as const,
      description: '내 정보 및 독서 통계',
      onPress: onNavigateToProfile,
    },
    {
      id: 'notifications',
      label: '알림',
      icon: 'notifications-outline' as const,
      description: '그룹 알림 및 독서 리마인더',
      onPress: undefined,
    },
    {
      id: 'settings',
      label: '설정',
      icon: 'settings-outline' as const,
      description: '앱 설정 및 환경설정',
      onPress: undefined,
    },
    {
      id: 'share',
      label: '공유하기',
      icon: 'share-outline' as const,
      description: '친구 초대 및 앱 공유',
      onPress: undefined,
    },
    {
      id: 'help',
      label: '도움말',
      icon: 'help-circle-outline' as const,
      description: '사용 가이드 및 문의',
      onPress: undefined,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        {/* 프로필 헤더 */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={32} color="#fff" />
          </View>
          <View>
            <Text style={styles.userName}>사용자님</Text>
            <Text style={styles.userSub}>함께 읽는 성경</Text>
          </View>
        </View>

        {/* 메뉴 목록 */}
        <View style={styles.menuList}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuRow, !item.onPress && styles.menuRowDisabled]}
              onPress={item.onPress}
              disabled={!item.onPress}
              activeOpacity={item.onPress ? 0.7 : 1}
            >
              <View style={styles.menuIcon}>
                <Ionicons name={item.icon} size={20} color="#9333EA" />
              </View>
              <View style={styles.menuInfo}>
                <Text style={[styles.menuLabel, !item.onPress && styles.menuLabelDisabled]}>
                  {item.label}
                </Text>
                <Text style={styles.menuDesc}>{item.description}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={item.onPress ? '#9CA3AF' : '#D1D5DB'}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>버전 1.0.0</Text>
        <Text style={styles.footerText}>© 2025 함께 읽는 성경</Text>
      </View>
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#9333EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  userSub: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  menuList: {
    gap: 4,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 10,
  },
  menuRowDisabled: {
    opacity: 0.5,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuInfo: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
  },
  menuLabelDisabled: {
    color: '#6B7280',
  },
  menuDesc: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
    gap: 4,
  },
  footerText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
});
