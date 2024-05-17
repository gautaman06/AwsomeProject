import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { SceneMap } from 'react-native-tab-view';
import Icon from '../../components/Icons/Icons';
import TabViewComponent from '../../components/Tabs';
import { Text, View } from '../../components/Themed';
import { DATE_FORMAT } from '../../constants/constant';
import { getListOfUsersById } from '../../firebase/QueryUtils';
import store from '../../store';
import { RootStackScreenProps } from '../../types';
import { expochTimetoDateConvertor } from '../../Utils/CommonUtils';
import AddExpenses from './AddExpense';
import ExpenseList from './ExpensesList';
import Settings from './Settings';
import SimplifyDebts from './SimplifyDebts';

const SecondRoute = () => <View style={[styles.container, { backgroundColor: '#673ab7' }]} />;

const Expenses = ({ navigation }: RootStackScreenProps<'Expenses'>): JSX.Element => {
  const {
    groupsStore: { activeGroup },
    generalStore: { user, users },
  } = store;

  const [tabState, setIsTabState] = useState({
    index: 0,
    routes: [
      { key: 'addExpense', title: 'Add Expense' },
      { key: 'list', title: 'Expenses' },
      { key: 'simplifyDebts', title: 'Simplify Debts' },
      // ...(activeGroup.debts ? [{ key: 'simplifyDebts', title: 'Simplify Debts' }] : []),
      { key: 'settings', title: 'Settings' },
    ],
  });

  const GroupDetailsRender = () => {
    const { name, uid, createdAt } = activeGroup;
    const userName = uid === user.uid ? user?.displayName : users.find((u) => u.uid === uid);
    const time = expochTimetoDateConvertor(createdAt, DATE_FORMAT.DD_MM_YYYY_HH_MM);

    const NavigateToHome = () => {
      navigation.navigate('Home');
    };

    return (
      <View style={styles.group_details_container}>
        <View style={styles.group_header_actions}>
          <TouchableOpacity onPress={() => NavigateToHome()}>
            <Icon icon="left" />
          </TouchableOpacity>
          <Text style={{ fontWeight: '700', fontSize: 14 }}>{name}</Text>
          <Icon icon="refresh" />
        </View>
        <Text style={{ color: '#B6B6B6', fontSize: 12, fontWeight: '400' }}>{userName} created this group</Text>
        <Text style={{ color: '#B6B6B6', fontSize: 12, fontWeight: '400' }}>{time}</Text>
      </View>
    );
  };

  const renderScene = SceneMap({
    addExpense: () => <AddExpenses setIsTabState={() => setIsTabState({ ...tabState, index: 1 })} />,
    list: () => <ExpenseList />,
    simplifyDebts: () => <SimplifyDebts tabState={tabState} />,
    settings: () => <Settings />,
  });

  return (
    <View style={styles.container}>
      <TabViewComponent
        setIsTabState={setIsTabState}
        tabState={tabState}
        renderScene={renderScene}
        renderHeader={GroupDetailsRender}
      />
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
  group_details_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    gap: 5,
    paddingTop: 20,
  },
  group_header_actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
  },
});

export default Expenses;
