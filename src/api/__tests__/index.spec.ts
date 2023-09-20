/**
 * @format
 */

import {axiosClient, fetchAllCountries} from './../index';
import countries from '../../../__mocks__/countries';
import {COUNTRIES_PATH, mock} from '../../../__tests__/App.test';
import MockAdapter from 'axios-mock-adapter';

mock.onGet(COUNTRIES_PATH).reply(200, countries);

describe('Test api', () => {
  test('test data', async () => {
    new MockAdapter(axiosClient).onGet(COUNTRIES_PATH).reply(200, countries);
    const data = await fetchAllCountries();

    expect(data[0]).toEqual(countries[0]);
  });

  test('test data fail', async () => {
    new MockAdapter(axiosClient).onGet(COUNTRIES_PATH).networkError();

    try {
      const data = await fetchAllCountries();

      expect(data).toEqual('Network Error');
    } catch (error) {}
  });
});
