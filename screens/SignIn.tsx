import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Button } from '../components/Themed';
import { authentication } from '../auth';

const SignIn = () => {
  const [mailId, setMailId] = useState('');
  const [password, setPassword] = useState('');

  const OnSignIn = () => {
    authentication.signInWithEmailId(mailId, password);
  };

  const onLogin = () => {
    authentication.loginWithEmailId(mailId, password);
  };

  return (
    <View>
      <TextInput
        focusable={false}
        style={styles.input}
        onChangeText={(emailId) => {
          setMailId(emailId);
        }}
        value={mailId}
        placeholder="Placeholder"
      />
      <TextInput
        focusable={false}
        style={styles.input}
        onChangeText={(pass) => {
          setPassword(pass);
        }}
        value={password}
        placeholder="Placeholder"
      />
      <Button title="Sign In" onPress={OnSignIn} />
      <Button title="Login" onPress={onLogin} />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    marginTop: 20,
  },
});
