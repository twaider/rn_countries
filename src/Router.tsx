import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import * as React from 'react';
import CountriesDetailsScreen from './routes/Details';
import CountriesListScreen from './routes/List';
import {colors} from './theme/Default';

export const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: 2}},
});

const Stack = createNativeStackNavigator();

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ListScreen"
        screenOptions={{
          presentation: 'card',
          headerBackTitleVisible: false,
          headerTintColor: colors.primary,
          contentStyle: {
            backgroundColor: colors.white,
          },
          headerShadowVisible: false,
        }}>
        <Stack.Screen
          name="ListScreen"
          component={CountriesListScreen}
          options={{title: 'Countries', headerShown: false}}
        />
        <Stack.Screen
          name="DetailsScreen"
          component={CountriesDetailsScreen}
          options={() => ({
            title: '',
            headerTransparent: true,
            headerStyle: {
              backgroundColor: 'transparent',
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function Router() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  );
}
