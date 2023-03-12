import React from 'react';
import { observer } from 'mobx-react';
import { StyleSheet } from 'react-native';
import { Button, Text, View } from '../../components/Themed';
import observableGeneralStore from '../../store/General';

interface IAddExpenseProps {
  setIsTabState: React.Dispatch<
    React.SetStateAction<{
      index: number;
      routes: {
        key: string;
        title: string;
      }[];
    }>
  >;
  tabState: {
    index: number;
    routes: {
      key: string;
      title: string;
    }[];
  };
}

const AddExpenses = (props: IAddExpenseProps): JSX.Element => {
  const { setIsTabState, tabState } = props;
  const { text } = observableGeneralStore;
  return (
    <View>
      <Text>{text}</Text>
      <Button
        containerStyle={styles.button}
        title="Add Expense and move to list"
        onPress={() => setIsTabState({ ...tabState, index: 1 })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  button: {
    marginTop: 20,
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});

export default observer(AddExpenses);
