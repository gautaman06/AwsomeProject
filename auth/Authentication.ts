import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, AuthErrorCodes } from 'firebase/auth';

import { firebaseAuth } from '../firebase/firebase';

interface AuthEventError {
  code: string;
  message: string;
}
export default class Authentication {
  signInWithEmailId(emailId: string, password: string) {
    console.log('emailId', emailId);
    createUserWithEmailAndPassword(firebaseAuth, emailId, password)
      .then((response) => {
        console.log('User account created & signed in!', response);
        return response;
      })
      .catch((error: AuthEventError) => {
        if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
          console.log('That email address is already in use!');
        }

        if (error.code === AuthErrorCodes.INVALID_EMAIL) {
          console.log('That email address is invalid!');
        }
        console.error('err', error);
      });
    return;
  }

  loginWithEmailId(emailId: string, password: string) {
    signInWithEmailAndPassword(firebaseAuth, emailId, password)
      .then((response) => {
        console.log('successfully login', response);
        return response;
      })
      .catch((error: AuthEventError) => {
        if (error.code === AuthErrorCodes.INVALID_PASSWORD) [console.log('invalid password')];
        if (error.code === AuthErrorCodes.USER_DELETED) {
          console.log('invalid email id');
        }
        console.error(error);
      });
  }

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
