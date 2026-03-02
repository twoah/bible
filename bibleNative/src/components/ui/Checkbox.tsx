import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function Checkbox({ checked, onCheckedChange }: CheckboxProps) {
  return (
    <TouchableOpacity
      onPress={() => onCheckedChange(!checked)}
      activeOpacity={0.7}
      style={[styles.box, checked && styles.checked]}
    >
      {checked && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#9333ea',
    borderColor: '#9333ea',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 14,
  },
});
