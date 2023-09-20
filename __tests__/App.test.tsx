/**
 * @format
 */

import {fireEvent, render, screen} from '@testing-library/react-native';
import * as React from 'react';
import MockAdapter from 'axios-mock-adapter';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import countries from '../__mocks__/countries';
import {Routes} from '../src/Router';
import {axiosClient} from '../src/api';

export const mock = new MockAdapter(axiosClient, {onNoMatch: 'throwException'});

export const COUNTRIES_PATH =
  '/all?fields=name,flags,region,population,capital,languages,continents,latlng';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries and cachetime off for testing
      retry: false,
      cacheTime: Infinity,
    },
  },
});

const Wrapper = ({children}: {children: React.ReactNode}) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('Test app render', () => {
  test('Render the list of countries and find Sweden', async () => {
    new MockAdapter(axiosClient).onGet(COUNTRIES_PATH).reply(200, countries);

    const component = (
      <Wrapper>
        <Routes />
      </Wrapper>
    );

    render(component);

    const header = await screen.findByText('Sweden');

    expect(header).toBeOnTheScreen();
  });

  test('clicking on one item takes you to the details screen', async () => {
    new MockAdapter(axiosClient).onGet(COUNTRIES_PATH).reply(200, countries);

    const component = (
      <Wrapper>
        <Routes />
      </Wrapper>
    );

    render(component);
    const onClick = await screen.findByText('Sweden');

    fireEvent(onClick, 'press');
    const regionText = await screen.findByText('Stockholm');

    expect(regionText).toBeOnTheScreen();
  });

  test('show empty list screen', async () => {
    queryClient.removeQueries();
    new MockAdapter(axiosClient).onGet(COUNTRIES_PATH).reply(200, []);

    const component = (
      <Wrapper>
        <Routes />
      </Wrapper>
    );

    render(component);
    const text = await screen.findByText('No data');

    expect(text).toBeOnTheScreen();
  });
});
