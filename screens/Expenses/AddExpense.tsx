import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { StyleSheet } from 'react-native';
import { Button, Text, View } from '../../components/Themed';
import InputBox from '../../components/Input';
import { COLORS } from '../../constants/Colors';
import store from '../../store';
import SingleSelect from '../../components/SingleSelect';
import MultipleSelect from '../../components/MultiSelect';
import Switch from '../../components/Switch';
import PopUpInput from '../../components/PopUpInput';
import { API_STATUSCODE } from '../../constants/constant';
import Toast from 'react-native-toast-message';
import { updateDocument } from '../../firebase/QueryUtils';

interface IAddExpenseProps {
  isEditMode?: boolean;
  editProps?: any;
  closeModal?: () => void;
  getExpenseList?: () => void;
  setIsTabState?: () => void;
}

const AddExpenses = (props: IAddExpenseProps): JSX.Element => {
  const { isEditMode, editProps, closeModal, getExpenseList, setIsTabState } = props;
  const {
    groupsStore: { activeGroupUsers, activeGroup },
    expenseStore: { addExpense },
    generalStore: { user },
  } = store;

  const [description, setDescription] = useState('');
  const [totalAmount, setTotalAmount] = useState(null);
  const [amount, setAmount] = useState(null);
  const [paidBy, setPaidBy] = useState(null);
  const [splitMembers, setSplitMembers] = useState([]);
  const [groupMembers, setGroupMebers] = useState([]);
  const [isEqual, setIsEqual] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      console.log(editProps);
      setDescription(editProps?.description);
      setTotalAmount(editProps?.totalAmount);
      setPaidBy({ key: editProps?.paidBy?.id, value: editProps?.paidBy?.name });
      setIsEqual(editProps?.splitBy === 1);
      const splitMembers = editProps?.members.map((member) => {
        return { value: member.name, key: member.id };
      });
      const amount = editProps?.members.map((member) => {
        return { key: member.id, amount: member?.amount };
      });
      setSplitMembers(splitMembers);
      setAmount(amount);
    }
  }, [isEditMode]);

  const updateGroupMembers = () => {
    if (activeGroupUsers.length) {
      const groupMr = activeGroupUsers.map((item) => {
        return {
          value: item?.name,
          key: item?.uid,
        };
      });
      setGroupMebers(groupMr);
    }
  };

  const resetValue = () => {
    setDescription('');
    setTotalAmount(null);
    setAmount(null);
    setPaidBy(null);
    setSplitMembers([]);
    setIsEqual(false);
    updateGroupMembers();
  };

  useEffect(() => {
    updateGroupMembers();
  }, []);

  const onSubmit = () => {
    const currentDate = new Date().getTime();
    const splitMembersModified = splitMembers?.map((itemA) => ({
      ...{ id: itemA.key, name: itemA.value },
      ...{ amount: isEqual ? null : amount?.find((itemB) => itemB?.key === itemA?.key).amount },
    }));
    const payload = {
      totalAmount,
      description,
      groupId: activeGroup.id,
      paidBy: {
        id: paidBy?.key,
        name: paidBy?.value,
      },
      splitBy: isEqual ? 1 : 2,
      members: splitMembersModified,
      updatedAt: currentDate,
      createdAt: isEditMode ? editProps?.createdAt : currentDate,
      updatedBy: user?.displayName,
    };

    if (isEditMode) {
      updateDocument('expense', editProps?.id, payload);
      getExpenseList();
      closeModal();
    } else {
      addExpense(payload);
      setIsTabState();
    }
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: `Expense ${isEditMode ? 'updated' : 'Added'} successfully`,
    });
    resetValue();
  };

  const seeExpenseDetails = () => {
    return (
      <View style={styles.expense_details_container}>
        <Text>{totalAmount}</Text>
        <Text>Paid by {paidBy?.value}</Text>
        {isEqual ? <Text>{totalAmount / splitMembers.length} each splitted equally</Text> : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <InputBox value={description} placeHolder="Enter Description" onChange={(value) => setDescription(value)} />
      <InputBox
        value={totalAmount || ''}
        placeHolder="Enter Amount"
        keyBoardType="number-pad"
        onChange={(value) => setTotalAmount(parseInt(value, 10))}
      />
      <View style={{ margin: 10, gap: 12 }}>
        <Text style={[styles.labelText, { color: COLORS.green }]}>Paid By</Text>
        <SingleSelect selectedValue={paidBy} setSelected={(val) => setPaidBy(val)} data={groupMembers} />
        <View style={styles.splitContainer}>
          <Text style={{ fontWeight: '600' }}>Split Equally </Text>
          <Switch styles={styles.split} value={isEqual} onChangeValue={() => setIsEqual(!isEqual)} />
        </View>
        <View style={{ gap: 12 }}>
          <Text style={[styles.labelText, { color: COLORS.pink }]}>Split By</Text>
          <MultipleSelect
            amountValue={amount}
            selectedValues={splitMembers}
            setSelected={(val) => {
              setSplitMembers(val);
            }}
            setAmountValue={setAmount}
            splitEqualy={isEqual}
            data={groupMembers}
            save="value"
            label="Categories"
          />
        </View>
      </View>
      <View style={styles.action_container}>
        <Button
          containerStyle={{ width: 'auto', padding: 10 }}
          icon="refresh"
          title="Reset"
          onPress={() => resetValue()}
        />
        <Button
          containerStyle={{ width: 'auto', padding: 10 }}
          title={`${isEditMode ? 'Update' : ' Add'} Expense`}
          color="#FFFFFF"
          onPress={() => onSubmit()}
          backgroundColor={COLORS.buttonGreen}
        />
      </View>
      {/* <PopUpInput
        onSubmitClick={() => onSubmit()}
        buttonTitle="Add"
        modalTitle="Create Group"
        // closeTimeout={status === API_STATUSCODE.SUCCESS ? 9000 : 0}
        modalContent={seeExpenseDetails()}
        // reset={resetValue}
        // disableSubmit={disableSubmit}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 10, marginVertical: 20 },
  paymentContainer: {
    display: 'flex',
    position: 'relative',
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
  splitContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  split: {
    marginLeft: 4,
    position: 'absolute',
    right: 16,
  },
  splitDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.lightGrey,
  },
  action_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    paddingTop: 10,
  },
  expense_details_container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 10,
  },
});

export default observer(AddExpenses);
