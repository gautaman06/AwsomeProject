import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { EXPENSELISTCARD_COLORS } from '../constants/Colors';
import { convertHexToRGBA } from '../Utils/CommonUtils';
import { View, Text } from './Themed';

interface IEpenseListCard {
  date: string;
  month: string;
  isLent: boolean;
  amount: number;
  isInvolved: boolean;
  name: string;
  description: string;
  amountTobeTransactioned: number;
  onClick: () => void;
}

/**
 * It takes in the styles object and two colors, and updates the styles object with the new colors
 * @param styles - The styles object that you want to update.
 * @param background - The background color of the card.
 * @param color - The color of the expense
 */
const updateStyles = (styles: typeof expensecardStyle, background: string, color: string) => {
  const containerBackgroundColor = convertHexToRGBA(background, 19);
  styles.container = {
    ...styles.container,
    backgroundColor: containerBackgroundColor,
    border: `1px solid ${containerBackgroundColor}`,
  };
  styles.dateStyle = {
    ...styles.dateStyle,
    color: color,
  };
  styles.leftexpenseColorIndicator = {
    ...styles.leftexpenseColorIndicator,
    backgroundColor: color,
  };
  styles.paidtype = {
    ...styles.paidtype,
    color: color,
  };
};

export const ExpenseListCard = (props: IEpenseListCard) => {
  const { date, isLent, amount, isInvolved, name, description, amountTobeTransactioned, month } = props;
  const styles = expensecardStyle;
  /* Updating the styles object with the new colors. */
  if (isLent) {
    updateStyles(styles, EXPENSELISTCARD_COLORS.LENT.background, EXPENSELISTCARD_COLORS.LENT.color);
  } else if (!isInvolved) {
    updateStyles(styles, EXPENSELISTCARD_COLORS.NOT_INVOLVED.background, EXPENSELISTCARD_COLORS.NOT_INVOLVED.color);
  } else {
    updateStyles(styles, EXPENSELISTCARD_COLORS.BORROWED.background, EXPENSELISTCARD_COLORS.BORROWED.color);
  }
  return (
    <View>
      <TouchableOpacity onPress={() => props.onClick()}>
        <View style={styles.container}>
          <View style={styles.leftexpenseColorIndicator} />
          <View style={styles.dateStyleContainer}>
            <Text style={styles.dateStyle}>{month}</Text>
            <Text style={styles.dateStyle}>{date}</Text>
          </View>
          <View style={styles.description_type_container}>
            <Text style={styles.description}>{description}</Text>
            {isInvolved && <Text style={styles.paidtype}>{`${isLent ? 'you' : name} paid ₹${amount}`}</Text>}
          </View>
          <View style={[styles.typeContainer, styles.absolute]}>
            <Text style={styles.paidtype}>
              {!isInvolved ? 'you are not involved' : `you ${isLent ? 'lent' : 'borrowed'}`}
            </Text>
            {isInvolved && <Text style={styles.paidtype}>{`₹${amountTobeTransactioned}`}</Text>}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default observer(ExpenseListCard);

const expensecardStyle = StyleSheet.create({
  container: {
    height: 53,
    width: 'auto',
    display: 'flex',
    backgroundColor: '',
    alignItems: 'center',
    flexDirection: 'row',
    opacity: 19,
    marginTop: 10,
    marginHorizontal: 8,
    borderRadius: 10,
    border: '',
  },
  leftexpenseColorIndicator: {
    height: 53,
    width: 9,
    backgroundColor: '',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  dateStyleContainer: {
    height: 41,
    width: 47,
    borderRadius: 6,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 8,
    gap: 2,
  },
  dateStyle: {
    fontSize: 12,
    color: '',
  },
  description_type_container: {
    backgroundColor: '',
    marginLeft: 8,
    gap: 5,
  },
  description: {
    fontSize: 14,
    fontWeight: '700',
  },
  paidtype: {
    color: '',
    fontSize: 12,
  },
  typeContainer: {
    backgroundColor: '',
    right: 12,
    gap: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  absolute: {
    position: 'absolute',
  },
  relative: {
    position: 'relative',
  },
});
