import React from 'react';
import { TextProps } from 'react-native';
export interface MHTextPropsType extends TextProps {
    text?: string;
}
declare const MemoText: React.MemoExoticComponent<(props: MHTextPropsType) => JSX.Element>;
export default MemoText;
