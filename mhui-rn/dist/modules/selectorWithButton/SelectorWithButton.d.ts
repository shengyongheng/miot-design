import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConfigContext } from '../../components/configProvider';
import { NOOP, log } from '../utils/fns';
export default class SelectorWithButton extends Component {
    static contextType: React.Context<Partial<Pick<import("../../components/configProvider").ConfigContextProps, "language" | "colorScheme" | "environment" | "media"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    context: React.ContextType<typeof ConfigContext>;
    static propTypes: {
        title: PropTypes.Requireable<string>;
        subtitle: PropTypes.Requireable<string>;
        items: PropTypes.Requireable<(PropTypes.InferProps<{
            icon: any;
            iconSelected: any;
            title: PropTypes.Requireable<string>;
            accessibilityLabel: PropTypes.Requireable<string | number>;
            accessibilityHint: PropTypes.Requireable<string | number>;
        }> | null | undefined)[]>;
        initSelectedIndexs: PropTypes.Requireable<any[]>;
        onSelected: PropTypes.Requireable<(...args: any[]) => any>;
        disabled: PropTypes.Requireable<boolean>;
        switchDisabled: PropTypes.Requireable<boolean>;
        alwaysShowSelectors: PropTypes.Requireable<boolean>;
        themeColor: PropTypes.Requireable<any>;
        multiple: PropTypes.Requireable<boolean>;
        minSelected: PropTypes.Requireable<number>;
        maxSelected: PropTypes.Requireable<number>;
        showSwitch: PropTypes.Requireable<boolean>;
        switchOn: PropTypes.Requireable<boolean>;
        onSwitch: PropTypes.Requireable<(...args: any[]) => any>;
        hasShadow: PropTypes.Requireable<boolean>;
        maxNumberInRow: PropTypes.Requireable<number>;
        hideTitleLeastNumber: PropTypes.Requireable<number>;
        isHorizontal: PropTypes.Requireable<boolean>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
    };
    static defaultProps: {
        title: string;
        subtitle: string;
        items: never[];
        initSelectedIndexs: number[];
        onSelected: typeof NOOP;
        disabled: boolean;
        switchDisabled: boolean;
        alwaysShowSelectors: boolean;
        themeColor: string;
        offColor: string;
        multiple: boolean;
        minSelected: number;
        maxSelected: number;
        showSwitch: boolean;
        switchOn: boolean;
        onSwitch: typeof log;
        hasShadow: boolean;
        maxNumberInRow: number;
        isHorizontal: boolean;
        hideTitleLeastNumber: number;
    };
    state: {
        selectedIndexs: number[];
    };
    select: (index: any) => null | undefined;
    getSizeLevel(items: any): 2 | 1 | 0;
    getSelectors: () => JSX.Element[];
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        selectedIndexs: any;
    } | null;
    onAccessibilityAction: ({ nativeEvent: { actionName } }: {
        nativeEvent: {
            actionName: any;
        };
    }) => void;
    render(): JSX.Element | null;
}
