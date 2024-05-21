import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ExpenseListCard from '../../components/ExpenseListCard';
import Icon from '../../components/Icons/Icons';
import PopUpInput from '../../components/PopUpInput';
import { SwipeButton } from '../../components/SwipeButton';
import { Button, View } from '../../components/Themed';
import { COLORS } from '../../constants/Colors';
import { DATE_FORMAT } from '../../constants/constant';
import { deleteDocument, updateDocument } from '../../firebase/QueryUtils';
import store from '../../store';
import { expochTimetoDateConvertor } from '../../Utils/CommonUtils';
import { formatTransactionHistory } from '../../Utils/SimplifyDebts';
import AddExpenses from './AddExpense';

const isCurrentUserInvolvedInExpense = (membersInvolvedList, userId) => {
  return membersInvolvedList.some((member) => member?.id === userId);
};

const ExpenseList = () => {
  const {
    generalStore: { user },
    expenseStore: { setExpenseList, expenseList },
    groupsStore: { activeGroup },
  } = store;

  useEffect(() => {
    setExpenseList(user.uid, activeGroup?.id);
  }, []);

  const getUpdatedList = () => {
    return expenseList.map((expense) => {
      const isLent = expense?.paidBy?.id === user.uid;
      const isCurrentUserInvolved = isCurrentUserInvolvedInExpense(expense.members, user.uid);
      return {
        ...expense,
        isLent: isLent,
        isInvolved: isCurrentUserInvolved || isLent,
        isCurrentUserInvolved: isCurrentUserInvolved,
      };
    });
  };

  const Item = ({ item }) => {
    const [isEditMode, setIsEditMode] = useState(false);

    const isLent = item?.isLent;

    const isSplitEqually = item?.splitBy === 1;

    const membersList = item?.members;

    const membersCount = membersList.length;

    const totalAmount = item.totalAmount;

    const isCurrentUserInvolved = item.isCurrentUserInvolved;

    let amountTobeTransactioned = 0;
    if (isCurrentUserInvolved) {
      if (isLent) {
        amountTobeTransactioned = isSplitEqually
          ? (totalAmount / membersCount) * (membersCount - 1)
          : totalAmount - membersList.find((member) => member?.id === user.uid)?.amount;
      } else {
        amountTobeTransactioned = isSplitEqually
          ? totalAmount / membersCount
          : membersList.find((member) => member?.id === user.uid)?.amount;
      }
    } else {
      if (isLent) {
        amountTobeTransactioned = totalAmount;
      }
    }

    const monthDate = expochTimetoDateConvertor(item.createdAt, DATE_FORMAT.MM_DD_OBJECT);

    const onClick = (openModal) => {
      openModal();
    };

    const onDelete = () => {
      deleteDocument('expense', item.id);
      setExpenseList(user.uid, activeGroup?.id);
    };

    const expenseCardComponent = (openModal) => (
      <ExpenseListCard
        description={item.description}
        name={item.paidBy.name}
        isInvolved={item.isInvolved}
        isLent={isLent}
        amount={totalAmount}
        month={monthDate.month.substring(0, 3)}
        date={monthDate.day}
        amountTobeTransactioned={amountTobeTransactioned}
        onClick={() => onClick(openModal)}
      />
    );

    const renderButtonComponent = (openModal) => expenseCardComponent(openModal);

    const modalContent = () => {
      const { paidBy, splitBy, totalAmount, members } = item;
      const isEqual = splitBy === 1;
      console.log(item);

      const onSetPaid = (value: boolean) => {
        const { isLent, isInvolved, isCurrentUserInvolved, ...rest } = item;
        const payload = { ...rest, isPaid: value !== null ? !value : true };
        updateDocument('expense', item?.id, payload);
        setExpenseList(user.uid, activeGroup?.id);
        setIsEditMode(false);
      };

      return (
        <View style={{ flex: 1 }}>
          {isEditMode ? (
            <AddExpenses
              isEditMode={true}
              editProps={item}
              closeModal={() => setIsEditMode(false)}
              getExpenseList={() => setExpenseList(user.uid, activeGroup?.id)}
            />
          ) : (
            <>
              <View style={expenseModalStyles.expense_details_container}>
                <Text style={{ fontSize: 19, fontWeight: '800', color: COLORS.activeGreen }}>₹{totalAmount}</Text>
                <Text>Paid by {paidBy?.name}</Text>
                {isEqual ? <Text>₹ {totalAmount / members.length} each splitted equally</Text> : null}
              </View>
              <View style={[expenseModalStyles.members_list, !isEqual ? { alignItems: 'center' } : {}]}>
                {isEqual && members.map((member) => <Text>{member.name}</Text>)}
                {!isEqual &&
                  members.map((member) => (
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                      <Text style={{ width: 160 }}>{member.name}</Text>
                      <Text style={{ color: COLORS.darkRose }}>{member.amount}</Text>
                    </View>
                  ))}
              </View>
              <View style={expenseModalStyles.bottom_container}>
                <Button
                  containerStyle={{ width: 'auto', padding: 10 }}
                  icon="edit"
                  title="Edit Expense"
                  color={COLORS.yellow}
                  backgroundColor={COLORS.black}
                  onPress={() => setIsEditMode(true)}
                />
                <TouchableOpacity onPress={() => onDelete()}>
                  <Icon icon="delete" />
                </TouchableOpacity>

                <Button
                  containerStyle={{ width: 'auto', padding: 10 }}
                  icon={item?.isPaid ? null : 'payment-pending'}
                  title={item?.isPaid ? 'Payment Done' : 'Payment Pending'}
                  color={COLORS.white}
                  backgroundColor={item?.isPaid ? COLORS.activeGreen : COLORS.darkBlue}
                  onPress={() => onSetPaid(item?.isPaid)}
                />
              </View>
            </>
          )}
        </View>
      );
    };

    return (
      <PopUpInput
        onClose={() => setIsEditMode(false)}
        modalTitle="Expense Card"
        modalContent={modalContent()}
        height={isEditMode && 1}
        renderButtonComponent={renderButtonComponent}
        isHideSubmit={true}
      />
    );
  };

  const renderItem = ({ item }) => <Item item={item} />;

  const sortedList = getUpdatedList();

  sortedList.sort((a, b) => b.createdAt - a.createdAt);

  if (sortedList?.length < 1) {
    return (
      <View style={expenseModalStyles.empty_container}>
        <Text>{`No Expenses to show :(`}</Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        keyExtractor={(item) => item.id}
        data={sortedList}
        style={{ width: '100%', flex: 1 }}
        renderItem={renderItem}
      />
    </>
  );
};

export default observer(ExpenseList);

const expenseModalStyles = StyleSheet.create({
  expense_details_container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 10,
  },
  members_list: {
    display: 'flex',
    flexDirection: 'column',
    height: 220,
    gap: 12,
    marginTop: 36,
    overflow: 'scroll',
  },
  bottom_container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amount: {
    fontSize: 14,
  },
  empty_container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
  },
});
