// @ts-nocheck

/* eslint-disable */
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { ColorGreen } from "../utils/colors";
import { adjustSize } from "../utils/sizes";
import { NOOP } from "../utils/fns";
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from "../../utils/accessibility-helper";
import { Styles } from "./styles";
const Size72 = adjustSize(72);
const Size120 = adjustSize(120);
const Size168 = adjustSize(168);
const Size150 = adjustSize(150);
const Size138 = adjustSize(138);
export default class CircleButton extends Component {
  static propTypes = {
    sizeLevel: PropTypes.oneOf([0, 1, 2, 3]),
    themeColor: PropTypes.any,
    offColor: PropTypes.any,
    disabled: PropTypes.bool,
    showHighlight: PropTypes.bool,
    selected: PropTypes.bool,
    horizontal: PropTypes.bool,
    onPress: PropTypes.func,
    title: PropTypes.string,
    titleIsTouchable: PropTypes.bool,
    icon: PropTypes.any,
    iconSelected: PropTypes.any,
    iconText: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint
  };
  static defaultProps = {
    sizeLevel: 0,
    themeColor: '',
    offColor: '#F7F7F7',
    disabled: false,
    showHighlight: false,
    selected: false,
    horizontal: false,
    onPress: NOOP,
    title: '',
    titleIsTouchable: false,
    icon: null,
    iconSelected: null,
    iconText: ''
  };
  state = {
    isPressing: false
  };
  onPress = () => {
    const {
      disabled,
      onPress
    } = this.props;

    if (disabled) {
      return;
    }

    onPress();
  };
  onPressIn = () => {
    const {
      showHighlight
    } = this.props;

    if (showHighlight) {
      this.setState({
        isPressing: true
      });
    }
  };
  onPressOut = () => {
    this.setState({
      isPressing: false
    });
  };

