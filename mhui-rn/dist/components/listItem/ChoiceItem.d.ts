import PropTypes from 'prop-types';
import React from 'react';
export default class ChoiceItem extends React.Component {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment" | "media"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    static propTypes: {
        type: PropTypes.Requireable<string>;
        title: PropTypes.Requireable<string>;
        subtitle: PropTypes.Requireable<string>;
        selected: PropTypes.Requireable<boolean>;
        color: PropTypes.Requireable<string>;
        icon: PropTypes.Requireable<number>;
        onPress: PropTypes.Requireable<(...args: any[]) => any>;
        unlimitedHeightEnable: PropTypes.Requireable<boolean>;
        allowFontScaling: PropTypes.Requireable<boolean>;
        titleNumberOfLines: PropTypes.Requireable<number>;
        subtitleNumberOfLines: PropTypes.Requireable<number>;
        titleStyle: any;
        subtitleStyle: any;
        itemStyleType: PropTypes.Requireable<number>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
    };
    static defaultProps: {
        type: string;
        selected: boolean;
        color: string;
        icon: any;
        unlimitedHeightEnable: boolean;
        allowFontScaling: boolean;
        titleNumberOfLines: number;
        subtitleNumberOfLines: number;
        titleStyle: {};
        subtitleStyle: {};
        itemStyleType: number;
    };
    static TYPE: {
        STATELESS: string;
        SINGLE: string;
        MULTIPLE: string;
    };
    static ITEM_STYLE_TYPE_1: number;
    static ITEM_STYLE_TYPE_2: number;
    constructor(props: any, context: any);
    UNSAFE_componentWillReceiveProps(newProps: any): void;
    renderIcon(): JSX.Element | null;
    renderText(): JSX.Element;
    renderCheckbox(): JSX.Element | null;
    renderListByStyle(styleTpe: any, dialogType: any): JSX.Element;
    renderListItemStyle1(): JSX.Element;
    renderListItemStyle2(): JSX.Element;
    render(): JSX.Element;
    _onValueChange(selected: any): void;
    _onPress(): void;
}
