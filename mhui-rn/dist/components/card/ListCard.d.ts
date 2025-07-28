import PropTypes from 'prop-types';
import React from 'react';
declare class ListCard extends React.Component {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment" | "media"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    static TYPE: {
        SWITCH: string;
        CHOICE: string;
        BUTTON: string;
        ARROW: string;
        NONE: string;
    };
    static CARD_RADIUS_TYPE: {
        ALL: string;
        NONE: string;
        TOP: string;
        BOTTOM: string;
    };
    static propTypes: {
        radiusType: PropTypes.Requireable<string>;
        type: PropTypes.Requireable<string>;
        title: PropTypes.Requireable<string>;
        subtitle: PropTypes.Requireable<string>;
        value: PropTypes.Requireable<string>;
        titleStyle: PropTypes.Requireable<object>;
        subtitleStyle: PropTypes.Requireable<object>;
        valueStyle: PropTypes.Requireable<object>;
        cardStyle: PropTypes.Requireable<object>;
        titleNumberOfLines: PropTypes.Requireable<number>;
        valueNumberOfLines: PropTypes.Requireable<number>;
        subtitleNumberOfLines: PropTypes.Requireable<number>;
        allowFontScaling: PropTypes.Requireable<boolean>;
        unlimitedHeightEnable: PropTypes.Requireable<boolean>;
        themeColor: PropTypes.Requireable<string>;
        onPress: PropTypes.Requireable<(...args: any[]) => any>;
        disabled: PropTypes.Requireable<boolean>;
        showSeparator: PropTypes.Requireable<boolean>;
        separator: PropTypes.Requireable<PropTypes.ReactElementLike>;
        buttonOption: PropTypes.Requireable<object>;
        choiceOption: PropTypes.Requireable<object>;
        onSwitchValueChange: PropTypes.Requireable<(...args: any[]) => any>;
        switchValue: PropTypes.Requireable<boolean>;
        onTintColor: PropTypes.Requireable<string>;
        tintColor: PropTypes.Requireable<string>;
        switchStyle: PropTypes.Requireable<object>;
        cardUnderlayColor: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        type: string;
        radiusType: string;
        themeColor: string;
        titleNumberOfLines: number;
        subtitleNumberOfLines: number;
        valueNumberOfLines: number;
        allowFontScaling: boolean;
        unlimitedHeightEnable: boolean;
        showSeparator: boolean;
        disabled: boolean;
    };
    constructor(props: any);
    renderIcon(): JSX.Element | null;
    renderText(): JSX.Element;
    renderRight(): JSX.Element | null;
    renderListCard(): JSX.Element;
    render(): JSX.Element;
    renderSeparator(): any;
    onAccessibilityAction: ({ nativeEvent: { actionName } }: {
        nativeEvent: {
            actionName: any;
        };
    }) => void;
}
export default ListCard;
