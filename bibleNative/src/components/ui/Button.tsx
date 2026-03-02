import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  children,
  onPress,
  variant = 'default',
  size = 'md',
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const isOutline = variant === 'outline';
  const isSm = size === 'sm';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.base,
        isSm ? styles.sm : styles.md,
        isOutline ? styles.outline : styles.default,
        disabled && styles.disabled,
        style,
      ]}
    >
      {typeof children === 'string' ? (
        <Text style={[styles.text, isOutline ? styles.outlineText : styles.defaultText, isSm && styles.smText, textStyle]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  md: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  default: {
    backgroundColor: '#030213',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  smText: {
    fontSize: 13,
  },
  defaultText: {
    color: '#ffffff',
  },
  outlineText: {
    color: '#030213',
  },
});
