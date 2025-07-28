/// <reference types="react" />
import { ViewStyle } from 'react-native';
import { PopButtonProps } from '@components/popButton/PopButton';
import { IAccessibilityPropTypes } from '../../utils/accessibility-helper';
export interface AbstractDialogButtonType extends PopButtonProps {
    style?: ViewStyle;
    text?: string;
    numberOfLines?: number;
    callback?: (...args: any[]) => any;
}
export interface AbstractDialogPropsType {
    animationType?: 'none' | 'slide' | 'fade';
    visible?: boolean;
    title?: string;
    subtitle?: string;
    showTitle?: boolean;
    showSubtitle?: boolean;
    canDismiss?: boolean;
    buttons?: Array<AbstractDialogButtonType>;
    showButton?: boolean;
    dialogStyle?: {
        unlimitedHeightEnable?: boolean;
        allowFontScaling?: boolean;
        titleNumberOfLines?: number;
        subTitleNumberOfLines?: number;
        titleStyle?: ViewStyle;
        subTitleStyle?: ViewStyle;
    };
    onModalHide?: () => void;
    onModalShow?: () => void;
    onDismiss?: () => void;
    accessible?: IAccessibilityPropTypes['accessible'];
    useNewTheme?: boolean;
}
export declare type PopViewType = 'date' | 'input' | 'loading' | 'message' | 'choice' | 'modal';
export interface StandardDialogPropsType extends Omit<AbstractDialogPropsType, 'buttons'> {
    onOk?: (...args: any[]) => void;
    okText?: string;
    onCancel?: (...args: any[]) => void;
    cancelText?: string;
    backgroundColor?: string;
    children?: JSX.Element;
}
export interface PopViewComponentPropsType extends StandardDialogPropsType {
    name: string;
    popViewType?: PopViewType;
    onSelect?: (...args: any[]) => void;
    onDismiss?: () => void;
}
