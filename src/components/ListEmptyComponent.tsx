import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/Default';

export default function ListEmptyComponent({error}: {error: Error | null}) {
  return (
    <View style={styles.fill}>
      {error ? (
        <Text style={styles.errorMessage}>{error.message}</Text>
      ) : (
        <Text style={styles.errorMessage}>No data</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: colors.primary,
    fontSize: 18,
  },
});
