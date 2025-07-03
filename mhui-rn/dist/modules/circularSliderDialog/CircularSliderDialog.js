/* eslint-disable  */
// @ts-nocheck
import React, { Component, Fragment } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CardButton from "../cardButton/CardButton";
import AbstractDialog from "../../components/dialog/AbstractDialog";
import CircularSlider from "../../components/circularSlider/CircularSlider";
import { Locale } from "../../locale";
import PropTypes from "prop-types";
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from "../../utils/accessibility-helper";
/**
 * @export
 * @author Song wei
 * @module CircularSliderDialog
 * @description 摆角范围调节器（滑动圆环），可以自定义环内内容。目前，开启数值列表时，必须同步滑动
 * @param {boolean} synSliding - 是否开启同步滑动，默认开启，开启后onChange函数回调传入的仅有value参数，如果不开启，则返回leftValue和rightValue两个参数
 * @param {number} radius - 圆环的半径，默认100
 * @param {number} step - 步长，默认1，建议step数值设置在5以内，稍微大一点可以改用useMoveValueList
 * @param {number} strokeWidth - 圆环的宽度，默认40
 * @param {string} backgroundPaddingTrackColor - 填充部分的背景颜色，默认为'#e8e8e8'
 * @param {string} backgroundRangeTrackColor - 圆环部分的背景颜色，默认为'#FFA626'
 * @param {number} buttonRadius - 按钮半径，默认为10
 * @param {string} buttonFillColor - 按钮填充颜色，默认为米家颜色
 * @param {string} buttonBorderColor - 按钮边框颜色，默认为米家颜色
 * @param {string} buttonStrokeWidth - 按钮线宽
 * @param {number} initLeftValue - 最开始的当前左侧（或上侧）刻度值
 * @param {number} initRightValue - 最开始的当前右侧（或下侧）刻度值
 * @param {number} minLeftValue - 最小的左侧（或上侧）刻度值
 * @param {number} minRightValue - 最小的右侧（或下侧）刻度值
 * @param {number} maxLeftValue - 最大的左侧（或上侧）刻度值
 * @param {number} maxRightValue - 最大的右侧（或下侧）刻度值
 * @param {bool} horizontalDirection - 组件处于水平方向，默认为false
 * @param {bool} verticalDirection - 组件处于垂直方向，需要注意的是如果同时开启（或同时关闭）horizontal和vertical，也会处于水平状态
 * @param {Component} children 子组件
 * @param {object} style 组件样式
 * @param {object} contentContainerStyle children样式
 * @param {Object} dialNumStyle - 刻度盘数值样式，此样式需要参考SVG Text样式。默认为{ fill: '#CCCCCC', textAnchor: "middle"}
 * @param {boolean} disabled - 默认false，如果开启后，将会忽略onChange和onComplete
 * @param {func} onChange - 滑块移动时的回调函数，({currentLeftValue, currentRightValue}) => { 这里填写要做的事}
 * @param {func} onComplete - 滑动移动完成的回调函数，({currentLeftValue, currentRightValue}) => { 这里填写要做的事}
 */

