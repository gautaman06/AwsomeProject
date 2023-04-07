import React from 'react';
import { observer } from 'mobx-react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import InputBox from '../../components/Input';
import { COLORS } from '../../constants/Colors';
import PopUpInput from '../../components/PopUpInput';

const AddExpenses = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <InputBox placeHolder="Enter Description" />
      <InputBox placeHolder="Enter Amount" keyBoardType="number-pad" />
      <View style={styles.paymentContainer}>
        <Text style={[styles.labelText, { color: COLORS.green }]}>Paid By</Text>
        <PopUpInput modalContent={<>hello</>} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 24, marginVertical: 24, gap: 16 },
  paymentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
  },
  labelText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
  },
  button: {
    marginTop: 20,
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});

export default observer(AddExpenses);
