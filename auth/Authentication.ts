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
import { RootStackParamList } from '../types';

interface AuthEventError {
  code: string;
  message: string;
}
export default class Authentication {
  /**
   * This function signs in a user with their email, password, and username, creates a new user account
   * if one does not exist, and displays error messages if there are any issues with the sign-in
   * process.
   * @param {string} emailId - A string representing the email address of the user trying to sign in.
   * @param {string} password - The password parameter is a string that represents the password entered
   * by the user during the sign-in process.
   * @param {string} username - The username parameter is a string that represents the display name of
   * the user that is being created or updated. It is used to update the user's profile information
   * after they have successfully signed in or created an account.
   * @param navigation - The navigation parameter is of type NativeStackNavigationProp and is used for
   * navigating between screens in a React Native app. It is passed as a prop from the parent component
   * and is used to navigate to the 'Home' screen after the user has successfully signed in.
   * @returns Nothing is being returned explicitly from the `signInWithEmailId` function. However, it
   * returns `undefined` implicitly at the end of the function.
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

  /**
   * This function logs in a user with their email and password, displays a success message and
   * navigates to the home screen, or displays an error message if the email or password is invalid.
   * @param {string} emailId - A string representing the email address of the user trying to log in.
   * @param {string} password - The password parameter is a string that represents the user's password
   * for authentication.
   * @param navigation - The navigation parameter is of type NativeStackNavigationProp and is used for
   * navigating between screens in a React Native app. It is passed as a parameter to the
   * loginWithEmailId function and is used to navigate to the 'Home' screen after a successful login.
   */
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
