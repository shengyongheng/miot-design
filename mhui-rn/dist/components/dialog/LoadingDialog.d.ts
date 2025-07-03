import PropTypes from 'prop-types';
import React from 'react';
import { ConfigContext } from '../configProvider';
declare class LoadingDialog extends React.Component {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment" | "media"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    context: React.ContextType<typeof ConfigContext>;
    static propTypes: {
        animationType: PropTypes.Requireable<string>;
        visible: PropTypes.Requireable<boolean>;
        cancelable: PropTypes.Requireable<boolean>;
        message: PropTypes.Requireable<string>;
        timeout: PropTypes.Requireable<number>;
        dialogStyle: PropTypes.Requireable<object>;
        onModalShow: PropTypes.Requireable<(...args: any[]) => any>;
        onModalHide: PropTypes.Requireable<(...args: any[]) => any>;
        onDismiss: PropTypes.Requireable<(...args: any[]) => any>;
        accessible: PropTypes.Requireable<boolean>;
        hasShade: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        cancelable: boolean;
        dialogStyle: {
            allowFontScaling: boolean;
            unlimitedHeightEnable: boolean;
            messageStyle: {};
        };
        hasShade: boolean;
    };
    constructor(props: any, context: any);
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(newProps: any): void;
    onShowView: () => void;
    render(): JSX.Element;
    componentWillUnmount(): void;
}
export default LoadingDialog;
