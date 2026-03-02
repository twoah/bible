import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface ProgressProps {
  value: number; // 0–100
  style?: ViewStyle;
  height?: number;
}

export function Progress({ value, style, height = 8 }: ProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <View style={[styles.track, { height }, style]}>
      <View style={[styles.fill, { width: `${clampedValue}%` as any }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    backgroundColor: '#e2e8f0',
    borderRadius: 999,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    height: '100%',
    backgroundColor: '#9333ea',
    borderRadius: 999,
  },
});
