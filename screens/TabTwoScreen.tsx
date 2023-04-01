import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import { ModalContent, BottomModal, ModalTitle } from 'react-native-modals';
import ExpenseListCard from '../components/ExpenseListCard';

// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, TextInput, Button } from '../components/Themed';
import GeneralStore from '../store/General';
import observableGroupsStore from '../store/GroupsStore';

export const TabTwoScreen = (): JSX.Element => {
  const [number, onChangeNumber] = useState('');
  const [visisble, setIsvisible] = useState(false);

  const { setText, text } = GeneralStore;
  const { setListArray } = observableGroupsStore;

  useEffect(() => {
    setText(number);
    setListArray();
  }, [number]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}
      <Text style={styles.title}>Examples : Store text - {text}</Text>
      <SafeAreaView>
        <TextInput
          focusable={false}
          style={styles.input}
          onChangeText={(value) => {
            // setText(value);
            onChangeNumber(value);
          }}
          value={text}
          placeholder="Placeholder"
        />
        <Button containerStyle={styles.button} title="Save" onPress={() => setIsvisible(true)} />
        <Button
          containerStyle={styles.button}
          title="Cancel"
          isDanger
          onPress={() => Alert.alert('Cancel button pressed')}
        />
        <ExpenseListCard description="Briyani shop" name="Gautaman" isInvolved isLent amount={200} date="Mar 23" />
        <ExpenseListCard
          description="Train ticket"
          name="Jeeva"
          isInvolved={false}
          isLent={false}
          amount={200}
          date="Jun 23"
        />
        <ExpenseListCard
          description="Coffee shop"
          name="Sowmyanarayanan"
          isInvolved
          isLent={false}
          amount={200}
          date="Sep 23"
        />
        <BottomModal
          visible={visisble}
          onTouchOutside={() => setIsvisible(false)}
          height={0.5}
          width={1}
          onSwipeOut={() => setIsvisible(false)}
          modalTitle={<ModalTitle title="Bottom Modal" hasTitleBar />}
        >
          <ModalContent
            style={{
              flex: 1,
              backgroundColor: 'fff',
            }}
          >
            <Text style={styles.title}>Examples : Store text - {text}</Text>
          </ModalContent>
        </BottomModal>
      </SafeAreaView>
    </View>
  );
};

export default observer(TabTwoScreen);

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
