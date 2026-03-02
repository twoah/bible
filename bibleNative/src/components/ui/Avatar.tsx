import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface AvatarProps {
  initial: string;
  backgroundColor?: string;
  size?: number;
  style?: ViewStyle;
}

export function Avatar({ initial, backgroundColor = '#9333ea', size = 40, style }: AvatarProps) {
  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, borderRadius: size / 2, backgroundColor },
        style,
      ]}
    >
      <Text style={[styles.text, { fontSize: size * 0.4 }]}>{initial}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
