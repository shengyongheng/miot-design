/// <reference types="react" />
import { ViewStyle, TextStyle } from 'react-native';
import { IAccessibilityPropTypes } from '../../utils/accessibility-helper';
export interface ListItemPropsType {
    title?: string;
    subtitle?: string;
    value?: string;
    onPress?: (...args: any[]) => void;
    onLongPress?: (...args: any[]) => void;
    disabled?: boolean;
    showSeparator?: boolean;
    hideArrow?: boolean;
    showDot?: boolean;
    separator?: React.ReactElement;
    containerStyle?: ViewStyle;
    titleStyle?: TextStyle;
    subtitleStyle?: TextStyle;
    valueStyle?: TextStyle;
    dotStyle?: ViewStyle;
    allowFontScaling?: boolean;
    unlimitedHeightEnable?: boolean;
    titleNumberOfLines?: number;
    subtitleNumberOfLines?: number;
    valueNumberOfLines?: number;
    accessible?: IAccessibilityPropTypes['accessible'];
    accessibilityLabel?: IAccessibilityPropTypes['accessibilityLabel'];
    accessibilityHint?: IAccessibilityPropTypes['accessibilityHint'];
}
export declare type InputListItemType = 'checkbox' | 'button' | 'switch' | 'text' | 'date';
export interface StandardListItemPropsType extends ListItemPropsType {
    onChange?: (...args: any[]) => void;
}
export declare type ListItemWithChoiceType = 'stateless' | 'single' | 'multiple';
export interface ListItemWithChoicePropsType extends Omit<StandardListItemPropsType, 'value'> {
    value?: boolean;
    choiceType?: ListItemWithChoiceType;
}
export interface ListItemWithDatePickerPropsType extends Omit<StandardListItemPropsType, 'value'> {
    value?: string;
    dateType?: 'single' | 'time24' | 'time12' | 'date';
    dialogTitle?: string;
}
export interface ListItemWithInputDialogPropsType extends Omit<StandardListItemPropsType, 'value'> {
    value?: string;
    dialogTitle?: string;
}
export interface InputListItemPropsType extends Omit<ListItemWithChoicePropsType, 'value'>, Omit<ListItemWithDatePickerPropsType, 'value'>, Omit<StandardListItemPropsType, 'value'> {
    value?: string | boolean;
    type?: InputListItemType;
}
