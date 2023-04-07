const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

/* Exporting the colors to be used in the app. */
export const white = '#fff';
export const black = '#000';
export const blue = '#3E73FB';
export const red = '#FB4A4A';

export default {
  /* Setting the color scheme for the light theme. */
  light: {
    text: black,
    background: white,
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    borderBottomColor: black,
    borderTopColor: white,
    borderLeftColor: white,
    borderRightColor: white,
    buttonColor: white,
    buttonTextColor: blue,
    buttonBorderColor: blue,
    dangerButtonColor: white,
    dangerButtonTextColor: red,
    dangerButtonBorderColor: red,
  },
  /* Setting the color scheme for the dark theme. */
  dark: {
    text: white,
    background: black,
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    borderBottomColor: white,
    borderTopColor: black,
    borderLeftColor: black,
    borderRightColor: black,
    buttonColor: blue,
    buttonTextColor: white,
    buttonBorderColor: blue,
    dangerButtonColor: red,
    dangerButtonTextColor: white,
    dangerButtonBorderColor: red,
  },
};

/* This is a constant that is used to set the colors for the expense list card. */
export const EXPENSELISTCARD_COLORS = {
  LENT: {
    background: '#A1E396',
    color: '#0D8B21',
  },
  NOT_INVOLVED: {
    background: '#A599F0',
    color: '#5D6BE9',
  },
  BORROWED: {
    background: '#EFC0F0',
    color: '#B73161',
  },
};

export const COLORS = {
  white: '#FFFFFF',
  lightGrey: '#B6B6B6',
  mildTextGrey: '#B6B6B6',
  black: '#000000',
  green: '#0D8B21',
  pink: '#B73161',
  submitText: '#05B4FF',
};
