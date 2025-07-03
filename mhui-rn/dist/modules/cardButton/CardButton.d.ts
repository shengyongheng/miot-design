import { PureComponent } from 'react';
import { TextStyle, ViewStyle, ImageStyle, ImageSourcePropType } from 'react-native';
export interface Props {
    title: string;
    titleStyle: TextStyle;
    subtitle: string;
    subtitleStyle: TextStyle;
    containerStyle: ViewStyle;
    disabled: boolean;
    themeColor: string;
    offColor: string;
    themeBackgroundColor: string;
    underlayColor: string;
    hasShadow: boolean;
    iconContainerStyle: ViewStyle;
    iconStyle: ImageStyle;
    icon: ImageSourcePropType;
    iconDisabled: ImageSourcePropType;
    invisible: boolean;
    iconText: string;
    iconTextStyle: TextStyle;
    switchOn: boolean;
    rightText: string;
    rightArrow: boolean;
    onPress: () => void;
    onSwitch: (value: boolean) => void;
    accessible: any;
    accessibilityLabel: any;
    accessibilityHint: any;
}
export default class CardButton extends PureComponent<Props, null> {
    static defaultProps: {
        underlayColor: string;
        hasShadow: boolean;
    };
    onPress: () => void;
    onAccessibilityAction: ({ nativeEvent: { actionName } }: {
        nativeEvent: {
            actionName: any;
        };
    }) => void;
    render(): JSX.Element | null;
}
