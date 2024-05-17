import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  AuthErrorCodes,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import Toast from 'react-native-toast-message';
import { firebaseAuth } from '../firebase/firebase';
import { addDocument } from '../firebase/QueryUtils';
import { RootStackParamList } from '../types';
import { formatErrorMessage } from '../Utils/CommonUtils';

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
          uid: response.user.uid,
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
        const message = formatErrorMessage(error.code);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: message,
        });

        // console.error(error);
      });
  }

  googleSignIn() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
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
