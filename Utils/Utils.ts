import { firebase } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

/**
 * It takes a table name as an argument, and returns an array of objects from the database
 * @param {string} table - the name of the table you want to get data from
 * @returns An array of objects.
 */
const getFirebaseData = async (table: string) => {
  const db = collection(firebase, table);
  const response = await getDocs(db);
  const data = response.docs.map((results) => ({ ...results.data(), id: results.id }));
  return data;
};

export { getFirebaseData };
