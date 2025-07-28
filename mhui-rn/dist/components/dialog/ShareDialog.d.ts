import PropTypes from 'prop-types';
import React from 'react';
import { ConfigContext } from '../configProvider';
declare class ShareDialog extends React.Component {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment" | "media"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    context: React.ContextType<typeof ConfigContext>;
    static propTypes: {
        animationType: PropTypes.Requireable<string>;
        visible: PropTypes.Requireable<boolean>;
        title: PropTypes.Requireable<string>;
        dialogStyle: PropTypes.Requireable<object>;
        modalStyle: PropTypes.Requireable<object>;
        canDismiss: PropTypes.Requireable<boolean>;
        options: PropTypes.Requireable<(PropTypes.InferProps<{
            icon: PropTypes.Requireable<any>;
            text: PropTypes.Requireable<string>;
            callback: PropTypes.Requireable<(...args: any[]) => any>;
            accessibilityLabel: PropTypes.Requireable<string | number>;
            accessibilityHint: PropTypes.Requireable<string | number>;
        }> | null | undefined)[]>;
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
        checked: PropTypes.Requireable<boolean>;
        checkColor: PropTypes.Requireable<string>;
        extraText: PropTypes.Requireable<string>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
        hasShade: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        options: {
            icon: any;
            text: string;
            callback: () => void;
        }[];
        dialogStyle: {
            unlimitedHeightEnable: boolean;
            allowFontScaling: boolean;
            titleNumberOfLines: number;
            itemTextNumberOfLines: number;
        };
        canDismiss: boolean;
        checkColor: string;
        hasShade: boolean;
    };
    constructor(props: any, context: any);
    componentDidMount(): void;
    renderCheckBox(): JSX.Element;
    renderIcons(options: any, index: any): JSX.Element;
    renderIconsPages(options: any): JSX.Element;
    render(): JSX.Element;
    _onDismiss(): void;
    onPressCheckbox(): void;
}
export default ShareDialog;
