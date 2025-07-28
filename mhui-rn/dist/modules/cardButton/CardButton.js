// @ts-nocheck

/* eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight, I18nManager } from 'react-native';
import { Icons } from "../../resources/Icons";
import Colors from "../../utils/Colors";
import { Switch } from "../../components/switch";
import { ContainerWithShadowAndSeparator } from "../containerWithShadowAndSeparator";
import { adjustSize } from "../utils/sizes";
import { FontSecondary, FontPrimary } from "../../constants/font";
import { AccessibilityRoles, getAccessibilityConfig } from "../../utils/accessibility-helper";
export default class CardButton extends PureComponent {
  static defaultProps = {
    underlayColor: 'rgba(0, 0, 0, 0.05)',
    hasShadow: true
  };
  onPress = () => {
    const {
      disabled,
      onPress
    } = this.props;

    if (typeof onPress === 'function' && !disabled) {
      onPress();
    }
  };
  onAccessibilityAction = ({
    nativeEvent: {
      actionName
    }
  }) => {
    const {
      disabled,
      onSwitch,
      switchOn,
      onPress
    } = this.props;

    if (disabled || !onSwitch && !onPress || actionName !== 'activate') {
      return;
    }

    if (onSwitch) {
      onSwitch(!switchOn);
      return;
    }

    onPress();
  };

  render() {
    const {
      containerStyle,
      themeColor,
      themeBackgroundColor,
      underlayColor,
      hasShadow,
      iconContainerStyle,
      iconStyle,
      icon,
      iconText,
      iconTextStyle,
      title,
      titleStyle,
      subtitle,
      subtitleStyle,
      onSwitch,
      switchOn,
      disabled,
      onPress,
      rightText,
      rightArrow,
      offColor,
      iconDisabled,
      invisible
    } = this.props;
    const opacity = disabled ? 0.3 : 1;
    let finalIcon = icon;

    if (disabled && iconDisabled) {
      finalIcon = iconDisabled;
    }

    if (!finalIcon && !iconText && !title && !subtitle && !onSwitch) {
      return null;
    }

    const Wrap = hasShadow ? ContainerWithShadowAndSeparator : Fragment;
    return <Wrap {...hasShadow ? {
      invisible
    } : {}}>
        <TouchableHighlight style={[Styles.container, containerStyle, themeBackgroundColor ? {
        backgroundColor: themeBackgroundColor
      } : null]} underlayColor={disabled || !onPress ? themeBackgroundColor || '#fff' : underlayColor} onPress={this.onPress} {...getAccessibilityConfig({
        accessible: this.props.accessible,
        accessibilityRole: onSwitch ? AccessibilityRoles.switch : AccessibilityRoles.button,
        accessibilityLabel: this.props.accessibilityLabel,
        accessibilityHint: this.props.accessibilityHint,
        accessibilityState: {
          disabled,
          checked: onSwitch && !!switchOn
        }
      })} accessibilityActions={[{
        name: 'activate'
      }]} onAccessibilityAction={this.onAccessibilityAction}>
          <Fragment>
            {finalIcon || iconText ? <View style={[Styles.iconContainer, iconContainerStyle, {
            backgroundColor: (!switchOn && offColor ? offColor : themeColor) || Colors.green,
            // 之前(switchOn ? themeColor : offColor) || ColorGreen好像有问题，换种写法
            opacity
          }]}>
                {finalIcon ? <Image style={[Styles.icon, iconStyle]} source={finalIcon} /> : <Text style={[Styles.iconText, iconTextStyle]}>{iconText}</Text>}
              </View> : null}
            <View style={[Styles.titleContainer, {
            opacity
          }]}>
              {title ? <Text style={[Styles.title, titleStyle]}>{title}</Text> : null}
              {subtitle ? <Text style={[Styles.subtitle, subtitleStyle]}>{subtitle}</Text> : null}
            </View>
            {onSwitch ? <View style={Styles.switchContainer}>
                <Switch value={switchOn} onValueChange={onSwitch} onTintColor={themeColor || Colors.green} disabled={disabled} {...getAccessibilityConfig({
              accessible: false
            })} />
              </View> : rightText || rightArrow ? <Fragment>
                {rightText ? <Text style={Styles.rightText}>{rightText}</Text> : null}
                {rightArrow ? <Image style={[Styles.rightArrow, {
              opacity
            }, {
              transform: [{
                scaleX: I18nManager.isRTL ? -1 : 1
              }]
            }]} source={Icons.rightArrow} /> : null}
              </Fragment> : null}
          </Fragment>
        </TouchableHighlight>
      </Wrap>;
  }

}
const Styles = StyleSheet.create({
  container: {
    height: adjustSize(240),
    paddingHorizontal: adjustSize(60),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  iconContainer: {
    marginRight: adjustSize(39),
    width: adjustSize(120),
    height: adjustSize(120),
    borderRadius: adjustSize(60),
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: adjustSize(72),
    height: adjustSize(72),
    resizeMode: 'contain'
  },
  iconText: {
    fontSize: adjustSize(60),
    color: '#fff',
    ...FontSecondary
  },
  titleContainer: {
    flex: 1
  },
  title: {
    fontSize: adjustSize(45),
    color: '#000',
    ...FontPrimary
  },
  subtitle: {
    fontSize: adjustSize(36),
    lineHeight: adjustSize(42),
    color: '#999',
    marginTop: adjustSize(12),
    ...FontSecondary
  },
  switchContainer: {
    marginLeft: adjustSize(30)
  },
  rightText: {
    fontSize: adjustSize(36),
    color: '#999',
    marginLeft: adjustSize(30),
    ...FontSecondary
  },
  rightArrow: {
    height: adjustSize(72),
    width: adjustSize(72),
    resizeMode: 'contain'
  }
});