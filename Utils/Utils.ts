import { firebase } from '../firebase/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

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

/**
 * It returns a promise that resolves to the data of a document in a Firestore collection
 * @param {string} table - string - the name of the table you want to get data from
 * @param {string} id - the id of the document you want to get
 */
const getFirebaseDataById = async (table: string, id: string) => {
  const db = doc(firebase, table, id);
  const docSnap = await getDoc(db);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
  }
};

export { getFirebaseData, getFirebaseDataById };
