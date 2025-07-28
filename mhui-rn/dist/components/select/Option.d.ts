import React from 'react';
import { ImageSourcePropType } from 'react-native';
export interface BaseOptionPropsType {
    disabled?: boolean;
    title: React.ReactText;
    value: string | number;
    color?: string;
    icon?: ImageSourcePropType;
    underlayColor?: string;
}
export interface OptionPropsType extends BaseOptionPropsType {
    optionIndex?: number;
    optionWidth?: number;
    optionHeight?: number;
    onPress?: (optionIndex?: number, value?: string | number) => void;
}
declare const Option: React.FC<OptionPropsType>;
export default Option;
