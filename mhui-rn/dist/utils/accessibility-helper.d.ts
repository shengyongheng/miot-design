import PropTypes from 'prop-types';
declare type AccessibilityRolesType = {
    [key in AccessibilityRole]: key;
};
export declare const AccessibilityRoles: AccessibilityRolesType;
declare type AccessibilityRole = 'none' | 'button' | 'link' | 'search' | 'image' | 'keyboardkey' | 'text' | 'adjustable' | 'imagebutton' | 'header' | 'summary' | 'alert' | 'checkbox' | 'combobox' | 'menu' | 'menubar' | 'menuitem' | 'progressbar' | 'radio' | 'radiogroup' | 'scrollbar' | 'spinbutton' | 'switch' | 'tab' | 'tablist' | 'timer' | 'toolbar';
export interface IAccessibilityPropTypes {
    accessible?: boolean;
    accessibilityRole?: AccessibilityRole;
    accessibilityLabel?: string;
    accessibilityHint?: string;
    accessibilityState?: {
        disabled?: boolean;
        selected?: boolean;
        checked?: boolean;
        busy?: boolean;
        expanded?: boolean;
    };
    accessibilityValue?: {
        min?: number;
        max?: number;
        now?: number;
        text?: string | number;
    };
    focusable?: boolean;
}
export declare const AccessibilityPropTypes: {
    accessible: PropTypes.Requireable<boolean>;
    accessibilityRole: PropTypes.Requireable<import("react-native").AccessibilityRole>;
    accessibilityLabel: PropTypes.Requireable<string | number>;
    accessibilityHint: PropTypes.Requireable<string | number>;
    accessibilityState: PropTypes.Requireable<PropTypes.InferProps<{
        disabled: PropTypes.Requireable<boolean>;
        selected: PropTypes.Requireable<boolean>;
        checked: PropTypes.Requireable<boolean>;
        busy: PropTypes.Requireable<boolean>;
        expanded: PropTypes.Requireable<boolean>;
    }>>;
    accessibilityValue: PropTypes.Requireable<PropTypes.InferProps<{
        min: PropTypes.Requireable<number>;
        max: PropTypes.Requireable<number>;
        now: PropTypes.Requireable<number>;
        text: PropTypes.Requireable<string | number>;
    }>>;
};
export declare function getAccessibilityConfig(accessibilityConfig: IAccessibilityPropTypes): IAccessibilityPropTypes;
export {};
