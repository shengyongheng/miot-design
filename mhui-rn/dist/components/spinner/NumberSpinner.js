// @ts-nocheck

/* eslint-disable  */

/**
 * @export public
 * @doc_name 常用UI组件
 * @doc_index 1
 * @doc_directory ui
 * @since 10003
 * @module miot/ui/NumberSpinner
 * @description 数字选择器
 * @example
 *
    <NumberSpinner
        style={{width:200, height:100}}
        maxValue={30}
        minValue={1}
        defaultValue={5}
        unit={"km"}
        onNumberChanged={data=>{
            console.log(`newValue:${data.newValue},oldValue:${data.oldValue}`);
        }}
    />


    <NumberSpinner
        style={{width:300, height:200}}
        maxValue={30}
        minValue={-100}
        interval={2.5}
        defaultValue={80}
        valueFormat={"%.1f"}
        unit={"km"}
        onNumberChanged={data=>{
            console.log(`newValue:${data.newValue},oldValue:${data.oldValue}`);
        }}
    />
 *
 * @property {bool} visible 是否可见
 * @property {string} unit 单位
 * @property {int} max 最大值
 * @property {int} min 最小值
 * @property {int} interval 步长，默认为1
 * @property {int} defaultValue 默认值
 * @property {string} valueFormat 格式
 * @property {func} onChangeStart - 值开始改变时的回调
 * @property {func} onNumberChanged 值改变的回调
 */
// @native begin
import PropTypes from 'prop-types';
import React from 'react';
import { Platform, ViewPropTypes } from 'react-native';
import StringSpinner from "./StringSpinner";
import { MIOTNumberPicker } from "../../nativeModules";
import { referenceReport } from "../../decorators/reportDecorator";
const isAndroid = Platform.OS === 'android';
const NumberPicker = isAndroid ? MIOTNumberPicker : null; // @native end

class NumberSpinner extends React.Component {
  static defaultProps = {
    valueFormat: Platform.select({
      ios: '%0.0f'
    })
  };
  static propTypes = {
    visible: PropTypes.bool,
    unit: PropTypes.string,
    maxValue: PropTypes.number,
    minValue: PropTypes.number,
    interval: PropTypes.number,
    defaultValue: PropTypes.number,
    valueFormat: PropTypes.string,
    onNumberChanged: PropTypes.func,
    ...ViewPropTypes
  };

  constructor(props, context) {
    super(props, context);
    referenceReport('NumberSpinner');
  }

  render() {
    // @native :=> null
    return isAndroid ? <NumberPicker {...this.props} {...this.props.pickerInnerStyle} lineStyle={this.props.lineStyle || 'default'} onValueChanged={event => {
      if (this.props.onNumberChanged) {
        const val = event.nativeEvent || {};
        const result = {
          newValue: parseFloat(`${val.newValue}`),
          oldValue: parseFloat(`${val.oldValue}`)
        };
        this.props.onNumberChanged(result);
      }
    }} /> : <StringSpinner type={1} {...this.props} defaultValue={`${this.props.defaultValue}`} onValueChanged={this.props.onNumberChanged} />; // @native end
  }

}

export default NumberSpinner;