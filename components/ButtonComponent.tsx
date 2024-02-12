import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/Colors';

interface IButtonComponentProps {
  title?: string;
  onClick?: () => void;
}

const ButtonComponent = (props: IButtonComponentProps) => {
  const { title = '', onClick = null } = props;

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onClick}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 43,
    backgroundColor: COLORS.white,
    borderColor: `${COLORS.lightGrey}`,
    borderWidth: 1,
    borderRadius: 6,
    color: COLORS.black,
    padding: 10,
    margin: 10,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    flex: 1,
  },
});

export default ButtonComponent;
