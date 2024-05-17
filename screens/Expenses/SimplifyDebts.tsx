import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import Icon from '../../components/Icons/Icons';
import store from '../../store';
import { formatTransactionHistory } from '../../Utils/SimplifyDebts';
import { Text, View } from '../../components/Themed';

interface ISimplifyDebtProps {
  tabState: any;
}

const SimplifyDebts = (props: ISimplifyDebtProps) => {
  const { tabState } = props;

  const isSimplifyDebtsActive = tabState.routes[tabState.index].key === 'simplifyDebts';

  if (!isSimplifyDebtsActive) {
    return null;
  }

  const { expenseList } = store.expenseStore;

  const simplifyDebtsTransaction = formatTransactionHistory(expenseList);

  console.log(simplifyDebtsTransaction);

  const DebtsCard = ({ item }) => {
    const { debtor, amount } = item;
    console.log(debtor);
    return (
      <View key={`key_${item.debtor}`} style={styles.debts_card_constainer}>
        <Text>{debtor}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          <Icon icon="payment-pending" />
          <Icon icon="success" svgProps={{ width: 20, height: 20 }} />
          <Text style={{ color: '#B6B6B6', fontSize: 12 }}>Pending</Text>
        </View>

        <Text style={{ right: 10 }}>₹{amount}</Text>
        {/* <View style={styles.amount_payment}></View> */}
      </View>
    );
  };

  const renderItem = ({ item }) => <DebtsCard item={item} />;

  return (
    <View style={{ padding: 20 }}>
      <View style={styles.my_debts_container}>
        {/* <CircularProgress
          radius={50}
          value={200}
          duration={3000}
          progressValueColor={'#0D8B21'}
          circleBackgroundColor={'#EEF8ED'}
          // valuePrefix={'₹'}
          maxValue={200}
          activeStrokeColor={'#A1E396'}
          inActiveStrokeColor={'#EEF8ED'}
          inActiveStrokeWidth={2}
          activeStrokeWidth={2}
          // titleColor={'red'}
          // titleFontSize={12}
          // titleStyle={{ fontWeight: '100' }}
        />
        <CircularProgress
          value={500}
          radius={50}
          duration={3000}
          progressValueColor={'#B73161'}
          circleBackgroundColor={'#F5EDF5'}
          maxValue={500}
          inActiveStrokeWidth={2}
          activeStrokeWidth={2}
          // valuePrefix={'₹'}
          inActiveStrokeColor={'#F5EDF5'}
          activeStrokeColor={'#EFC0F0'}
        />
        <CircularProgress
          value={100}
          radius={50}
          duration={3000}
          progressValueColor={'#FFFFFF'}
          circleBackgroundColor={'#35C44C'}
          maxValue={100}
          // valuePrefix={'₹'}
          inActiveStrokeColor={'#F9F9F9'}
          inActiveStrokeWidth={2}
          activeStrokeWidth={2}
        /> */}
      </View>
      <FlatList keyExtractor={(item) => item.id} data={simplifyDebtsTransaction} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  my_debts_container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    borderColor: '#B6B6B6',
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'space-between',
  },
  debts_card_constainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#B6B6B6',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  amount_payment: {
    display: 'flex',
    flexDirection: 'row',
    right: 5,
    alignItems: 'center',
    gap: 5,
    position: 'absolute',
  },
});

export default SimplifyDebts;