  renderTouchableList() {
    let {
      sizeLevel,
      selected,
      title,
      icon,
      iconSelected,
      iconText,
      themeColor,
      disabled,
      horizontal,
      offColor,
      titleIsTouchable
    } = this.props;
    let {
      isPressing
    } = this.state;
    let containerSizeStyle = Styles[['container0', 'container1', 'container2', 'container3'][sizeLevel || 0]] || Styles.container0;
    let iconContainerSizeStyle = Styles[['iconContainer0', 'iconContainer1', 'iconContainer2', 'iconContainer3'][sizeLevel || 0]] || Styles.iconContainer0;
    selected = selected || isPressing;

    if (titleIsTouchable) {
      return <View style={StyleSheet.flatten([Styles.container, containerSizeStyle, horizontal ? Styles.containerHorizontal : null, disabled ? {
        opacity: 0.3
      } : null])}>
          <TouchableOpacity disabled={disabled} style={[horizontal ? Styles.containerHorizontal : null, Styles.listContainer]} activeOpacity={1} onPress={this.onPress} onPressIn={this.onPressIn} onPressOut={this.onPressOut} {...getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityRole: AccessibilityRoles.button,
          accessibilityLabel: this.props.accessibilityLabel || title || iconText,
          accessibilityHint: this.props.accessibilityHint,
          accessibilityState: {
            disabled,
            checked: selected,
            selected
          }
        })}>
            <View style={StyleSheet.flatten([Styles.iconContainer, iconContainerSizeStyle, selected ? {
            backgroundColor: themeColor || ColorGreen
          } : offColor ? {
            backgroundColor: offColor
          } : null, disabled ? Styles.iconContainerDisabled : null, disabled && selected ? Styles.iconContainerDisabledSelected : null])}>
              {icon ? <Image style={StyleSheet.flatten([Styles.icon])} source={selected && !disabled ? iconSelected || iconSelected : icon} /> : <Text style={[Styles.iconText, selected && !disabled ? Styles.iconTextSelected : null]}>{iconText}</Text>}
            </View>
            {title ? <Text style={StyleSheet.flatten([Styles.title, selected ? {
            color: themeColor || ColorGreen
          } : null, disabled ? Styles.titleDisabled : null, horizontal ? Styles.titleHorizontal : null])} numberOfLines={horizontal ? 2 : 1}>{title}</Text> : null}
          </TouchableOpacity>
        </View>;
    } else {
      return <View style={StyleSheet.flatten([Styles.container, containerSizeStyle, horizontal ? Styles.containerHorizontal : null, disabled ? {
        opacity: 0.3
      } : null])}>
          <TouchableOpacity disabled={disabled} style={StyleSheet.flatten([Styles.iconContainer, iconContainerSizeStyle, selected ? {
          backgroundColor: themeColor || ColorGreen // borderColor: themeColor || ColorGreen

        } : offColor ? {
          backgroundColor: offColor // borderColor: offColor

        } : null, disabled ? Styles.iconContainerDisabled : null, disabled && selected ? Styles.iconContainerDisabledSelected : null])} activeOpacity={1} onPress={this.onPress} onPressIn={this.onPressIn} onPressOut={this.onPressOut} {...getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityRole: AccessibilityRoles.button,
          accessibilityLabel: this.props.accessibilityLabel || title || iconText,
          accessibilityHint: this.props.accessibilityHint,
          accessibilityState: {
            disabled,
            checked: selected,
            selected
          }
        })}>
            {icon ? <Image style={StyleSheet.flatten([Styles.icon])} source={selected && !disabled ? iconSelected || iconSelected : icon} /> : <Text style={[Styles.iconText, selected && !disabled ? Styles.iconTextSelected : null]}>{iconText}</Text>}
          </TouchableOpacity>
          {title ? <Text style={StyleSheet.flatten([Styles.title, selected ? {
          color: themeColor || ColorGreen
        } : null, disabled ? Styles.titleDisabled : null, horizontal ? Styles.titleHorizontal : null])} numberOfLines={horizontal ? 2 : 2}>{title}</Text> : null}</View>;
    }
  }

  render() {
    return this.renderTouchableList();
  }

} // const Styles = StyleSheet.create({
//   container: {
//     alignItems: 'center'
//   },
//   container0: {
//     width: Size120
//   },
//   container1: {
//     width: Size168
//   },
//   container2: {
//     width: Size150
//   },
//   container3: {
//     width: Size138
//   },
//   containerHorizontal: {
//     width: 'auto',
//     flex: 1,
//     flexDirection: 'row'
//   },
//   iconContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   iconContainer0: {
//     width: Size120,
//     height: Size120,
//     borderRadius: Size120 / 2
//   },
//   iconContainer1: {
//     width: Size168,
//     height: Size168,
//     borderRadius: Size168 / 2
//   },
//   iconContainer2: {
//     width: Size150,
//     height: Size150,
//     borderRadius: Size150 / 2
//   },
//   iconContainer3: {
//     width: Size138,
//     height: Size138,
//     borderRadius: Size138 / 2
//   },
//   iconContainerDisabled: {
//     backgroundColor: 'rgba(197, 201, 203, 0.3)',
//   },
//   iconContainerDisabledSelected: {
//     backgroundColor: 'rgba(197, 201, 203, 0.3)',
//   },
//   icon: {
//     resizeMode: 'contain',
//     width: Size72,
//     height: Size72
//   },
//   iconText: {
//     fontFamily: FontDefault,
//     fontSize: adjustSize(36),
//     color: '#000'
//   },
//   iconTextSelected: {
//     color: '#FFF'
//   },
//   title: {
//     marginTop: adjustSize(27),
//     textAlign: 'center',
//     fontSize: adjustSize(42),
//     fontFamily: FontDefault,
//     color: '#999999'
//   },
//   title3: {
//     display: 'none'
//   },
//   titleDisabled: {
//     color: '#999999'
//   },
//   titleHorizontal: {
//     marginTop: 0,
//     flex: 1,
//     textAlign: 'left',
//     marginLeft: adjustSize(39)
//   },
//   listContainer: {
//     alignItems: 'center',
//   }
// });