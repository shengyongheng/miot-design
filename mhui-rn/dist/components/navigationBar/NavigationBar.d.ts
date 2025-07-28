import PropTypes from 'prop-types';
import React, { Component } from 'react';
declare class NavigationBar extends Component {
    static propTypes: {
        type: PropTypes.Requireable<string>;
        useOrientation: PropTypes.Requireable<boolean>;
        style: PropTypes.Requireable<object>;
        left: PropTypes.Requireable<(PropTypes.InferProps<{
            key: PropTypes.Requireable<string>;
            onPress: PropTypes.Requireable<(...args: any[]) => any>;
            disable: PropTypes.Requireable<boolean>;
            accessible: PropTypes.Requireable<boolean>;
            accessibilityLabel: PropTypes.Requireable<string | number>;
            accessibilityHint: PropTypes.Requireable<string | number>;
        }> | null | undefined)[]>;
        right: PropTypes.Requireable<any[]>;
        title: PropTypes.Requireable<string>;
        subtitle: PropTypes.Requireable<string>;
        subtitleStyle: PropTypes.Requireable<PropTypes.InferProps<{
            fontFamily: PropTypes.Requireable<string>;
            fontSize: PropTypes.Requireable<number>;
            colorType: PropTypes.Requireable<string>;
            color: PropTypes.Requireable<string>;
        }>>;
        titleNumberOfLines: PropTypes.Requireable<number>;
        subtitleNumberOfLines: PropTypes.Requireable<number>;
        titleStyle: PropTypes.Requireable<PropTypes.InferProps<{
            fontSize: PropTypes.Requireable<number>;
            color: PropTypes.Requireable<string>;
        }>>;
        allowFontScaling: PropTypes.Requireable<boolean>;
        backgroundColor: PropTypes.Requireable<any>;
        onPressTitle: PropTypes.Requireable<(...args: any[]) => any>;
        accessible: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        type: string;
        left: never[];
        right: never[];
        subtitleStyle: {
            fontFamily: string;
            colorType: string;
            fontSize: number;
        };
        allowFontScaling: boolean;
        titleNumberOfLines: number;
        subtitleNumberOfLines: number;
        useOrientation: boolean;
        titleStyle: {
            fontSize: number;
        };
        containerStyle: {
            minHeight: undefined;
        };
    };
    static TYPE: {
        DARK: string;
        LIGHT: string;
    };
    static ICON: {
        ADD: string;
        BACK: string;
        CLOSE: string;
        COLLECT: string;
        DOWNLOAD: string;
        COMPLETE: string;
        DELETE: string;
        DETAIL: string;
        MORE: string;
        NEXT: string;
        PROFILE: string;
        QR: string;
        SEARCH: string;
        SELECT_ALL: string;
        SELECTED_ALL: string;
        SETTING: string;
        SHARE: string;
        EDIT: string;
        RECORD: string;
        ORIENTATION: string;
        SAVE: string;
    };
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment" | "media"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    constructor(props: any, context: any);
    getIconsOfType(arr: any): any;
    renderIcons(arr: any): any;
    renderTitle(): JSX.Element;
    UNSAFE_componentWillReceiveProps(newProps: any): void;
    UNSAFE_componentWillMount(): void;
    updateStyleType(props: any, newProps: any): void;
    onDimensionsChange: ({ window, screen }: {
        window: any;
        screen: any;
    }) => void;
    componentDidMount(): void;
    render(): JSX.Element;
    componentWillUnMount(): void;
}
export default NavigationBar;
