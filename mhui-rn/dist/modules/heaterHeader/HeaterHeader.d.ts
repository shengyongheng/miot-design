import { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
export default class HeaterHeader extends PureComponent {
    static propTypes: {
        title: PropTypes.Requireable<string>;
        showLargeTitle: PropTypes.Requireable<boolean>;
        subtitle: PropTypes.Requireable<string>;
        showSubtitle: PropTypes.Requireable<boolean>;
        unit: PropTypes.Requireable<string>;
        disabled: PropTypes.Requireable<boolean>;
        themeColor: PropTypes.Requireable<any>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
    };
    render(): JSX.Element | null;
}
export declare class Background extends Component {
    static propTypes: {
        on: PropTypes.Requireable<boolean>;
        themeColor: PropTypes.Requireable<any>;
        useAngel: PropTypes.Requireable<boolean>;
        angel: PropTypes.Requireable<number>;
        angelCenter: PropTypes.Requireable<object>;
        locations: PropTypes.Requireable<any[]>;
        colors: PropTypes.Requireable<any[]>;
    };
    static defaultProps: {
        on: boolean;
        themeColor: null;
        useAngel: boolean;
        angel: number;
        angelCenter: {
            x: number;
            y: number;
        };
        locations: number[];
        colors: string[];
    };
    getDots(): any[];
    render(): JSX.Element;
}
