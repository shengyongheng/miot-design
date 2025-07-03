import PropTypes from 'prop-types';
import React from 'react';
declare class ChoiceDialog extends React.Component {
    static propTypes: {
        animationType: PropTypes.Requireable<string>;
        type: PropTypes.Requireable<any>;
        visible: PropTypes.Requireable<boolean>;
        options: PropTypes.Requireable<(PropTypes.InferProps<{
            title: PropTypes.Requireable<string>;
            subtitle: PropTypes.Requireable<string>;
            accessibilityLabel: PropTypes.Requireable<string | number>;
            accessibilityHint: PropTypes.Requireable<string | number>;
        }> | null | undefined)[]>;
        selectedIndexArray: PropTypes.Requireable<(number | null | undefined)[]>;
        color: PropTypes.Requireable<string>;
        icon: PropTypes.Requireable<number>;
        buttons: PropTypes.Requireable<(PropTypes.InferProps<{
            text: PropTypes.Requireable<string>;
            style: PropTypes.Requireable<any>;
            callback: PropTypes.Requireable<(...args: any[]) => any>;
        }> | null | undefined)[]>;
        title: PropTypes.Requireable<string>;
        dialogStyle: PropTypes.Requireable<object>;
        onSelect: PropTypes.Requireable<(...args: any[]) => any>;
        onDismiss: PropTypes.Requireable<(...args: any[]) => any>;
        onModalShow: PropTypes.Requireable<(...args: any[]) => any>;
        onModalHide: PropTypes.Requireable<(...args: any[]) => any>;
        canDismiss: PropTypes.Requireable<(...args: any[]) => any>;
        accessible: PropTypes.Requireable<boolean>;
        hasShade: PropTypes.Requireable<boolean>;
        itemStyleType: PropTypes.Requireable<number>;
    };
    static defaultProps: {
        useNewType: boolean;
        type: string;
        options: never[];
        selectedIndexArray: never[];
        dialogStyle: {
            allowFontScaling: boolean;
            unlimitedHeightEnable: boolean;
            titleStyle: {};
            itemTitleStyle: {};
            itemSubtitleStyle: {};
            itemTitleNumberOfLines: number;
            itemSubtitleNumberOfLines: number;
        };
        canDismiss: boolean;
        hasShade: boolean;
        itemStyleType: number;
    };
    static TYPE: {
        SINGLE: string;
        MULTIPLE: string;
    };
    constructor(props: any, context: any);
    UNSAFE_componentWillReceiveProps(newProps: any): void;
    _onPress(selected: any, index: any): void;
    _onDismiss(): void;
    render(): JSX.Element;
}
export default ChoiceDialog;
