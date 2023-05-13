import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { BottomModal, ModalContent } from 'react-native-modals';
import { COLORS } from '../constants/Colors';
import ButtonComponent from './ButtonComponent';

interface IPopUpInputProps {
  modalContent: React.ReactElement;
  modalTitle?: string;
}

const PopUpInput = (props: IPopUpInputProps) => {
  const { modalTitle = 'Modal Title', modalContent = null } = props;

  const [isVisible, setIsVisible] = useState(false);

  const onModalClose = () => setIsVisible(false);
  const openModal = () => setIsVisible(true);

  const onSubmit = () => {
    setIsVisible(false);
  };

  const renderModalHeader = () => {
    return (
      <View style={styles.modalHeaderContainer}>
        <View style={styles.modalLeftContentContainer}>
          <Text onPress={() => onModalClose()} style={styles.modalTitle}>
            {modalTitle}
          </Text>
        </View>
        <TouchableOpacity onPress={onSubmit}>
          <Text style={styles.modalSubmitText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <ButtonComponent title="Sowmynaraynan" onClick={openModal} />
      <BottomModal
        visible={isVisible}
        onTouchOutside={onModalClose}
        onSwipeOut={onModalClose}
        height={0.5}
        width={1}
        modalTitle={renderModalHeader()}
      >
        <ModalContent
          style={{
            flex: 1,
            backgroundColor: 'fff',
          }}
        >
          {modalContent}
        </ModalContent>
      </BottomModal>
    </>
  );
};

const styles = StyleSheet.create({
  modalHeaderContainer: {
    height: 45,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 24,
    paddingRight: 24,
  },
  modalLeftContentContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  modalTitle: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    color: COLORS.black,
  },
  modalSubmitText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    color: COLORS.submitText,
  },
});

export default PopUpInput;
