import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {type Country} from '../types';
import {colors, margins, textStyles} from '../theme/Default';

const caretRight = require('./../../assets/images/caret_right.png');

type Props = {
  item: Country;
  onPress: (item: any) => void;
};

/**
 * FlatList item component
 * @param {item, onPress}
 * @returns React.ReactElement
 */
export function ListItem({item, onPress}: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(item)}
      accessibilityRole="button">
      <View style={styles.inner}>
        <View style={styles.imgContainer}>
          <ImageBackground
            source={{uri: item.flags.png || ''}}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <View style={styles.item}>
          <View style={styles.top}>
            <Text style={textStyles.textBold}>{item.name.common}</Text>
          </View>
          <Text style={styles.bottom}>{item.continents?.join('')}</Text>
        </View>

        <View style={styles.caretContainer}>
          <ImageBackground
            source={caretRight}
            resizeMode="cover"
            style={styles.caret}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: margins.large,
    minHeight: 90,
  },
  item: {
    paddingRight: margins.medium,
    paddingLeft: margins.large,
    justifyContent: 'center',
  },
  top: {
    marginBottom: margins.small,
  },
  bottom: {
    color: colors.darkGray,
  },
  imgContainer: {
    height: 48,
    width: 48,
    borderWidth: 2,
    borderColor: colors.lightGray,
    padding: 2,
    borderRadius: 48,
  },
  image: {
    height: 40,
    aspectRatio: 1,
    borderRadius: 40,
    overflow: 'hidden',
  },
  caretContainer: {
    height: 12,
    width: 6,
    position: 'absolute',
    right: margins.large,
  },
  caret: {
    height: 12,
    width: 6,
  },
});
