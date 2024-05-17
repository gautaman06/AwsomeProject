import { Dimensions } from 'react-native';

export const STATUSCODE = {
  200: 'Active',
  10: 'Setteld UP',
};

export const CATEGORY_LIST = [
  { key: 'trip', name: 'Trip', icon: 'trip' },
  { key: 'home', name: 'Home', icon: 'home' },
  { key: 'office', name: 'Office', icon: 'group' },
  { key: 'couple', name: 'Couple', icon: 'couple' },
  { key: 'others', name: 'Others', icon: 'couple' },
];

export enum API_STATUSCODE {
  SUCCESS = 200,
  FAILED = 500,
  LOADING = 10,
}

export enum DATE_FORMAT {
  DD_MM_YYYY_HH_MM,
  MM_DD_OBJECT,
}

export const DEFAULT_HEIGHT = 70;
export const DEFAULT_WIDTH = Dimensions.get('window').width * 0.9;
export const DEFAULT_BORDER_RRADIUS = DEFAULT_HEIGHT / 2;
export const DEFAULT_COMPLETE_THRESHOLD_PERCENTAGE = 70;
export const DEFAULT_GO_BACK_TO_START = false;
