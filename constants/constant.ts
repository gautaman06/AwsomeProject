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
