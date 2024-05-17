import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/Colors';
import { DATE_FORMAT, STATUSCODE } from '../../constants/constant';
import { convertHexToRGBA, expochTimetoDateConvertor } from '../../Utils/CommonUtils';
import Icon from '../Icons/Icons';
interface IGroupCards {
  groupdetails: {
    name: string;
    time: number;
    status: number;
    members: number;
    debts: boolean;
    id: string;
  };
  onClick: () => void;
}

export const GroupCard = (props: IGroupCards) => {
  const { name, time, status, members, debts, id } = props.groupdetails;

  return (
    <View style={{ width: '100%', padding: 10, borderColor: 'red' }} key={id}>
      <TouchableOpacity onPress={() => props.onClick()}>
        <View style={groupCardStyles.container}>
          <View style={groupCardStyles.details}>
            <Text style={groupCardStyles.name}>{name}</Text>
            <Text style={groupCardStyles.dateStatus}>
              {expochTimetoDateConvertor(time, DATE_FORMAT.DD_MM_YYYY_HH_MM)}
            </Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <View style={groupCardStyles.circle(status)}></View>
              <Text style={groupCardStyles.dateStatus}>{STATUSCODE[status]}</Text>
            </View>
          </View>
          <View style={groupCardStyles.bottomContainer}>
            <View style={groupCardStyles.memberContainer}>
              <Text style={groupCardStyles.memebersCount}>{members}</Text>
              <Text style={groupCardStyles.members}>Members</Text>
            </View>
            <View style={groupCardStyles.memberContainer}>
              <View style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: 4 }}>
                <Icon icon="transaction" svgProps={{ stroke: debts ? '#05B4FF' : '#D9D9D9' }} />
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
  circle: (status) => ({
    height: 10,
    width: 10,
    // backgroundColor: '#bbb',
    borderRadius: 5,
    display: 'inline-block',
    backgroundColor: status == 200 ? COLORS.buttonGreen : COLORS.lightGrey,
  }),
});
