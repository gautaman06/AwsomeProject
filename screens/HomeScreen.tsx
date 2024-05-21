import React, { useEffect } from 'react';
import { StyleSheet, FlatList, Text } from 'react-native';

// import EditScreenInfo from '../components/EditScreenInfo';
import { View, Button } from '../components/Themed';
import { observer } from 'mobx-react';
import { RootTabScreenProps } from '../types';
import store from '../store';
import { CreateGroup } from '../components/Groups/CreateGroup';
import { GroupCard } from '../components/Groups/GroupCard';
import { authentication } from '../auth';

export const HomeScreen = ({ navigation }: RootTabScreenProps<'Groups'>): JSX.Element => {
  const {
    generalStore: { user, setAllUsers },
    groupsStore,
  } = store;
  const { setGroupsList, groups, setActiveGroup, activeGroup } = groupsStore;

  useEffect(() => {
    setGroupsList(user.uid);
    setAllUsers();
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
          status: item.setteledUp ? 10 : 200,
          members: item.members,
          debts: item.debts,
        }}
        onClick={() => {
          setActiveGroup(item).then((response) => {
            if (response) {
              navigation.navigate('Expenses');
            }
          });
        }}
      />
    );
  };

  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Store Text : {text}</Text>
      <Text style={styles.title}>Home</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/HomeScreen.tsx" /> */}
      {groups.length < 1 ? (
        <View style={styles.empty_container}>
          <Text>{`No Groups to show :(`}</Text>
        </View>
      ) : (
        <FlatList
          keyExtractor={(item) => item.id}
          data={groups}
          style={{ width: '100%', flex: 1 }}
          renderItem={renderItem}
        />
      )}
      <CreateGroup />
      <Button
        title="Expenses"
        onPress={
          () => authentication.signOutUser()
          // navigation.navigate('Expenses')
        }
      />
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
  empty_container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
  },
  // containerList: {
  //   flex: 1,
  //   width: '100%',w
  //   marginTop: StatusBar.currentHeight || 0,
  // },
});
