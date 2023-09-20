import {StyleSheet} from 'react-native';

export const colors = {
  primary: '#aa60cc',
  white: '#fff',
  lightGray: '#f5f5f5',
  darkGray: '#424242',
  error: '#ff0000',
};
export const margins = {small: 5, medium: 15, large: 20};

export const textStyles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: colors.darkGray,
  },
  textBold: {
    fontSize: 16,
    color: colors.darkGray,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    color: colors.darkGray,
  },
  error: {
    fontSize: 16,
    color: colors.error,
  },
});
