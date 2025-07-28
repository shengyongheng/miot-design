import PropTypes from 'prop-types';
import React, { Component } from 'react';
declare class GearCard extends Component {
    static propTypes: {
        cardType: PropTypes.Requireable<string>;
        title: PropTypes.Requireable<string>;
        subtitle: PropTypes.Requireable<string>;
        titleStyle: PropTypes.Requireable<object>;
        subtitleStyle: PropTypes.Requireable<object>;
        gearTextStyle: PropTypes.Requireable<object>;
        cardStyle: PropTypes.Requireable<object>;
        showSwitch: PropTypes.Requireable<boolean>;
        switchStyle: PropTypes.Requireable<object>;
        disabledSwitch: PropTypes.Requireable<boolean>;
        disabledGear: PropTypes.Requireable<boolean>;
        titleNumberOfLines: PropTypes.Requireable<number>;
        subtitleNumberOfLines: PropTypes.Requireable<number>;
        allowFontScaling: PropTypes.Requireable<boolean>;
        unlimitedHeightEnable: PropTypes.Requireable<boolean>;
        options: PropTypes.Requireable<any[]>;
        onSwitchValueChange: PropTypes.Requireable<(...args: any[]) => any>;
        switchValue: PropTypes.Requireable<boolean>;
        onTintColor: PropTypes.Requireable<string>;
        tintColor: PropTypes.Requireable<string>;
        onPress: PropTypes.Requireable<(...args: any[]) => any>;
        duration: PropTypes.Requireable<number>;
        currentIndex: PropTypes.Requireable<number>;
        sliderProps: PropTypes.Requireable<object>;
        sliderStyle: PropTypes.Requireable<object>;
        onSliderValueChange: PropTypes.Requireable<(...args: any[]) => any>;
        onSlidingComplete: PropTypes.Requireable<(...args: any[]) => any>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
        maxDotShowCount: PropTypes.Requireable<number>;
        onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
        optionGearBackgroundColor: PropTypes.Requireable<string>;
        animatedGearBackgroundColor: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        cardType: string;
        duration: number;
        currentIndex: number;
        showSwitch: boolean;
        titleNumberOfLines: number;
        subtitleNumberOfLines: number;
        unlimitedHeightEnable: boolean;
        allowFontScaling: boolean;
        disabledSwitch: boolean;
        disabledGear: boolean;
        sliderProps: {
            value: number;
            showDots: number;
            showEndText: boolean;
        };
        maxDotShowCount: number;
    };
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment" | "media"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    static CARD_TYPE: {
        TAB: string;
        SLIDER: string;
        DOT: string;
    };
    constructor(props: any);
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: any): void;
    getCorrectLayout(props: any): void;
    renderUpView(): JSX.Element | null;
    renderAnimatedView(): JSX.Element;
    renderGear(): JSX.Element;
    onPressButton: (index: any) => void;
    AnimatedMoveGreenTab(index: any): void;
    getLeftInterpolate(): {
        inputRange: number[];
        outputRange: any[];
    };
    renderInnerView(): JSX.Element;
    render(): JSX.Element | null;
    _onSliderValueChange(value: any): void;
    onAccessibilityAction: ({ nativeEvent: { actionName } }: {
        nativeEvent: {
            actionName: any;
        };
    }) => void;
}
export default GearCard;
