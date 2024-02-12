import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import ExpenseListCard from '../../components/ExpenseListCard';
import store from '../../store';

const isCurrentUserInvolvedInExpense = (membersInvolvedList, userId) => {
  return membersInvolvedList.some((member) => member?.id === userId);
};

const ExpenseList = () => {
  const { user } = store.generalStore;
  const { setExpenseList, expenseList } = store.expenseStore;

  useEffect(() => {
    setExpenseList(user.uid);
  }, []);

  const Item = ({ item }) => {
    const isLent = item.uid === user.uid;

    const isSplitEqually = item?.splitBy === 1;

    const membersList = isSplitEqually ? item.equalMembers : item.unEqualMembers;

    const isCurrentUserInvolved = isCurrentUserInvolvedInExpense(membersList, user.uid);

    console.log(isCurrentUserInvolved, membersList);
    return (
      <ExpenseListCard
        description={item.description}
        name={item.paidBy}
        isInvolved={isCurrentUserInvolved}
        isLent={isLent}
        amount={item.amount}
        date="Sep 23"
      />
    );
  };

  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <>
      <FlatList
        keyExtractor={(item) => item.id}
        data={expenseList}
        style={{ width: '100%', flex: 1 }}
        renderItem={renderItem}
      />
    </>
  );
};

export default ExpenseList;
