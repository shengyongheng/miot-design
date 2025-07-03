import React from 'react';
import { ImageSourcePropType, GestureResponderEvent } from 'react-native';
import { IAccessibilityPropTypes } from '../../utils/accessibility-helper';
export interface CommonButtonPropsType {
    disabled?: boolean;
    title: string;
    titleColor?: string;
    titleFontSize?: number;
    titleFontFamily?: string;
    themeColor?: string;
    underlayColor?: string;
    width?: string | number;
    height?: string | number;
    borderRadius?: number;
    rightIcon?: ImageSourcePropType;
    accessible?: IAccessibilityPropTypes['accessible'];
    accessibilityLabel?: IAccessibilityPropTypes['accessibilityLabel'];
    accessibilityHint?: IAccessibilityPropTypes['accessibilityHint'];
    onPress?: (event: GestureResponderEvent) => void;
}
declare const CommonButton: React.FC<CommonButtonPropsType>;
export default CommonButton;
