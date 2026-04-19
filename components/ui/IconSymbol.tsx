// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle, View } from 'react-native';

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  // Navigation & General
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
  'magnifyingglass': 'search',

  // School & Hymnal Specific (Added for UI consistency)
  'graduationcap.fill': 'school',
  'book.fill': 'menu-book',
  'music.note': 'music-note',
  'cross.fill': 'add', 
  'person.fill': 'person',
  'bell.fill': 'notifications',
  'gearshape.fill': 'settings',
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof MaterialIcons>['name']
  >
>;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web.
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <View style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}>
      <MaterialIcons 
        color={color} 
        size={size} 
        name={MAPPING[name]} 
        style={style} 
      />
    </View>
  );
}
