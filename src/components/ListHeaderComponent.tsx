import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {margins, colors} from '../theme/Default';

/**
 * React Flatlist ListHeaderComponent
 * @returns React.ReactElement
 */
export default function ListHeaderComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FLAGS</Text>
      <Text style={styles.text}>Browse the amazing world of flags</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: margins.medium,
    marginVertical: margins.medium * 2,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: colors.primary,
  },
  text: {
    fontSize: 20,
    maxWidth: '70%',
    color: colors.darkGray,
  },
});
