import React, { useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SceneMap } from 'react-native-tab-view';
import TabViewComponent from '../../components/Tabs';
import { View } from '../../components/Themed';
import AddExpenses from './AddExpense';

const SecondRoute = () => <View style={[styles.container, { backgroundColor: '#673ab7' }]} />;

const Expenses = (): JSX.Element => {
  const [tabState, setIsTabState] = useState({
    index: 0,
    routes: [
      { key: 'addExpense', title: 'Add Expense' },
      { key: 'list', title: 'Expenses' },
    ],
  });

  const renderScene = SceneMap({
    addExpense: () => <AddExpenses setIsTabState={setIsTabState} tabState={tabState} />,
    list: SecondRoute,
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
