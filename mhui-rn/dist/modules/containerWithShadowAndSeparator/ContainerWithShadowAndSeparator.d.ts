import React, { Component } from 'react';
import { ViewStyle } from 'react-native';
import PropTypes from 'prop-types';
interface Props {
    containerStyle: ViewStyle;
    separatorStyle: ViewStyle;
    horizontal: boolean;
    invisible: boolean;
}
interface State {
    width: number;
    height: number;
}
export default class ContainerWithShadowAndSeparator extends Component<Props, State> {
    static propTypes: {
        containerStyle: PropTypes.Requireable<any>;
        separatorStyle: PropTypes.Requireable<any>;
        horizontal: PropTypes.Requireable<boolean>;
        invisible: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        containerStyle: {};
        separatorStyle: {};
        horizontal: boolean;
        invisible: boolean;
    };
    state: {
        width: number;
        height: number;
    };
    getContents(): JSX.Element[] | null;
    onLayout: (e: any) => void;
    render(): React.ReactNode;
}
export {};
