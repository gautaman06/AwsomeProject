import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { STATUSCODE } from '../../constants/constant';
import { convertHexToRGBA, expochTimetoDateConvertor } from '../../Utils/CommonUtils';
import Transaction from '../../assets/svg/transaction.svg';
import Left from '../assets/svg/left.svg';

interface IGroupCards {
  groupdetails: {
    name: string;
    time: number;
    status: boolean;
    members: number;
    debts: boolean;
    id: string;
  };
  onClick: () => void;
}

export const GroupCard = (props: IGroupCards) => {
  const { name, time, status, members, debts, id } = props.groupdetails;
  console.log('entred->', name, time, status, members, debts, id);
  return (
    <View style={{ width: '100%', padding: 10, borderColor: 'red' }} key={id}>
      {/* <Text style={groupCardStyles.name}>Hello</Text> */}
      <TouchableOpacity onPress={() => props.onClick()}>
        <View style={groupCardStyles.container}>
          <View style={groupCardStyles.details}>
            <Text style={groupCardStyles.name}>{name}</Text>
            <Text style={groupCardStyles.dateStatus}>{expochTimetoDateConvertor(time)}</Text>
            <Text style={groupCardStyles.dateStatus}>{STATUSCODE[status ? 10 : 200]}</Text>
          </View>
          <View style={groupCardStyles.bottomContainer}>
            <View style={groupCardStyles.memberContainer}>
              <Text style={groupCardStyles.memebersCount}>{members}</Text>
              <Text style={groupCardStyles.members}>Members</Text>
            </View>
            <View style={groupCardStyles.memberContainer}>
              <View style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                <Transaction stroke="#05B4FF" />
              </View>
              <Text style={groupCardStyles.simplifyDebts(debts)}>Simplify Debts</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const groupCardStyles = StyleSheet.create<any>({
  container: {
    display: 'flex',
    borderRadius: 10,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    height: 131,
    width: '100%',
    position: 'relative',
  },
  details: {
    alignItems: 'center',
    height: '100%',
    marginTop: 19,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    marginVertical: 5,
  },
  dateStatus: {
    color: '#B6B6B6',
    fontSize: 12,
    marginVertical: 5,
  },
  bottomContainer: {
    height: 27,
    width: '100%',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    bottom: 0,
    position: 'absolute',
    backgroundColor: convertHexToRGBA('#CDC9C9', 19),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    display: 'flex',
    paddingHorizontal: 10,
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  memebersCount: {
    fontSize: 14,
    fontWeight: '700',
    marginRight: 3,
  },
  members: {
    fontSize: 12,
    color: '#B6B6B6',
    marginLeft: 5,
  },
  simplifyDebts: (isSimplifyDebts: boolean) => ({
    fontSize: 12,
    marginLeft: 5,
    color: isSimplifyDebts ? '#05B4FF' : '#D9D9D9',
  }),
});
