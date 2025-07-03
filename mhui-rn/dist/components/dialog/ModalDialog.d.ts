import React from 'react';
export interface ModalDialogPropsType {
    animationType?: 'none' | 'slide' | 'fade';
    visible?: boolean;
    onRequestClose?: () => void;
    backgroundColor?: string;
    children?: React.ReactElement | Array<React.ReactElement> | null;
}
declare const ModalDialog: React.FC<ModalDialogPropsType>;
export default ModalDialog;
