import React from 'react';
import { KeyboardTypeOptions, StyleSheet, TextInput } from 'react-native';
import { COLORS } from '../constants/Colors';

interface IInputBoxProps {
  placeHolder?: string;
  keyBoardType?: KeyboardTypeOptions;
  onChange?: (value) => void;
  value;
}

const InputBox = (props: IInputBoxProps) => {
  const { placeHolder = 'Enter value', keyBoardType = 'default', onChange, value } = props;

  return (
    <TextInput
      value={value}
      style={styles.input}
      keyboardType={keyBoardType}
      placeholder={placeHolder}
      placeholderTextColor={COLORS.mildTextGrey}
      onChangeText={(value) => {
        onChange(value);
      }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 46,
    backgroundColor: COLORS.white,
    // border: `1px solid ${COLORS.lightGrey}`,
    borderColor: `${COLORS.lightGrey}`,
    borderWidth: 1,
    borderRadius: 6,
    color: COLORS.black,
    padding: 10,
    margin: 10,
  },
});

export default InputBox;
