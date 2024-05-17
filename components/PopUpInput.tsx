import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { BottomModal, ModalContent } from 'react-native-modals';
import { COLORS } from '../constants/Colors';
import ButtonComponent from './ButtonComponent';
import Icon from './Icons/Icons';
import { Button } from './Themed';

interface IPopUpInputProps {
  modalContent: React.ReactElement;
  modalTitle?: string;
  buttonTitle?: string;
  onSubmitClick?: () => void;
  onClose?: () => void;
  closeTimeout?: number;
  reset?: () => void;
  disableSubmit?: boolean;
  renderButtonComponent?: (openModal) => React.ReactElement;
  height?: number;
  isHideSubmit?: boolean;
}

const PopUpInput = (props: IPopUpInputProps) => {
  const {
    modalTitle = 'Modal Title',
    modalContent = null,
    buttonTitle,
    onSubmitClick,
    closeTimeout,
    reset,
    disableSubmit,
    renderButtonComponent = null,
    height,
    onClose,
    isHideSubmit = false,
  } = props;

  const [isVisible, setIsVisible] = useState(false);

  const onModalClose = () => {
    setIsVisible(false);
    onClose();
  };
  const openModal = () => setIsVisible(true);

  useEffect(() => {
    if (reset && !isVisible) {
      reset();
    }
  }, [isVisible]);

  const onSubmit = () => {
    onSubmitClick();
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  const renderModalHeader = () => {
    return (
      <View style={styles.modalHeaderContainer}>
        <View style={styles.modalLeftContentContainer}>
          <TouchableOpacity onPress={() => onModalClose()}>
            <Icon icon="close" />
          </TouchableOpacity>
          <Text onPress={() => onModalClose()} style={styles.modalTitle}>
            {modalTitle}
          </Text>
        </View>
        {isHideSubmit ? null : (
          <TouchableOpacity onPress={onSubmit} disabled={disableSubmit}>
            <Text style={styles.modalSubmitText(disableSubmit)}>Done</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <>
      {renderButtonComponent ? renderButtonComponent(openModal) : <Button title={buttonTitle} onPress={openModal} />}
      <BottomModal
        visible={isVisible}
        onTouchOutside={onModalClose}
        onSwipeOut={onModalClose}
        height={height || 0.5}
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

const styles = StyleSheet.create<any>({
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
    width: '100%',
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
    marginLeft: 10,
  },
  modalSubmitText: (disabled) => ({
    fontStyle: 'normal',
    fontWeight: disabled ? '400' : '700',
    fontSize: 14,
    color: disabled ? COLORS.disableText : COLORS.submitText,
  }),
});

export default PopUpInput;
