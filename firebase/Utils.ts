import { firebase } from './firebase';
import { collection, getDocs, doc, getDoc, where, query, WhereFilterOp } from 'firebase/firestore';
import { QUERY_OPERATORS } from './fireBaseConstants';

/**
 * This function retrieves data from a specified table in Firebase based on a user ID.
 * @param {string} table - The name of the collection in the Firebase Firestore database where the data
 * is stored.
 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier of
 * a user. It is used as a filter condition to retrieve data from the specified `table` in the Firebase
 * database.
 * @returns The `getGroupsData` function is returning an array of objects that represent the data of
 * all the documents in the specified `table` collection where the `uid` field is equal to the `userId`
 * parameter. Each object in the array has the document data and an `id` field that represents the
 * document ID. The function is using Firebase Firestore to query the database and it is an
 * asynchronous function
 */
const getGroupsData = async (table: string, userId: string) => {
  const db = collection(firebase, table);
  const response = await getDocs(query(db, where('uid', QUERY_OPERATORS.EQUAL as WhereFilterOp, userId)));
  const data = response.docs.map((results) => ({ ...results.data(), id: results.id }));
  return data;
};

/**
 * This function retrieves a list of expenses from a specified table in Firebase based on the user ID
 * and group ID.
 * @param {string} table - The name of the collection in the Firebase Firestore database where the
 * expense data is stored.
 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier of
 * a user. It is used as a filter condition in the Firestore query to retrieve expense data that
 * belongs to a specific user.
 * @param {string} groupId - The `groupId` parameter is a string that represents the unique identifier
 * of a group. It is used as a filter condition in the Firestore query to retrieve a list of expenses
 * associated with a specific group.
 * @returns The function `getExpenseList` is returning an array of objects that represent the expenses
 * of a user in a specific group. The objects contain the data of each expense and an `id` property
 * that represents the unique identifier of each expense in the database.
 */
const getExpenseList = async (table: string, userId: string, groupId: string) => {
  const db = collection(firebase, table);
  const queryConditions = query(
    db,
    where('uid', QUERY_OPERATORS.EQUAL as WhereFilterOp, userId),
    where('groupId', QUERY_OPERATORS.EQUAL as WhereFilterOp, groupId),
  );
  const response = await getDocs(queryConditions);
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

export { getGroupsData, getFirebaseDataById, getExpenseList };
