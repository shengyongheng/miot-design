import PropTypes from 'prop-types';
import React from 'react';
declare class ListItem extends React.Component {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment" | "media"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    static propTypes: {
        title: PropTypes.Validator<string>;
        subtitle: PropTypes.Requireable<string>;
        value: PropTypes.Requireable<string>;
        onPress: PropTypes.Validator<(...args: any[]) => any>;
        onLongPress: PropTypes.Requireable<(...args: any[]) => any>;
        disabled: PropTypes.Requireable<boolean>;
        showSeparator: PropTypes.Requireable<boolean>;
        hideArrow: PropTypes.Requireable<boolean>;
        showDot: PropTypes.Requireable<boolean>;
        separator: PropTypes.Requireable<PropTypes.ReactElementLike>;
        containerStyle: PropTypes.Requireable<object>;
        titleStyle: PropTypes.Requireable<object>;
        subtitleStyle: PropTypes.Requireable<object>;
        valueStyle: PropTypes.Requireable<object>;
        dotStyle: PropTypes.Requireable<object>;
        allowFontScaling: PropTypes.Requireable<boolean>;
        unlimitedHeightEnable: PropTypes.Requireable<boolean>;
        titleNumberOfLines: PropTypes.Requireable<number>;
        subtitleNumberOfLines: PropTypes.Requireable<number>;
        valueNumberOfLines: PropTypes.Requireable<number>;
        underlayColor: PropTypes.Requireable<string>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
    };
    static defaultProps: {
        title: string;
        subtitle: string;
        value: string;
        onPress: () => void;
        onLongPress: () => void;
        disabled: boolean;
        showSeparator: boolean;
        hideArrow: boolean;
        showDot: boolean;
        containerStyle: {};
        titleStyle: {};
        subtitleStyle: {};
        valueStyle: {};
        dotStyle: {};
        unlimitedHeightEnable: boolean;
        allowFontScaling: boolean;
        leftIcon: null;
        useNewType: boolean;
        underlayColor: string;
    };
    constructor(props: any, context: any);
    onDimensionsChange: ({ window }: {
        window: any;
    }) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    renderSeparator(): any;
}
export default ListItem;
