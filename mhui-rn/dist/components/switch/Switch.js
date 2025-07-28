// @ts-nocheck

/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';
import { Animated, StyleSheet, TouchableOpacity, View, I18nManager } from 'react-native';
import { ConfigContext } from "../configProvider";
import DynamicColor from "../../styles/DynamicColor";
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from "../../utils/accessibility-helper";
import { referenceReport } from "../../decorators/reportDecorator";
const OFF_COLOR = '#f0f0f0';
const BORDER_COLOR = 'rgba(0,0,0,0.1)';
const BACK_WIDTH = 44; // 默认宽度

const BACK_HEIGHT = 24; // 默认高度

const BORDER_WIDTH = StyleSheet.hairlineWidth;
const ratio = 4; // 容器高度和滚球尺寸比例

const minMargin = 2.5; // 容器和滚球之间的最小间距

/**
 * @export public
 * @doc_name 常用UI组件
 * @doc_index 1
 * @doc_directory ui
 * @author Geeook
 * @since 10020
 * @module Switch
 * @description Switch for Android and iOS
 * @property {bool} value - 开关状态，默认值 false
 * @property {style} style - 开关样式，仅支持宽高
 * @property {string} onTintColor - 打开时的背景颜色
 * @property {string} tintColor - 关闭时的背景颜色
 * @property {bool} disabled - 是否禁用，默认值 false
 * @property {function} onValueChange - 切换开关的回调函数
 */

class Switch extends React.Component {
  static contextType = ConfigContext;
  static propTypes = {
    value: PropTypes.bool.isRequired,
    style: PropTypes.object,
    onTintColor: PropTypes.string,
    tintColor: PropTypes.string,
    disabled: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired,
    ...AccessibilityPropTypes
  };
  static defaultProps = {
    value: false,
    style: {},
    disabled: false
  };
  colorSwitchCircle = new DynamicColor('#ffffff', '#ebebeb');
  colorSwitchOff = new DynamicColor('#E5E5E5', '#333333');

  constructor(props) {
    super(props);
    referenceReport('Switch');
    this.state = {
      value: this.props.value
    }; // 根据style的宽度计算出滚球的大小和间距

    const {
      width,
      height
    } = this.props.style;
    const backWidth = width || BACK_WIDTH;
    const backHeight = height || BACK_HEIGHT;
    const margin = backHeight / ratio < minMargin ? minMargin : Math.round(backHeight / ratio);
    const circleSize = backHeight / 2; //backHeight - 2 * margin;
    // 滚球滚动最大距离

    this.offsetXMax = backWidth - backHeight;

    if (I18nManager.isRTL) {
      this.offsetXMax *= -1;
    } // 给 offsetX 一个初始值，避免进入页面时出现动画


    const toValue = this.props.value ? this.offsetXMax : 0;
    this.offsetX = new Animated.Value(toValue); // 容器实际样式

    this.backStyle = {
      width: backWidth,
      height: backHeight,
      borderRadius: backHeight / 2
    }; // 滚球实际样式

    this.circleStyle = {
      margin,
      width: circleSize,
      height: circleSize,
      borderRadius: circleSize / 2
    };
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.value !== this.state.value) {
      this.setState({
        value: newProps.value
      }, this.animated);
    }
  }

  render() {
    const {
      theme,
      colorScheme
    } = this.context;
    const onTintColor = this.props.onTintColor ? this.props.onTintColor : theme.colorPrimary;
    const tintColor = this.props.tintColor ? this.props.tintColor : this.colorSwitchOff.color(colorScheme);
    const backgroundColor = this.state.value ? onTintColor : tintColor;
    const opacity = this.props.disabled ? 0.3 : 1;
    return <View style={[styles.container, {
      opacity
    }]}>
        <TouchableOpacity style={[styles.back, this.backStyle, {
        backgroundColor
      }]} disabled={this.props.disabled} activeOpacity={0.8} onPress={() => this._onValueChange()} {...getAccessibilityConfig({ ...this.props,
        accessibilityRole: this.props.accessibilityRole || AccessibilityRoles.switch,
        accessibilityState: this.props.accessibilityState || {
          disabled: this.props.disabled,
          checked: !!this.state.value
        }
      })}>
          {// Android 黑暗模式下使用 Animated.Image 实现白色圆点
        this.context.colorScheme === 'dark' ? <Animated.Image style={[styles.circle, this.circleStyle, {
          backgroundColor: this.colorSwitchCircle.color(colorScheme),
          transform: [{
            translateX: this.offsetX
          }]
        }]} /> : <Animated.View style={[styles.circle, this.circleStyle, {
          backgroundColor: this.colorSwitchCircle.color(colorScheme),
          transform: [{
            translateX: this.offsetX
          }]
        }]} />}
        </TouchableOpacity>
      </View>;
  }

  animated() {
    const toValue = this.state.value ? this.offsetXMax : 0;
    Animated.spring(this.offsetX, {
      toValue,
      bounciness: 9,
      speed: 9
    }).start();
  }

  _onValueChange() {
    const value = !this.state.value;
    this.setState({
      value
    }, () => {
      this.animated();

      if (typeof this.props.onValueChange === 'function') {
        this.props.onValueChange(value);
      }
    });
  }

  componentDidMount() {
    this.animated();
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  back: {
    justifyContent: 'center' //borderWidth: BORDER_WIDTH,
    //borderColor: BORDER_COLOR,

  },
  circle: {
    position: 'absolute',
    //borderWidth: BORDER_WIDTH,
    //borderColor: BORDER_COLOR,
    backgroundColor: '#fff'
  }
});
export default Switch;