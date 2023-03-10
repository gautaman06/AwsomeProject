const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export const white = '#fff';
export const black = '#000';
export const blue = '#3E73FB';
export const red = '#FB4A4A';

export default {
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
