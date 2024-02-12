import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  AuthErrorCodes,
  updateProfile,
} from 'firebase/auth';
import Toast from 'react-native-toast-message';
import { firebaseAuth } from '../firebase/firebase';
import { addDocument } from '../firebase/QueryUtils';
import { RootStackParamList } from '../types';

interface AuthEventError {
  code: string;
  message: string;
}

export default class Authentication {
  /*
   * signup - create new user
   */
  signInWithEmailId(
    emailId: string,
    password: string,
    username: string,
    navigation: NativeStackNavigationProp<RootStackParamList, 'SignIn', undefined>,
  ) {
    createUserWithEmailAndPassword(firebaseAuth, emailId, password)
      .then((response) => {
        if (response.user) {
          updateProfile(response.user, { displayName: username });
        }
        addDocument('users', {
          id: response.user.uid,
          name: response.user.displayName,
          emailId: response.user.email,
          status: 200,
        });
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: ` Welcome ${response.user.displayName}`,
          text2: 'User account created & signed in!',
        });
        navigation.navigate('Home');
        return response;
      })
      .catch((error: AuthEventError) => {
        if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: `${emailId} already in use!`,
          });
        }

        if (error.code === AuthErrorCodes.INVALID_EMAIL) {
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: `Emaid Invalid`,
          });
        }
        if (error.code === 'auth/missing-password') {
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: `Please Enter Password`,
          });
        }
        console.error('err', error);
      });
    return;
  }

  /** Login to existing user */
  loginWithEmailId(
    emailId: string,
    password: string,
    navigation: NativeStackNavigationProp<RootStackParamList, 'SignIn', undefined>,
  ) {
    signInWithEmailAndPassword(firebaseAuth, emailId, password)
      .then((response) => {
        console.log('successfully login', response);
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: ` Welcome ${response.user.displayName}`,
          text2: 'Logged In Successfully',
        });
        navigation.navigate('Home');
        return response;
      })
      .catch((error: AuthEventError) => {
        if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: `Invalid Password`,
          });
        }
        if (error.code === 'auth/invalid-email') {
          console.log('invalid email id');
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: `Invalid email`,
          });
        }
        console.error(error);
      });
  }

  /**
   * This function signs out a user from Firebase authentication and logs the response or any errors.
   */
  signOutUser() {
    signOut(firebaseAuth)
      .then((response) => {
        console.log('user has signed out', response);
      })
      .catch((error: AuthEventError) => {
        console.error(error);
      });
  }
}
