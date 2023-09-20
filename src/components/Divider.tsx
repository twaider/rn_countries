import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../theme/Default';

/**
 * List divider
 * @returns React.ReactElement
 */
export default function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: colors.lightGray,
  },
});
