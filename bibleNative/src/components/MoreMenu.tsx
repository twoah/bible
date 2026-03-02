import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Card } from './ui/Card';

interface MoreMenuProps {
  onNavigateToNotes: () => void;
  onNavigateToProfile?: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  description: string;
  onPress?: () => void;
}

export function MoreMenu({ onNavigateToNotes, onNavigateToProfile }: MoreMenuProps) {
  const menuItems: MenuItem[] = [
    { id: 'notes', label: '나의 메모', icon: '📝', description: '저장된 메모와 묵상 보기', onPress: onNavigateToNotes },
    { id: 'profile', label: '프로필', icon: '👤', description: '내 정보 및 독서 통계', onPress: onNavigateToProfile },
    { id: 'notifications', label: '알림', icon: '🔔', description: '그룹 알림 및 독서 리마인더' },
    { id: 'settings', label: '설정', icon: '⚙️', description: '앱 설정 및 환경설정' },
    { id: 'share', label: '공유하기', icon: '📤', description: '친구 초대 및 앱 공유' },
    { id: 'help', label: '도움말', icon: '❓', description: '사용 가이드 및 문의' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Card>
        {/* 프로필 헤더 */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>
          <View>
            <Text style={styles.userName}>사용자님</Text>
            <Text style={styles.userSub}>함께 읽는 성경</Text>
          </View>
        </View>

        {/* 메뉴 아이템 */}
        <View style={styles.menuList}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={item.onPress}
              disabled={!item.onPress}
              activeOpacity={0.7}
              style={[styles.menuItem, !item.onPress && styles.menuItemDisabled]}
            >
              <View style={styles.menuIconWrapper}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuDesc}>{item.description}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      <View style={styles.footer}>
        <Text style={styles.footerText}>버전 1.0.0</Text>
        <Text style={styles.footerText}>© 2025 함께 읽는 성경</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#9333ea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: {
    fontSize: 28,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#030213',
  },
  userSub: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  menuList: {
    gap: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 10,
  },
  menuItemDisabled: {
    opacity: 0.5,
  },
  menuIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f3ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: 18,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1e293b',
  },
  menuDesc: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 1,
  },
  menuArrow: {
    fontSize: 20,
    color: '#cbd5e1',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: '#94a3b8',
  },
});
