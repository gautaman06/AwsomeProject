import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { StyleSheet } from 'react-native';
import { Button, Text, View } from '../../components/Themed';
import InputBox from '../../components/Input';
import { COLORS } from '../../constants/Colors';
import PopUpInput from '../../components/PopUpInput';
import BouncyCheckbox from '../../components/BouncyCheckbox';
import store from '../../store';

interface ICheckboxList {
  value: string;
  text: string;
  isChecked: boolean;
}

const names: ICheckboxList[] = [
  {
    value: 'g',
    text: 'Gautam',
    isChecked: false,
  },
  {
    value: 's',
    text: 'Sowmy',
    isChecked: true,
  },
];

const AddExpenses = (): JSX.Element => {
  const {
    groupsStore: { activeGroupUsers, activeGroup },
  } = store;

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(null);
  const [paidBy, setPaidBy] = useState('');

  useEffect(() => {
    if (activeGroupUsers.length) {
      const paidByUserName = activeGroupUsers.find((user) => user.uid === activeGroup.uid).name;
      console.log('add Expense', paidByUserName);
    }
  }, []);

  const [namesList, setNamesList] = useState<ICheckboxList[]>(names);

  const updateNamesList = (data: Partial<ICheckboxList>, isParentCheckbox: boolean = false) => {
    const { isChecked, value = null } = data;

    const newNamesList = [...namesList];

    if (!isParentCheckbox) {
      newNamesList.forEach((name) => {
        if (name.value === value) {
          name.isChecked = isChecked;
        }
      });
    } else {
      newNamesList.forEach((name) => {
        name.isChecked = isChecked;
      });
    }

    setNamesList(newNamesList);
  };

  const isAllNamesChecked = namesList.every((name) => name.isChecked);
  const isPartial = namesList.some((name) => name.isChecked);

  const renderModalContent = () => (
    <>
      <BouncyCheckbox
        text={'Select All'}
        isChecked={isAllNamesChecked}
        isPartial={isPartial}
        onPress={(isChecked, _) => updateNamesList({ isChecked }, true)}
      />
      {namesList.map((item) => {
        return <BouncyCheckbox {...item} onPress={(isChecked, value) => updateNamesList({ isChecked, value })} />;
      })}
    </>
  );

  return (
    <View style={styles.container}>
      <InputBox placeHolder="Enter Description" />
      <InputBox placeHolder="Enter Amount" keyBoardType="number-pad" />
      <View style={styles.paymentContainer}>
        <Text style={[styles.labelText, { color: COLORS.green }]}>Paid By</Text>
        <PopUpInput buttonTitle="Somy" modalContent={renderModalContent()} />
      </View>
      <View style={styles.paymentContainer}>
        <Text style={[styles.labelText, { color: COLORS.pink }]}>Split By</Text>
        <PopUpInput buttonTitle="Equally" modalContent={renderModalContent()} />
        <PopUpInput buttonTitle="Un Equally" modalContent={renderModalContent()} />
      </View>
      <View>
        <Button icon="refresh" title="Reset" onPress={() => null} />
        <Button title="Add Expense" onPress={() => null} backgroundColor={COLORS.green} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 10, marginVertical: 20, gap: 16 },
  paymentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
    marginLeft: 12,
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
