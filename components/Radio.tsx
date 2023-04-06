import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface IRadioButtonProps {
  list: { key: string; label: string }[];
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  selected: string;
  radioColor?: string;
}

export const RadioButton = (props: IRadioButtonProps) => {
  const { list, setSelected, selected, radioColor } = props;
  const styles = radioStyles;

  /* This code block is checking if the `radioColor` prop has a length greater than 0. If it does, it
  updates the `radioCircle` and `selectedRb` styles by spreading the existing styles and adding a
  new `borderColor` or `backgroundColor` property with the value of `radioColor`. This allows the
  user to customize the color of the radio button and selected radio button based on the
  `radioColor` prop passed to the component. */
  if (radioColor?.length > 0) {
    styles.radioCircle = {
      ...radioStyles.radioCircle,
      borderColor: radioColor,
    };
    styles.selectedRb = {
      ...radioStyles.selectedRb,
      backgroundColor: radioColor,
    };
  }

  return (
    <View>
      {list.map((res) => {
        return (
          <View key={res.key} style={styles.container}>
            <Text style={styles.radioText}>{res.label}</Text>
            <TouchableOpacity
              style={styles.radioCircle}
              onPress={() => {
                setSelected(res.key);
              }}
            >
              {selected === res.key && <View style={styles.selectedRb} />}
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const radioStyles = StyleSheet.create({
  container: {
    marginBottom: 35,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioText: {
    marginRight: 35,
    fontSize: 14,
    color: '#000',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#3740ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: '#3740ff',
  },
});
