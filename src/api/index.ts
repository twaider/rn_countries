import {useQuery} from '@tanstack/react-query';
import {type Country} from '../types';
import axios from 'axios';

// normally should be in a .env file
export const COUNTRIES_ENDPOINT = 'https://restcountries.com/v3.1';

export const axiosClient = axios.create({
  baseURL: COUNTRIES_ENDPOINT,
  responseType: 'json',
});

/**
 * Fetch all countries from the API
 * @returns {Promise<Country[]>} A promise that resolves to an array of Country objects
 */
export const fetchAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await axiosClient.get(
      '/all?fields=name,flags,region,population,capital,languages,continents,latlng',
    );

    if (response.status !== 200) {
      throw response.statusText;
    }

    return response?.data;
  } catch (error: any) {
    throw error;
  }
};

export function useApi() {
  return useQuery<Country[], Error>(['countries'], fetchAllCountries);
}
