import React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Button, Text, View } from '../components/Themed';
import { observer } from 'mobx-react';
import { RootTabScreenProps } from '../types';
import Left from '../assets/svg/refresh.svg';
import store from '../store';

export const HomeScreen = ({ navigation }: RootTabScreenProps<'Home'>): JSX.Element => {
  const { text } = store.generalStore;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Store Text : {text}</Text>
      <Text style={styles.title}>Home</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/HomeScreen.tsx" />
      <Left stroke="red" />
      <Button title="Expenses" onPress={() => navigation.navigate('Expenses')} />
    </View>
  );
};

export default observer(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
