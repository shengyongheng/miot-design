import React from 'react';
import { ViewStyle } from 'react-native';
import { IAccessibilityPropTypes } from '../../utils/accessibility-helper';
import { ConfigContext } from '../configProvider';
import { PopButtonProps } from '@components/popButton/PopButton';
export interface AbstractDialogButtonType extends PopButtonProps {
    style?: ViewStyle;
    text?: string;
    numberOfLines?: number;
    callback?: (...args: any[]) => any;
}
export interface AbstractDialogPropsType {
    animationType?: string;
    visible?: boolean;
    cancelable?: boolean;
    title?: string;
    subtitle?: string;
    showTitle?: boolean;
    showSubtitle?: boolean;
    canDismiss?: boolean;
    buttons?: Array<AbstractDialogButtonType>;
    showButton?: boolean;
    dialogStyle?: {
        unlimitedHeightEnable?: boolean;
        allowFontScaling?: boolean;
        titleNumberOfLines?: number;
        subTitleNumberOfLines?: number;
        titleStyle?: ViewStyle;
        subTitleStyle?: ViewStyle;
    };
    onModalHide?: () => void;
    onModalShow?: () => void;
    onDismiss?: () => void;
    accessible?: IAccessibilityPropTypes['accessible'];
    accessibilityLabel: IAccessibilityPropTypes['accessibilityLabel'];
    layerDismissAccessibilityHint: IAccessibilityPropTypes['accessibilityHint'];
    useNewTheme?: boolean;
    hasShade?: boolean;
}
interface AbstractDialogState {
    visible?: boolean;
}
declare class AbstractDialog extends React.Component<AbstractDialogPropsType, AbstractDialogState> {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment" | "media"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    context: React.ContextType<typeof ConfigContext>;
    static defaultProps: {
        animationType: string;
        visible: boolean;
        cancelable: boolean;
        showTitle: boolean;
        showSubtitle: boolean;
        dialogStyle: {
            unlimitedHeightEnable: boolean;
            allowFontScaling: boolean;
            titleNumberOfLines: number;
            subTitleNumberOfLines: number;
            titleStyle: {};
            subTitleStyle: {};
        };
        canDismiss: boolean;
        buttons: null;
        showButton: boolean;
        hasShade: boolean;
        useNewTheme: boolean;
    };
    constructor(props: any, context: any);
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(newProps: any): void;
    componentDidUpdate(prevProps: AbstractDialogPropsType, prevState: AbstractDialogState): void;
    _checkUnlimitedHeightEnable(): boolean;
    renderTitle(): JSX.Element | null;
    renderContent(): {};
    renderButtonGroup(): JSX.Element | null;
    renderOneButton(buttons: any): JSX.Element | null;
    renderTwoButtons(buttons: any): JSX.Element | null;
    render(): JSX.Element;
    dismiss(): void;
    layerDismiss(): void;
    renderOneButtonDeprecated(buttons: any): JSX.Element | null;
    renderTwoButtonsDeprecated(buttons: any): JSX.Element | null;
}
export default AbstractDialog;
