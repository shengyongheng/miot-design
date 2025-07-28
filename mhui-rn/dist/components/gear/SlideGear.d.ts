import PropTypes from 'prop-types';
import React from 'react';
declare class SlideGear extends React.Component {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment" | "media"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    static propTypes: {
        type: PropTypes.Requireable<string>;
        options: PropTypes.Validator<any[]>;
        showEndText: PropTypes.Requireable<boolean>;
        containerStyle: PropTypes.Requireable<object>;
        blockStyle: PropTypes.Requireable<object>;
        minimumTrackTintColor: PropTypes.Requireable<string>;
        leftTextColor: PropTypes.Requireable<string>;
        leftTextOffColor: PropTypes.Requireable<string>;
        leftTextStyle: any;
        maximumTrackTintColor: PropTypes.Requireable<string>;
        rightTextColor: PropTypes.Requireable<string>;
        rightTextOffColor: PropTypes.Requireable<string>;
        rightTextStyle: any;
        value: PropTypes.Requireable<number>;
        disabled: PropTypes.Requireable<boolean>;
        onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
        onSlidingComplete: PropTypes.Validator<(...args: any[]) => any>;
        optionMin: PropTypes.Requireable<number>;
        optionMax: PropTypes.Requireable<number>;
        optionStep: PropTypes.Requireable<number>;
        contentType: PropTypes.Requireable<string>;
        colorRangeObject: PropTypes.Requireable<object>;
        colorTemRangeObject: PropTypes.Requireable<object>;
        allowFontScaling: PropTypes.Requireable<boolean>;
        numberOfLines: PropTypes.Requireable<number>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
    };
    static defaultProps: {
        type: string;
        options: never[];
        showEndText: boolean;
        containerStyle: {};
        blockStyle: {};
        minimumTrackTintColor: string;
        leftTextColor: string;
        leftTextOffColor: string;
        leftTextStyle: {};
        rightTextColor: string;
        rightTextOffColor: string;
        rightTextStyle: {};
        value: number;
        disabled: boolean;
        optionMin: number;
        optionMax: number;
        optionStep: number;
        contentType: string;
        colorRangeObject: {
            "0.00": string;
            "0.10": string;
            "0.20": string;
            "0.30": string;
            "0.40": string;
            "0.50": string;
            "0.60": string;
            "0.70": string;
            "0.80": string;
            "0.90": string;
            "1.00": string;
        };
        colorTemRangeObject: {
            "0.00": string;
            "0.50": string;
            "1.00": string;
        };
        allowFontScaling: boolean;
    };
    static TYPE: {
        CIRCLE: string;
        RECTANGLE: string;
    };
    static CONTENTTYPE: {
        NUM: string;
        COLOR: string;
        COLORTEM: string;
    };
    constructor(props: any, context: any);
    constructPanResponder(props: any): void;
    UNSAFE_componentWillReceiveProps(newProps: any): void;
    isSameArray(arr1: any, arr2: any): boolean;
    UNSAFE_componentWillMount(): void;
    getClosetIndex(moveX: any): any;
    getColorFromValue(value: any): number;
    getValueFromColor(colorValue: any): any;
    _onPanResponderGrant(e: any): void;
    _onPanResponderRelease(e: any, gesture: any): void;
    getCorrectLayout(): {
        margin: number;
        blockWidth: any;
        blockHeight: number;
        containerHeight: any;
    };
    _onLayout(): void;
    calculateCoord(obj: any): void;
    getDragRange(callback: any): void;
    renderDraggable(): JSX.Element | null;
    renderBackground(): JSX.Element | null;
    renderRightText(): JSX.Element;
    onAccessibilityAction: ({ nativeEvent: { actionName } }: {
        nativeEvent: {
            actionName: any;
        };
    }) => void;
    accessbilittMockReleaseCallback: (gesture: any) => void;
    render(): JSX.Element | null;
}
export default SlideGear;
