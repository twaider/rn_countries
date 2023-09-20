import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import * as React from 'react';
import {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {useApi} from '../api';
import Divider from '../components/Divider';
import ListEmptyComponent from '../components/ListEmptyComponent';
import ListHeaderComponent from '../components/ListHeaderComponent';
import {ListItem} from '../components/ListItem';
import {type Country} from '../types';

type CountriesListScreenNavigationProp = NativeStackNavigationProp<
  any,
  'CountriesList'
>;

type Props = {
  navigation: CountriesListScreenNavigationProp;
};

export default function CountriesListScreen({navigation}: Props) {
  const [listData, setListData] = React.useState<Country[]>([]);

  // react-query hook to fetch data
  const {isLoading, error, data, refetch} = useApi();

  useEffect(() => {
    if (data?.length && !error) {
      // sort data alphabetically
      const sortedData = data?.sort((a, b) => {
        if (a.name.common < b.name.common) {
          return -1;
        }
        if (a.name.common > b.name.common) {
          return 1;
        }
        return 0;
      });
      setListData(sortedData);
    }
  }, [data, error]);

  // function that refreshes the data
  const onRefresh = async () => {
    try {
      await refetch();
    } catch (e) {
      console.log(e);
    }
  };

  const onPress = React.useCallback(
    (country: Country) => {
      navigation.navigate('DetailsScreen', {
        country,
        title: country.name.common,
      });
    },
    [navigation],
  );

  const renderItem = React.useCallback(
    ({item}: {item: Country}) => {
      return (
        <ListItem key={`${item.name.common}`} item={item} onPress={onPress} />
      );
    },
    [onPress],
  );

  if (isLoading) {
    return (
      <View style={styles.fill}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={listData}
      contentContainerStyle={styles.contentContainerStyle}
      renderItem={renderItem}
      keyExtractor={item => item.name.common}
      ItemSeparatorComponent={Divider}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={<ListEmptyComponent error={error} />}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
      }
    />
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    marginTop: 40,
    paddingTop: 40,
  },
  fill: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
