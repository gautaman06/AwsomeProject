import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import InputBox from '../../components/Input';
import { COLORS } from '../../constants/Colors';
import { updateDocument } from '../../firebase/QueryUtils';
import store from '../../store';

const Settings = () => {
  const {
    generalStore: { setAllUsers, user },
    groupsStore: { activeGroup, setActiveGroup, groups, setGroupsList },
  } = store;
  const [email, setEmaiId] = useState('');

  const addMember = () => {
    const addMemberCallBack = (users) => {
      const isUserAvailable = users.find((user) => user.emailId === email);
      setGroupsList(user.uid);
      setActiveGroup(groups.find((gorup) => gorup.id === activeGroup.id));
      if (isUserAvailable) {
        const isUserAlreadyAdded = activeGroup?.users.some((user) => user === isUserAvailable.uid);
        if (isUserAlreadyAdded) {
          Toast.show({
            type: 'info',
            position: 'bottom',
            text1: 'User already added in group',
          });
        } else {
          const users = [...activeGroup.users];
          users.push(isUserAvailable.uid);

          const payload = {
            ...activeGroup,
            users: users,
          };

          updateDocument('groups', activeGroup.id, payload);

          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'User added successfully',
          });
        }
      } else {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'User not available',
        });
      }
    };

    setAllUsers(addMemberCallBack);
  };

  return (
    <View style={settingsStyles.settings_container}>
      <View>
        <InputBox value={email} placeHolder="Enter Email ID" onChange={(value) => setEmaiId(value)} />
        <TouchableOpacity onPress={() => addMember()}>
          <View style={settingsStyles.add_button}>
            <Text style={settingsStyles.add_member}>Add Member</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default observer(Settings);

const settingsStyles = StyleSheet.create({
  settings_container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
  },
  add_button: {
    width: 'auto',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.darkRose,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  add_member: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
  },
});
