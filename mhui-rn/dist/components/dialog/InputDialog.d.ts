import PropTypes from 'prop-types';
import React from 'react';
import { ConfigContext } from '../configProvider';
declare class InputDialog extends React.Component {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment" | "media"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    context: React.ContextType<typeof ConfigContext>;
    static propTypes: {
        animationType: PropTypes.Requireable<string>;
        visible: PropTypes.Requireable<boolean>;
        type: PropTypes.Requireable<string>;
        color: PropTypes.Requireable<string>;
        title: PropTypes.Requireable<string>;
        dialogStyle: PropTypes.Requireable<object>;
        extra: PropTypes.Requireable<object>;
        underlineData: PropTypes.Requireable<PropTypes.InferProps<{
            useNewTheme: PropTypes.Requireable<boolean>;
            leftText: PropTypes.Requireable<string>;
            underlineText: PropTypes.Requireable<string>;
            onPress: PropTypes.Requireable<(...args: any[]) => any>;
            accessibilityLabel: PropTypes.Requireable<string | number>;
            accessibilityHint: PropTypes.Requireable<string | number>;
        }>>;
        inputs: PropTypes.Requireable<(PropTypes.InferProps<{
            placeholder: PropTypes.Requireable<string>;
            defaultValue: PropTypes.Requireable<string>;
            onChangeText: PropTypes.Requireable<(...args: any[]) => any>;
            textInputProps: PropTypes.Requireable<object>;
            accessibilityLabel: PropTypes.Requireable<string | number>;
            accessibilityHint: PropTypes.Requireable<string | number>;
        }> | null | undefined)[]>;
        checkboxData: PropTypes.Requireable<PropTypes.InferProps<{
            checked: PropTypes.Requireable<boolean>;
            text: PropTypes.Requireable<string>;
            accessibilityLabel: PropTypes.Requireable<string | number>;
            accessibilityHint: PropTypes.Requireable<string | number>;
        }>>;
        buttons: PropTypes.Requireable<(PropTypes.InferProps<{
            text: PropTypes.Requireable<string>;
            style: PropTypes.Requireable<any>;
            callback: PropTypes.Requireable<(...args: any[]) => any>;
            accessibilityLabel: PropTypes.Requireable<string | number>;
            accessibilityHint: PropTypes.Requireable<string | number>;
        }> | null | undefined)[]>;
        onModalShow: PropTypes.Requireable<(...args: any[]) => any>;
        onModalHide: PropTypes.Requireable<(...args: any[]) => any>;
        onDismiss: PropTypes.Requireable<(...args: any[]) => any>;
        accessible: PropTypes.Requireable<boolean>;
        isCorrect: PropTypes.Requireable<boolean>;
        inputWarnText: PropTypes.Requireable<string>;
        warnText: PropTypes.Requireable<string>;
        noInputDisButton: PropTypes.Requireable<boolean>;
        canDismiss: PropTypes.Requireable<boolean>;
        hasShade: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        type: string;
        color: string;
        underlineData: {};
        checkboxData: {};
        dialogStyle: {
            allowFontScaling: boolean;
            unlimitedHeightEnable: boolean;
            titleNumberOfLines: number;
            titleStyle: {};
        };
        buttons: {
            text: string;
        }[];
        inputs: {
            placeholder: string;
            defaultValue: string;
            textInputProps: {
                autoFocus: boolean;
            };
        }[];
        isCorrect: boolean;
        inputWarnText: string;
        warnText: string;
        noInputDisButton: boolean;
        canDismiss: boolean;
        hasShade: boolean;
    };
    static TYPE: {
        SIMPLE: string;
        UNDERLINE: string;
        CHECKBOX: string;
        BOTH: string;
    };
    constructor(props: any, context: any);
    UNSAFE_componentWillReceiveProps(props: any): void;
    componentDidUpdate(prevProps: any): void;
    processButton(props: any): void;
    process(props: any): void;
    isInputArrayEmpty(arr: any): boolean;
    _onChangeText(text: any, index: any): void;
    renderUpExtra(): JSX.Element | null;
    renderDownUnderline(): JSX.Element | null;
    renderWarnText(): JSX.Element;
    renderInputView(input: any, index: any): JSX.Element | null;
    renderInputGroup(): JSX.Element;
    renderDownExtra(): JSX.Element | null;
    render(): JSX.Element;
    _onDismiss(): void;
    onPressUnderlineText(): void;
    onPressCheckbox(): void;
}
export default InputDialog;
