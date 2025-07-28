// @ts-nocheck

/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';
import { View, TouchableWithoutFeedback, ViewPropTypes } from 'react-native';
import { Styles } from "../../resources";
import { getAccessibilityConfig, AccessibilityPropTypes } from "../../utils/accessibility-helper";
import { ConfigContext } from "../configProvider";
/**
 * @export public
 * @doc_name 常用UI组件
 * @doc_index 1
 * @doc_directory ui
 * @author Geeook
 * @since 10040
 * @module TouchableView
 * @description 可点击的View组件  值得注意的是，尽量使用单层嵌套而不是多层嵌套，否则容易出现响应者混乱的问题。
 * @property {number} delayLongPress longPress回调触发延时
 * @property {number} delayPressIn  onPress回调触发延时
 * @property {number} delayPressOut onPress结束触发延时
 * @property {bool} disabled 是否禁用
 * @property {function} onLongPress 长按回调
 * @property {function} onPress 点击回调
 * @property {style} viewStyle style
 * @property {string} underlayColor onPressIn触发时颜色改变值
 */

export default class TouchableView extends React.Component {
  static contextType = ConfigContext;
  static propTypes = {
    delayLongPress: PropTypes.number,
    delayPressIn: PropTypes.number,
    delayPressOut: PropTypes.number,
    disabled: PropTypes.bool,
    onLongPress: PropTypes.func,
    onPress: PropTypes.func,
    viewStyle: ViewPropTypes.style,
    underlayColor: PropTypes.string,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel
  };
  static defaultProps = {
    delayLongPress: 100,
    delayPressIn: 100,
    delayPressOut: 100,
    disabled: false,
    viewStyle: {},
    underlayColor: Styles.common.underlayColor
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      inPress: false
    };
  }

  render() {
    return <TouchableWithoutFeedback {...this.props} delayLongPress={this.props.delayLongPress} delayPressIn={this.props.delayPressIn} delayPressOut={this.props.delayPressOut} disabled={this.props.disabled} onLongPress={this.props.onLongPress} onPress={this.props.onPress} onPressIn={() => {
      this.setState({
        inPress: true
      });
    }} onPressOut={() => {
      this.setState({
        inPress: false
      });
    }} {...getAccessibilityConfig({
      accessible: this.props.accessible,
      accessibilityLabel: this.props.accessibilityLabel,
      accessibilityHint: this.props.accessibilityHint
    })}>
        <View style={[{
        backgroundColor: '#fff'
      }, this.props.viewStyle, this.state.inPress ? this.context.colorScheme === "dark" ? {
        backgroundColor: 'rgba(255,255,255,0.05)'
      } : {
        backgroundColor: this.props.underlayColor
      } : {}]}>{this.props.children}</View>
      </TouchableWithoutFeedback>;
  }

}