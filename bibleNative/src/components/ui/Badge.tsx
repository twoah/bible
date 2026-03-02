import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline';
  style?: ViewStyle;
}

export function Badge({ children, variant = 'default', style }: BadgeProps) {
  return (
    <View style={[styles.base, styles[variant], style]}>
      <Text style={[styles.text, variant === 'default' ? styles.defaultText : styles.secondaryText]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  default: {
    backgroundColor: '#030213',
  },
  secondary: {
    backgroundColor: '#f1f0f8',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  text: {
    fontSize: 11,
    fontWeight: '500',
  },
  defaultText: {
    color: '#ffffff',
  },
  secondaryText: {
    color: '#3f3f6a',
  },
});
