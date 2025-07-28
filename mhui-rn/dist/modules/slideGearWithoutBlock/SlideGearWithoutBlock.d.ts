import PropTypes from 'prop-types';
import React from 'react';
export default class SlideGearWithoutBlock extends React.Component {
    static propTypes: {
        options: PropTypes.Validator<any[]>;
        showEndText: PropTypes.Requireable<boolean>;
        containerStyle: PropTypes.Requireable<object>;
        blockStyle: PropTypes.Requireable<object>;
        minimumTrackTintColor: PropTypes.Requireable<string>;
        leftTextColor: PropTypes.Requireable<string>;
        maximumTrackTintColor: PropTypes.Requireable<string>;
        rightTextColor: PropTypes.Requireable<string>;
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
        showEndImage: PropTypes.Requireable<boolean>;
        leftEndImage: PropTypes.Requireable<any>;
        rightEndImage: PropTypes.Requireable<any>;
        leftEndHighlightImage: PropTypes.Requireable<any>;
        rightEndHighlightImage: PropTypes.Requireable<any>;
        leftEndDisImage: PropTypes.Requireable<any>;
        rightEndDisImage: PropTypes.Requireable<any>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
    };
    static defaultProps: {
        options: never[];
        showEndText: boolean;
        containerStyle: {};
        blockStyle: {};
        minimumTrackTintColor: string;
        leftTextColor: string;
        maximumTrackTintColor: string;
        rightTextColor: string;
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
        showEndImage: string;
        leftEndImage: string;
        rightEndImage: string;
        leftEndHighlightImage: string;
        rightEndHighlightImage: string;
    };
    static CONTENTTYPE: {
        NUM: string;
        COLOR: string;
        COLORTEM: string;
    };
    constructor(props: any, context: any);
    constructPanResponder(props: any): void;
    componentWillReceiveProps(newProps: any): void;
    isSameArray(arr1: any, arr2: any): boolean;
    componentWillMount(): void;
    getClosetIndex(moveX: any): any;
    getColorFromValue(value: any): number;
    getValueFromColor(colorValue: any): any;
    _onPanResponderGrant(e: any, gesture: any): void;
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
    renderLeftText(): JSX.Element;
    renderRightText(): JSX.Element;
    onAccessibilityAction: ({ nativeEvent: { actionName } }: {
        nativeEvent: {
            actionName: any;
        };
    }) => void;
    accessbilittMockReleaseCallback: (gesture: any) => void;
    render(): JSX.Element | null;
}
