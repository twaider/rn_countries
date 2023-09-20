import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors, margins, textStyles} from '../theme/Default';
import {Country} from '../types';

type ParamList = {
  CountryProp: {
    country: Country;
  };
};

/**
 * Countries details screen
 * @returns React.ReactElement
 */
export default function CountriesDetailsScreen() {
  const route = useRoute<RouteProp<ParamList, 'CountryProp'>>();
  const {country} = route.params;

  // function that opens apple maps or android maps
  const openMapForCountry = () => {
    const {latlng} = country;

    if (latlng?.length === 2) {
      // maps scheme for ios or android
      const scheme = Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q=',
      });
      const coordinatesString = `${latlng[0]},${latlng[1]}`;

      const url = Platform.select({
        ios: `${scheme}${country?.name.common}@${coordinatesString}`,
        android: `${scheme}${coordinatesString}(${country?.name.common})`,
      });

      if (url) {
        Linking.openURL(url);
      }
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}>
      <View style={styles.headerContainer}>
        <ImageBackground
          resizeMode="cover"
          source={{uri: country?.flags?.png}}
          style={styles.imgBg}
        />
      </View>
      <View style={styles.inner}>
        <View style={styles.right}>
          <Text style={textStyles.text}>Country name:</Text>
          <Text style={[textStyles.textBold, styles.value]}>
            {country?.name?.common ?? 'Missing country name'}
          </Text>

          <Text style={textStyles.text}>Region:</Text>
          <Text style={[textStyles.textBold, styles.value]}>
            {country?.region ?? 'Missing region'}
          </Text>

          <Text style={textStyles.text}>Population:</Text>
          <Text style={[textStyles.textBold, styles.value]}>
            {country?.population ?? 'Missing population'}
          </Text>

          <Text style={textStyles.text}>Capital:</Text>
          <Text style={[textStyles.textBold, styles.value]}>
            {country?.capital?.join(' ') ?? 'Missing capital'}
          </Text>

          <Text style={textStyles.text}>Languages:</Text>
          <Text style={[textStyles.textBold, styles.value]}>
            {Object.values(country?.languages)?.join(' ') ?? 'Missing capital'}
          </Text>

          <Pressable
            style={styles.button}
            onPress={openMapForCountry}
            accessibilityLabel="Open in maps">
            <Text style={styles.buttonText}>View on map</Text>
          </Pressable>
        </View>

        <View style={styles.imgContainer}>
          <ImageBackground
            resizeMode="cover"
            source={{uri: country?.flags?.png}}
            style={styles.image}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const {width} = Dimensions.get('window');
const imgSize = width / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    padding: margins.medium,
    paddingTop: 180 + margins.medium,
  },
  inner: {
    flexDirection: 'row',
  },
  imgContainer: {
    height: imgSize + 8,
    width: imgSize + 8,
    marginTop: -imgSize / 1.5,
    borderWidth: 2,
    backgroundColor: colors.white,
    borderColor: colors.lightGray,
    padding: 2,
    borderRadius: imgSize + 8,
  },
  image: {
    height: imgSize,
    aspectRatio: 1,
    borderRadius: imgSize,
    overflow: 'hidden',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 4,
    backgroundColor: colors.white,
  },
  imgBg: {
    width,
    height: 180,
    opacity: 0.3,
  },
  right: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: margins.medium,
    marginLeft: margins.medium,
  },
  value: {
    marginBottom: margins.medium,
    color: colors.primary,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 4,
    padding: margins.medium,
    marginTop: margins.medium,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});
