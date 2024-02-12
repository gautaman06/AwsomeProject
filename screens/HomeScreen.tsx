import React, { useEffect } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, FlatList } from 'react-native';

// import EditScreenInfo from '../components/EditScreenInfo';
import { View, Button, Text } from '../components/Themed';
import { observer } from 'mobx-react';
import { RootTabScreenProps } from '../types';
import store from '../store';
import { GroupCard } from '../components/Groups/GroupCard';
import { toJS } from 'mobx';
import PopUpInput from '../components/PopUpInput';
import Vector from '../assets/svg/Vector.svg';
import Trip from '../assets/svg/trip.svg';
import Home from '../assets/svg/home.svg';
import Couple from '../assets/svg/couple.svg';
import { CreateGroup } from '../components/Groups/CreateGroup';
import { addDocument } from '../firebase/QueryUtils';

export const HomeScreen = ({ navigation }: RootTabScreenProps<'TabOne'>): JSX.Element => {
  const {
    generalStore: { user },
    groupsStore,
  } = store;
  const { setGroupsList, groups, setActiveGroup, activeGroup } = groupsStore;

  useEffect(() => {
    setGroupsList(user.uid);
    if (activeGroup) {
      setActiveGroup(null);
    }
  }, []);

  const Item = ({ item }) => {
    return (
      <GroupCard
        groupdetails={{
          id: item.id,
          name: item.name,
          time: item.createdAt,
          status: item.setteledUp,
          members: item.members,
          debts: item.debts,
        }}
        onClick={() => {
          setActiveGroup(item);
          navigation.navigate('Expenses');
        }}
      />
    );
  };

  const renderItem = ({ item }) => <Item item={item} />;

  const renderModalContent = () => {
    return (
      <>
        <CreateGroup />
      </>
    );
  };

  console.log('home->', activeGroup);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Store Text : {text}</Text>
      <Text style={styles.title}>Home</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/HomeScreen.tsx" /> */}
      <FlatList
        keyExtractor={(item) => item.id}
        data={groups}
        style={{ width: '100%', flex: 1 }}
        renderItem={renderItem}
      />
      <CreateGroup />
      <Button title="Expenses" onPress={() => navigation.navigate('Expenses')} />
    </View>
  );
};

export default observer(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
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
  // containerList: {
  //   flex: 1,
  //   width: '100%',w
  //   marginTop: StatusBar.currentHeight || 0,
  // },
});
