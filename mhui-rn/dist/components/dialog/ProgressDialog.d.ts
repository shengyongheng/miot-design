import PropTypes from 'prop-types';
import React from 'react';
import { ConfigContext } from '../configProvider';
declare class ProgressDialog extends React.Component {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment" | "media"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    context: React.ContextType<typeof ConfigContext>;
    static propTypes: {
        animationType: PropTypes.Requireable<string>;
        visible: PropTypes.Requireable<boolean>;
        message: PropTypes.Requireable<string>;
        progress: PropTypes.Requireable<number>;
        color: PropTypes.Requireable<string>;
        unfilledColor: PropTypes.Requireable<string>;
        textColor: PropTypes.Requireable<string>;
        autoDismiss: PropTypes.Requireable<boolean>;
        dialogStyle: PropTypes.Requireable<object>;
        onModalShow: PropTypes.Requireable<(...args: any[]) => any>;
        onModalHide: PropTypes.Requireable<(...args: any[]) => any>;
        onDismiss: PropTypes.Requireable<(...args: any[]) => any>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityValue: PropTypes.Requireable<PropTypes.InferProps<{
            min: PropTypes.Requireable<number>;
            max: PropTypes.Requireable<number>;
            now: PropTypes.Requireable<number>;
            text: PropTypes.Requireable<string | number>;
        }>>;
        hasShade: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        progress: number;
        color: string;
        textColor: string;
        autoDismiss: boolean;
        dialogStyle: {
            allowFontScaling: boolean;
            messageNumberOfLines: number;
            messageStyle: {};
            progressTextStyle: {};
        };
        hasShade: boolean;
    };
    constructor(props: any, context: any);
    UNSAFE_componentWillReceiveProps(newProps: any): void;
    render(): JSX.Element;
    componentWillUnmount(): void;
}
export default ProgressDialog;
