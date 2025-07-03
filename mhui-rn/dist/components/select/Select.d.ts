import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { CommonButtonPropsType } from '../button/CommonButton';
import { BaseOptionPropsType, OptionPropsType } from './Option';
export declare type SelectRecordType = {
    isMount: boolean;
    lastOptionIdx?: number;
};
export interface SelectPropsType extends Omit<CommonButtonPropsType, 'title'> {
    initialOptionValue?: string;
    initialOptionIndex: number;
    selectedColor?: string;
    selectedIcon?: ImageSourcePropType;
    optionWidth?: number;
    optionHeight?: number;
    options?: Array<BaseOptionPropsType>;
    onSelectChange?: (optionIndex: number, optionValue: string | number) => void;
    children?: Array<React.ReactElement<OptionPropsType>>;
}
declare const Select: React.FC<SelectPropsType>;
export default Select;
