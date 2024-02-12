import { firebase } from './firebase';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  where,
  query,
  WhereFilterOp,
  addDoc,
  limit,
  orderBy,
} from 'firebase/firestore';
import { QUERY_OPERATORS } from './fireBaseConstants';

const addDocument = async (table, payload) => {
  await addDoc(collection(firebase, table), payload);
};

const getGroupsData = async (table: string, userId: string) => {
  const db = collection(firebase, table);
  const response = await getDocs(
    query(db, where('users', QUERY_OPERATORS.ARRAY_CONTAINS as WhereFilterOp, userId), orderBy('createdAt', 'desc')),
  );
  const data = response.docs.map((results) => ({ ...results.data(), id: results.id }));
  return data;
};

const getExpenseList = async (table: string, userId: string, groupId: string) => {
  const db = collection(firebase, table);
  const queryConditions = query(
    db,
    // where('uid', QUERY_OPERATORS.EQUAL as WhereFilterOp, userId),
    where('groupId', QUERY_OPERATORS.EQUAL as WhereFilterOp, groupId),
  );
  const response = await getDocs(queryConditions);
  const data = response.docs.map((results) => ({ ...results.data(), id: results.id }));
  return data;
};

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

const getUserDetailsByEmailId = async (emailId) => {
  const db = collection(firebase, 'users');
  const queryConditions = query(db, where('email', QUERY_OPERATORS.EQUAL as WhereFilterOp, emailId), limit(1));
  const response = await getDocs(queryConditions);
  const data = response.docs[0].data();
  return data;
};

const getListOfUsersById = async (userIds) => {
  const db = collection(firebase, 'users');
  const queryConditions = query(db, where('uid', QUERY_OPERATORS.IN as WhereFilterOp, userIds));
  const response = await getDocs(queryConditions);
  const data = response.docs.map((results) => ({ ...results.data(), id: results.id }));
  return data;
};

export { getGroupsData, getFirebaseDataById, getExpenseList, addDocument, getUserDetailsByEmailId, getListOfUsersById };
