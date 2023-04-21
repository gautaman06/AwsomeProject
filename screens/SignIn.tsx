import React, { useEffect, useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text } from '../components/Themed';
import { authentication } from '../auth';
import { RootStackScreenProps } from '../types';
import { firebaseAuth } from '../firebase/firebase';
import Toast from 'react-native-toast-message';

const SignIn = ({ navigation }: RootStackScreenProps<'SignIn'>) => {
  const [mailId, setMailId] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [authState, setAuthState] = useState('SignUp');

  const resetAll = () => {
    setMailId('');
    setPassword('');
    setUserName('');
  };

  useEffect(() => {
    resetAll();
  }, [authState]);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        Toast.show({
          type: 'success',
          text1: 'Logged in Successfully',
          position: 'bottom',
        });
        navigation.navigate('Home');
      }
    });
  }, []);

  const OnSignIn = () => {
    authentication.signInWithEmailId(mailId, password, userName, navigation);
  };

  const onLogin = () => {
    authentication.loginWithEmailId(mailId, password, navigation);
  };

  const isSignupDisabled = !mailId && !password && !userName;

  return (
    <View style={styles.container}>
      <TextInput
        focusable={false}
        style={styles.input}
        onChangeText={(emailId) => {
          setMailId(emailId);
        }}
        value={mailId}
        placeholder="Emaid ID"
      />
      {authState === 'SignUp' ? (
        <TextInput
          focusable={false}
          style={styles.input}
          onChangeText={(name) => {
            setUserName(name);
          }}
          value={userName}
          placeholder="User Name"
        />
      ) : null}
      <TextInput
        focusable={false}
        style={styles.input}
        onChangeText={(pass) => {
          setPassword(pass);
        }}
        value={password}
        placeholder="Password"
      />
      {authState === 'SignUp' ? (
        <Button
          color="#FFFFFF"
          backgroundColor="#5D6BE9"
          containerStyle={styles.button}
          title="Create New Account"
          onPress={OnSignIn}
          disabled={isSignupDisabled}
        />
      ) : (
        <Button
          containerStyle={styles.button}
          color="#FFFFFF"
          backgroundColor="#5D6BE9"
          title="Sign IN"
          onPress={onLogin}
        />
      )}
      <View style={styles.switch}>
        <Text>{authState === 'SignUp' ? 'Already a member ?' : 'New user ?'}</Text>
        <TouchableOpacity onPress={() => setAuthState(authState === 'SignUp' ? 'SignIn' : 'SignUp')}>
          <Text style={{ color: 'red' }}>{authState === 'SignUp' ? 'Sign in' : 'Sign up'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 46,
    margin: 12,
    borderWidth: 1,
    borderColor: '#B6B6B6',
    width: '100%',
    borderRadius: 6,
    padding: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#5D6BE9',
    width: 160,
    fontSize: 14,
    fontWeight: '700',
  },
  switch: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    gap: 4,
  },
});
