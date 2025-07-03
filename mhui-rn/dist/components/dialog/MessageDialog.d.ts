import PropTypes from 'prop-types';
import React from 'react';
declare class MessageDialog extends React.Component {
    static propTypes: {
        animationType: PropTypes.Requireable<string>;
        visible: PropTypes.Requireable<boolean>;
        type: PropTypes.Requireable<string>;
        color: PropTypes.Requireable<string>;
        title: PropTypes.Requireable<string>;
        message: PropTypes.Requireable<string>;
        messageStyle: any;
        extraText: PropTypes.Requireable<string>;
        extra: PropTypes.Requireable<object>;
        buttons: PropTypes.Requireable<(object | null | undefined)[]>;
        dialogStyle: PropTypes.Requireable<object>;
        onModalShow: PropTypes.Requireable<(...args: any[]) => any>;
        onModalHide: PropTypes.Requireable<(...args: any[]) => any>;
        onDismiss: PropTypes.Requireable<(...args: any[]) => any>;
        modalStyle: PropTypes.Requireable<object>;
        canDismiss: PropTypes.Requireable<boolean>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
        hasShade: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        type: string;
        color: string;
        message: string;
        messageStyle: {};
        dialogStyle: {
            allowFontScaling: boolean;
            unlimitedHeightEnable: boolean;
            titleNumberOfLines: number;
            messageNumberOfLines: number;
            titleStyle: {};
            extraTextStyle: {};
        };
        canDismiss: boolean;
        extra: {};
        hasShade: boolean;
    };
    static TYPE: {
        SIMPLE: string;
        UNDERLINE: string;
        CHECKBOX: string;
        SUBTEXT: string;
    };
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment" | "media"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    constructor(props: any, context: any);
    UNSAFE_componentWillReceiveProps(props: any): void;
    process(props: any): void;
    renderExtra(): JSX.Element | null;
    render(): JSX.Element;
    _onDismiss(): void;
    onPressUnderlineText(): void;
    onPressCheckbox(): void;
}
export default MessageDialog;
