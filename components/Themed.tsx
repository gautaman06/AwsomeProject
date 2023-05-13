/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import React from 'react';
import {
  Text as DefaultText,
  View as DefaultView,
  TextInput as DefaultTextInput,
  Button as DefaultButton,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

/**
 * It returns the color from the props if it exists, otherwise it returns the color from the theme
 * @param props - { light?: string; dark?: string }
 * @param colorName - The name of the color you want to use.
 */
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props'];
export type ButtonProps = ThemeProps &
  DefaultButton['props'] & {
    isDanger?: boolean;
    containerStyle?;
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
    disabled?: boolean;
  };

/**
 * It takes in a `TextProps` object, and returns a `<DefaultText>` component with the `color` prop set
 * to the `color` variable
 * @param {TextProps} props - TextProps - This is the props that will be passed to the Text component.
 * @returns A Text component that takes in props and returns a DefaultText component with a color and
 * style prop.
 */
export const Text = (props: TextProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
};

/* A function that takes in a `TextInputProps` object, and returns a `TextInput` component that has a
`color` prop
 * that is set to the `text` color from the theme
 * @param {TextInputProps} props - TextInputProps - This is the props that the component will
receive.
 * @returns A TextInput component that has a color that is either light or dark depending on the
 * theme.
 */
export const TextInput = (props: TextInputProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const borderBottomColor = useThemeColor({ light: lightColor, dark: darkColor }, 'borderBottomColor');
  const borderTopColor = useThemeColor({ light: lightColor, dark: darkColor }, 'borderTopColor');
  const borderLeftColor = useThemeColor({ light: lightColor, dark: darkColor }, 'borderLeftColor');
  const borderRightColor = useThemeColor({ light: lightColor, dark: darkColor }, 'borderRightColor');

  return (
    <DefaultTextInput
      style={[{ color, borderBottomColor, borderTopColor, borderLeftColor, borderRightColor }, style]}
      {...otherProps}
    />
  );
};

/**
 * It takes in a `ViewProps` object, and returns a `View` component that has a `backgroundColor` prop
 * that is set to the `background` color from the theme
 * @param {ViewProps} props - ViewProps - This is the props that the component will receive.
 * @returns A View component that has a background color that is either light or dark depending on the
 * theme.
 */
export const View = (props: ViewProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
};

/**
 * It returns a TouchableOpacity component with a Text component inside it
 * @param {ButtonProps} props - ButtonProps
 * @returns A TouchableOpacity component with a Text component inside of it.
 */
export const Button = (props: ButtonProps) => {
  const { title, onPress, containerStyle, backgroundColor, borderColor, color, disabled } = props;
  // const backgroundColor = useThemeColor(
  //   { light: lightColor, dark: darkColor },
  //   isDanger ? 'dangerButtonColor' : 'buttonColor',
  // );
  // const textColor = useThemeColor(
  //   { light: lightColor, dark: darkColor },
  //   isDanger ? 'dangerButtonTextColor' : 'buttonTextColor',
  // );

  // const borderColor = useThemeColor(
  //   { light: lightColor, dark: darkColor },
  //   isDanger ? 'dangerButtonBorderColor' : 'buttonBorderColor',
  // );

  const buttonStyles = Object.assign({}, styles, {
    container: {
      ...styles.container,
      ...containerStyle,
      borderColor: borderColor || backgroundColor,
      backgroundColor: backgroundColor,
      opacity: disabled ? '50%' : '100%',
    },
    title: {
      ...styles.title,
      color: color,
    },
  });

  return (
    <TouchableOpacity style={buttonStyles.container} onPress={onPress} disabled={disabled}>
      <Text style={buttonStyles.title}> {title} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    borderColor: '#512DA8',
    borderWidth: 1,
    backgroundColor: '#512DA8',
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    // fontSize: 16,
  },
});
