import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

interface SelectItem {
  label: string;
  value: string;
}

interface SelectProps {
  items: SelectItem[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export function Select({ items, value, onValueChange, placeholder = '선택' }: SelectProps) {
  const [visible, setVisible] = useState(false);
  const selectedLabel = items.find((i) => i.value === value)?.label ?? placeholder;

  return (
    <>
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.triggerText}>{selectedLabel}</Text>
        <Text style={styles.arrow}>▾</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setVisible(false)}>
          <View style={styles.dropdown}>
            <ScrollView>
              {items.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={[styles.item, item.value === value && styles.selectedItem]}
                  onPress={() => {
                    onValueChange(item.value);
                    setVisible(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.itemText, item.value === value && styles.selectedItemText]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    minWidth: 160,
  },
  triggerText: {
    fontSize: 14,
    color: '#030213',
    flex: 1,
  },
  arrow: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 8,
    width: 220,
    maxHeight: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  selectedItem: {
    backgroundColor: '#f5f3ff',
  },
  itemText: {
    fontSize: 14,
    color: '#030213',
  },
  selectedItemText: {
    color: '#9333ea',
    fontWeight: '600',
  },
});
