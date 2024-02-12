import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SceneMap } from 'react-native-tab-view';
import TabViewComponent from '../../components/Tabs';
import { View } from '../../components/Themed';
import { getListOfUsersById } from '../../firebase/QueryUtils';
import store from '../../store';
import AddExpenses from './AddExpense';
import ExpenseList from './ExpensesList';

const SecondRoute = () => <View style={[styles.container, { backgroundColor: '#673ab7' }]} />;

const Expenses = (): JSX.Element => {
  const {
    groupsStore: { activeGroup, setActiveGroupUsers },
  } = store;

  useEffect(() => {
    const activeGroupUsers = getListOfUsersById(activeGroup.users);
    setActiveGroupUsers(activeGroupUsers);
  }, []);

  const [tabState, setIsTabState] = useState({
    index: 0,
    routes: [
      { key: 'addExpense', title: 'Add Expense' },
      { key: 'list', title: 'Expenses' },
      { key: 'settings', title: 'Settings' },
    ],
  });

  const renderScene = SceneMap({
    addExpense: () => <AddExpenses />,
    list: () => <ExpenseList />,
    settings: () => <></>,
  });

  return (
    <View style={styles.container}>
      <TabViewComponent setIsTabState={setIsTabState} tabState={tabState} renderScene={renderScene} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  button: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});

export default Expenses;
