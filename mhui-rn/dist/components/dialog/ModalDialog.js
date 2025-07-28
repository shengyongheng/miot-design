import React from 'react';
import { Modal } from 'react-native';
const ModalDialog = React.memo(props => {
  const {
    children,
    visible,
    animationType,
    onRequestClose
  } = props;
  return <Modal visible={visible} animationType={animationType} onRequestClose={onRequestClose} transparent>
      {children}
    </Modal>;
});
export default ModalDialog;