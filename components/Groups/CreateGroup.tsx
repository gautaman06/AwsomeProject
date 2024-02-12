import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/Colors';
import { API_STATUSCODE, CATEGORY_LIST } from '../../constants/constant';
import { addDocument } from '../../firebase/QueryUtils';
import store from '../../store';
import Icon from '../Icons/Icons';
import PopUpInput from '../PopUpInput';
import Switch from '../Switch';
import { TextInput } from '../Themed';

interface ICreateGroupsProps {
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  setGroupName: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  enabled: boolean;
  groupName: string;
}

export interface ICreateGroups {
  category: string;
  createdAt: number;
  debts: boolean;
  members: number;
  name: string;
  setteledUp: boolean;
  uid: string;
  users: string[];
}

interface IStatusProps {
  message: string;
  icon: string;
}

const renderModalContent = (props: ICreateGroupsProps) => {
  const { setEnabled, setGroupName, category, enabled, groupName, setCategory } = props;
  return (
    <View style={styles.render_content_conatiner}>
      <View style={styles.group_container}>
        <View style={styles.group_icon_container}>
          <Icon icon="group" />
        </View>
        <View style={styles.group_name_container}>
          <Text style={styles.group_name_header}>Group Name</Text>
          <TextInput
            focusable={false}
            style={styles.input}
            onChangeText={(value) => {
              setGroupName(value);
            }}
            value={groupName}
            placeholder=""
          />
        </View>
      </View>
      <View style={styles.simplify_debts_container}>
        <Text style={{ fontWeight: '600' }}>Enable Simplify Debts</Text>
        <Switch styles={styles.simplify_debts_toggle} value={enabled} onChangeValue={() => setEnabled(!enabled)} />
      </View>
      <Text style={styles.simplify_debts_description}>
        Simplifying debts doesn't change how much money everyone owes overall, it just makes it quicker for everyone to
        get paid back by reducing the number of payments.
      </Text>
      <View>
        <Text style={{ fontWeight: '600' }}>Select Category</Text>
        <View style={styles.category_list_container}>
          {CATEGORY_LIST.map((item) => {
            const isCategorySelected = item.name === category;
            return (
              <TouchableOpacity
                key={item.key}
                style={styles.category_item(isCategorySelected)}
                onPress={() => setCategory(item.name)}
              >
                <Icon icon={item.icon} />
                <Text style={styles.category_item_name(isCategorySelected)}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const StatusRender = (props: IStatusProps) => {
  const { icon, message } = props;
  return (
    <View style={styles.status_container}>
      <View style={styles.status_icon}>
        <Icon icon={icon} />
      </View>
      <Text style={{ color: COLORS.green }}>{message}</Text>
    </View>
  );
};

export const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [category, setCategory] = useState('Home');
  const { user } = store.generalStore;
  const { setGroupsList } = store.groupsStore;

  const [status, setStatus] = useState(10);

  console.log('enabled Gro ->', enabled, groupName, category);

  const onSubmit = () => {
    setStatus(API_STATUSCODE.LOADING);
    const payload: ICreateGroups = {
      debts: enabled,
      uid: user.uid,
      name: groupName,
      category: category,
      members: 0,
      createdAt: new Date().getTime(),
      setteledUp: false,
      users: [user.uid],
    };
    addDocument('groups', payload);
    setGroupsList(user.uid).then((response) => {
      if (response) {
        setStatus(response.status);
      }
    });
  };

  const modalContent = status ? (
    <StatusRender
      icon={status === API_STATUSCODE.LOADING ? 'loading' : 'success'}
      message={status === API_STATUSCODE.LOADING ? 'Group Created Successfully' : 'Group Creation in process ...'}
    />
  ) : (
    renderModalContent({ setEnabled, setGroupName, setCategory, category, enabled, groupName })
  );

  return (
    <PopUpInput
      onSubmitClick={() => onSubmit()}
      buttonTitle="Add"
      modalTitle="Create Group"
      closeTimeout={status === API_STATUSCODE.SUCCESS ? 9000 : 0}
      modalContent={modalContent}
    />
  );
};

const styles = StyleSheet.create<any>({
  input: {
    height: 26,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  render_content_conatiner: {
    marginTop: 31,
    gap: 12,
  },
  group_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  group_name_container: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    marginTop: 16,
  },
  group_name_header: {
    marginLeft: 12,
    color: COLORS.black,
    fontWeight: '600',
  },
  group_icon_container: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: COLORS.lightBlue,
    height: 62,
    width: 59,
    alignItems: 'center',
    justifyContent: 'center',
  },
  simplify_debts_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  simplify_debts_toggle: {
    marginLeft: 4,
    position: 'absolute',
    right: 16,
  },
  simplify_debts_description: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.lightGrey,
  },
  category_list_container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 22,
    marginTop: 20,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  category_item: (isSelected: boolean) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: 90,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    color: isSelected ? COLORS.lightBlue : COLORS.lightGrey,
    borderColor: isSelected ? COLORS.lightBlue : COLORS.lightGrey,
  }),
  category_item_name: (isSelected: boolean) => ({
    marginLeft: 4,
    fontWeight: isSelected ? '600' : '400',
  }),
  status_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    height: '100%',
  },
  // status_icon: {
  //   animation: 'spin 1.5s linear infinite',
  // },
  // '@keyframes spin': {
  //   '100%': {
  //     transform: [{ rotate: '360deg' }],
  //   },
  // },
});
