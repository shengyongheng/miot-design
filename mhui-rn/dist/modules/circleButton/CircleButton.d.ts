import { Component } from 'react';
import { ImageSourcePropType } from 'react-native';
import PropTypes from 'prop-types';
import { NOOP } from '../utils/fns';
interface Props {
    sizeLevel: 0 | 1 | 2 | 3;
    themeColor: string;
    offColor: string;
    disabled: boolean;
    showHighlight: boolean;
    selected: boolean;
    horizontal: boolean;
    onPress: () => void;
    title: string;
    icon: ImageSourcePropType;
    iconSelected: ImageSourcePropType;
    iconText: number | string;
    accessible: boolean;
    accessibilityLabel: string | number;
    accessibilityHint: string | number;
}
interface State {
    isPressing: boolean;
}
export default class CircleButton extends Component<Props, State> {
    static propTypes: {
        sizeLevel: PropTypes.Requireable<number>;
        themeColor: PropTypes.Requireable<any>;
        offColor: PropTypes.Requireable<any>;
        disabled: PropTypes.Requireable<boolean>;
        showHighlight: PropTypes.Requireable<boolean>;
        selected: PropTypes.Requireable<boolean>;
        horizontal: PropTypes.Requireable<boolean>;
        onPress: PropTypes.Requireable<(...args: any[]) => any>;
        title: PropTypes.Requireable<string>;
        titleIsTouchable: PropTypes.Requireable<boolean>;
        icon: PropTypes.Requireable<any>;
        iconSelected: PropTypes.Requireable<any>;
        iconText: PropTypes.Requireable<string | number>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
    };
    static defaultProps: {
        sizeLevel: number;
        themeColor: string;
        offColor: string;
        disabled: boolean;
        showHighlight: boolean;
        selected: boolean;
        horizontal: boolean;
        onPress: typeof NOOP;
        title: string;
        titleIsTouchable: boolean;
        icon: null;
        iconSelected: null;
        iconText: string;
    };
    state: {
        isPressing: boolean;
    };
    onPress: () => void;
    onPressIn: () => void;
    onPressOut: () => void;
    renderTouchableList(): JSX.Element;
    render(): JSX.Element;
}
export {};