export default class CircularSliderDialog extends Component {
  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.any,
    iconDisabled: PropTypes.any,
    themeColor: PropTypes.string,
    rightArrow: PropTypes.bool,
    invisible: PropTypes.bool,
    useMoveValueList: PropTypes.bool,
    valueList: PropTypes.array,
    synSliding: PropTypes.bool,
    step: PropTypes.number,
    radius: PropTypes.number,
    strokeWidth: PropTypes.number,
    backgroundPaddingTrackColor: PropTypes.string,
    backgroundRangeTrackColor: PropTypes.string,
    linearGradient: PropTypes.array,
    buttonRadius: PropTypes.number,
    buttonFillColor: PropTypes.string,
    buttonBorderColor: PropTypes.string,
    buttonStrokeWidth: PropTypes.number,
    initLeftValue: PropTypes.number,
    initRightValue: PropTypes.number,
    minLeftValue: PropTypes.number,
    minRightValue: PropTypes.number,
    maxLeftValue: PropTypes.number,
    maxRightValue: PropTypes.number,
    horizontalDirection: PropTypes.bool,
    verticalDirection: PropTypes.bool,
    dialNumStyle: PropTypes.object,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onComplete: PropTypes.func,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    subtitleAccessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint,
    sliderAccessibilityLabel: AccessibilityPropTypes.sliderAccessibilityLabel,
    sliderAccessibilityHint: AccessibilityPropTypes.sliderAccessibilityHint
  };
  static defaultProps = {
    useMoveValueList: false,
    valueList: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360],
    synSliding: true,
    // 是否开启同步滑动，开启后onChange函数回调传入的仅有value参数，如果不开启，则返回leftValue和rightValue两个参数
    step: 1,
    // 步长
    radius: 100,
    // 半径
    strokeWidth: 40,
    // 线宽
    backgroundPaddingTrackColor: '#e8e8e8',
    // '#e8e8e8', // 底部轨道颜色
    backgroundRangeTrackColor: '#FFA626',
    // 刻度盘背景颜色
    linearGradient: [{
      stop: '0%',
      color: '#1890ff'
    }, {
      stop: '100%',
      color: '#f5222d'
    }],
    // 渐变色
    buttonRadius: 10,
    // 按钮半径
    buttonFillColor: '#fff',
    // 按钮填充颜色
    buttonBorderColor: '#fff',
    // 按钮边框颜色
    buttonStrokeWidth: 10,
    // 按钮线宽

    /** 最开始的当前左侧刻度值 */
    initLeftValue: 40,
    // 最开始的当前左侧刻度值

    /** 最开始的当前右侧刻度值 */
    initRightValue: 40,
    // 最开始的当前右侧刻度值
    minLeftValue: 0,
    minRightValue: 0,
    maxLeftValue: 90,
    // 左侧刻度最大值，当设置为垂直方向时，为上侧最大刻度值
    maxRightValue: 90,
    // 右侧刻度最大范围，当设置为垂直方向时，为下侧最大刻度值
    horizontalDirection: false,
    // 组件处于水平方向， 如果同时设置了水平和垂直方向，则组件为水平方向
    verticalDirection: false,
    // 垂直处于方向
    dialNumStyle: {
      fill: '#CCCCCC',
      textAnchor: 'middle'
    },
    // #CCCCCC 刻度盘数字样式（SVG Text样式）
    disabled: false,
    accessible: true,
    onChange: () => {},
    onComplete: () => {}
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      dialogVisible: false
    };
  }

  _onPress = () => {
    if (!this.props.disabled) {
      this.setState({
        dialogVisible: true
      }, () => {
        typeof this.props.onSetStart === 'function' && this.props.onSetStart(); //初始化AbstractDialog中的subtitle

        this.props.onChange(this.props.initLeftValue);
      });
    }
  };
  _onClickDismiss = () => {
    typeof this.props.onSetEnd === 'function' && this.props.onSetEnd();
    this.setState({
      dialogVisible: false
    });
  };
  _onClickOk = () => {
    this.setState({
      dialogVisible: false
    });
    typeof this.props.onOk === 'function' && this.props.onOk(this.state.value ? this.state.value : this.props.initLeftValue);
    typeof this.props.onSetEnd === 'function' && this.props.onSetEnd();
  }; // 滑动回调函数

  onValueChange = data => {
    if (this.props.synSliding) {
      this.setState({
        value: data.value
      });
      this.props.onChange(data.value);
    } else {
      this.setState({
        value: data.currentLeftValue
      });
      this.props.onChange(data.currentLeftValue);
    }
  };

  render() {
    //创建dialog的取消、确定按钮
    const buttons = [];

    if (this.props.showCancel !== false) {
      buttons.push({
        text: Locale.of(this.context.language).cancel,
        callback: this._onClickDismiss
      });
    }

    buttons.push({
      text: Locale.of(this.context.language).ok,
      backgroundColor: {
        bgColorNormal: this.props.themeColor,
        bgColorPressed: this.props.themeColor
      },
      callback: this._onClickOk
    });
    return <Fragment>
        <CardButton title={this.props.title} onPress={this._onPress} icon={this.props.icon} iconDisabled={this.props.iconDisabled} themeColor={this.props.themeColor} disabled={this.props.disabled} rightArrow={this.props.rightArrow} invisible={this.props.invisible} {...getAccessibilityConfig({
        accessible: this.props.accessible,
        accessibilityLabel: this.props.accessibilityLabel,
        accessibilityHint: this.props.accessibilityHint
      })} />

        <AbstractDialog animationType="slide" visible={this.state.dialogVisible} title={this.props.title} // subtitle={this.props.subtitle}
      showTitle={this.props.title ? true : false} // showSubtitle={true}
      buttons={buttons} onDismiss={this._onClickDismiss} useNewTheme={true} {...getAccessibilityConfig({
        accessible: this.props.accessible,
        accessibilityLabel: this.props.accessibilityLabel
      })}>
          <Text style={styles.subtitle} {...getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityRole: AccessibilityRoles.text,
          accessibilityLabel: this.props.subtitleAccessibilityLabel ? this.props.subtitleAccessibilityLabel : `${this.props.subtitle}${this.props.unit || ''}`
        })}>
            {this.props.subtitle}
            {this.props.unit ? this.props.unit : ''}
          </Text>

          <View style={styles.slider}>
            <CircularSlider radius={this.props.radius} useMoveValueList={this.props.useMoveValueList} valueList={this.props.valueList} synSliding={this.props.synSliding} step={this.props.step} initLeftValue={this.props.initLeftValue} initRightValue={this.props.initRightValue} minLeftValue={this.props.minLeftValue} minRightValue={this.props.minRightValue} maxLeftValue={this.props.maxLeftValue} maxRightValue={this.props.maxRightValue} horizontalDirection={this.props.horizontalDirection} verticalDirection={this.props.verticalDirection} onChange={this.onValueChange} onComplete={this.onValueChange} contentContainerStyle={styles.contentContainerStyle} strokeWidth={this.props.strokeWidth} buttonBorderColor={this.props.buttonBorderColor} buttonFillColor={this.props.buttonFillColor} buttonStrokeWidth={this.props.buttonStrokeWidth} buttonRadius={this.props.buttonRadius} align="center" {...getAccessibilityConfig({
            accessible: this.props.accessible,
            accessibilityLabel: this.props.sliderAccessibilityLabel,
            accessibilityHint: this.props.sliderAccessibilityHint
          })} />
          </View>
        </AbstractDialog>
      </Fragment>;
  }

}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  },
  subtitle: {
    fontSize: 40,
    color: '#000000',
    textAlign: 'center'
  },
  slider: {
    marginTop: 30,
    marginBottom: 30
  }
});