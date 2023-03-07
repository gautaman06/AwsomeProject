const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export const white = '#fff';
export const black = '#000';

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
  },
};
