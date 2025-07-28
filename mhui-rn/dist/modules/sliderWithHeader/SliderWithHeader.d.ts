import { Component } from 'react';
import PropTypes from 'prop-types';
import { log } from '../utils/fns';
export default class SliderWithHeader extends Component {
    static propTypes: {
        options: PropTypes.Requireable<any[]>;
        min: PropTypes.Requireable<number>;
        max: PropTypes.Requireable<number>;
        step: PropTypes.Requireable<number>;
        initValue: PropTypes.Requireable<number>;
        onSlidingChange: PropTypes.Requireable<(...args: any[]) => any>;
        onSlidingComplete: PropTypes.Requireable<(...args: any[]) => any>;
        disabled: PropTypes.Requireable<boolean>;
        switchDisabled: PropTypes.Requireable<boolean>;
        alwaysShowSelectors: PropTypes.Requireable<boolean>;
        themeColor: PropTypes.Requireable<any>;
        offColor: PropTypes.Requireable<any>;
        title: PropTypes.Requireable<string>;
        subtitle: PropTypes.Requireable<string>;
        contentType: PropTypes.Requireable<string>;
        showEndText: PropTypes.Requireable<boolean>;
        showSwitch: PropTypes.Requireable<boolean>;
        switchOn: PropTypes.Requireable<boolean>;
        onSwitch: PropTypes.Requireable<(...args: any[]) => any>;
        hasShadow: PropTypes.Requireable<boolean>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
        sliderAccessibilityLabel: PropTypes.Requireable<string | number>;
        sliderAccessibilityHint: PropTypes.Requireable<string | number>;
    };
    static defaultProps: {
        options: never[];
        min: number;
        max: number;
        step: number;
        initValue: number;
        onSlidingChange: typeof log;
        onSlidingComplete: typeof log;
        disabled: boolean;
        switchDisabled: boolean;
        alwaysShowSelectors: boolean;
        themeColor: string;
        offColor: string;
        title: string;
        subtitle: string;
        contentType: string;
        showEndText: boolean;
        showSwitch: boolean;
        switchOn: boolean;
        onSwitch: typeof log;
        hasShadow: boolean;
    };
    onSlidingChange: (v: any) => void;
    onSlidingComplete: (v: any) => void;
    onAccessibilityAction: ({ nativeEvent: { actionName } }: {
        nativeEvent: {
            actionName: any;
        };
    }) => void;
    showSelector(): boolean;
    minimumTrackTintColor(): any;
    render(): JSX.Element | null;
}
