// @ts-nocheck

/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, Modal, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import DynamicColor from "../../styles/DynamicColor";
import Styles from "../../resources/Styles";
import { formatString } from "../../utils/string";
import StringSpinner from "../spinner/StringSpinner";
import { constructArray, isLeapYear, compareDateArray } from "./utils";
import { Locale } from "../../locale";
import { ConfigContext } from "../configProvider";
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from "../../utils/accessibility-helper";
import { referenceReport } from "../../decorators/reportDecorator";
import { PopButton } from "../popButton";
import { FontPrimary } from "../../constants/font";
/**
 * @description 时间选择器类型
 * @enum {string}
 */

const TYPE = {
  /** 单个picker */
  SINGLE: 'single',

  /** 选择小时分钟，24小时制 */
  TIME24: 'time24',

  /** 选择小时分钟，12小时制 */
  TIME12: 'time12',

  /** 选择年月日 */
  DATE: 'date'
};
Object.freeze(TYPE);
/**
 * @description 单个picker时选择器的类型，也就是显示的单位
 * @enum {string}
 */

const SINGLE_TYPE = {
  /** 月 */
  MONTH: 'month',

  /** 日 */
  DAY: 'day',

  /** 时 */
  HOUR: 'hour',

  /** 分 */
  MINUTE: 'minute',

  /** 秒 */
  SECOND: 'second'
};
Object.freeze(SINGLE_TYPE);
const screenBackgroundColor = 'rgba(0,0,0,0.4)';
const margin = 0;
const borderRadius = 20;
const titleHeightThin = 62;
const titleHeightFat = 78;
const rowHeight = 48;
const pickerContainerHeight = Platform.select({
  android: rowHeight * 5,
  ios: 224
});
const buttonHeight = 46;
const {
  width,
  height
} = Dimensions.get('window');
const modalWidth = width - margin * 2;
const months = constructArray(12, true, false);
const days = constructArray(31, true, false);
const hours24 = constructArray(24, true, true);
const hours12 = hours24.slice(1, 13);
const minutes = constructArray(60, true, true);
const singleDataSource = {
  [SINGLE_TYPE.MONTH]: months,
  [SINGLE_TYPE.DAY]: days,
  [SINGLE_TYPE.HOUR]: constructArray(24, true, false),
  [SINGLE_TYPE.MINUTE]: constructArray(60, true, false),
  [SINGLE_TYPE.SECOND]: constructArray(60, true, false)
};
Object.freeze(singleDataSource);
const days31 = ['01', '03', '05', '07', '08', '10', '12'];
const days30 = ['04', '06', '09', '11'];
const defaultYearOffset = 15;
/**
 * @export
 * @author Geeook
 * @since 10021
 * @module MHDatePicker
 * @description 米家插件常用的时间选择器
 * @param {string} animationType - modal 显示动效, 参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype
 * @param {bool} visible -  是否显示 modal, 参考 https://facebook.github.io/react-native/docs/0.54/modal#visible
 * @param {string} title - 标题
 * @param {bool} showSubtitle - 是否显示副标题，副标题显示的内容固定，和`type`有关
 * @param {string} confirmColor - 确定按钮的颜色，默认米家绿  10040 废弃， 建议使用datePickerStyle.rightButtonStyle 来控制
 * @param {Object} datePickerStyle - 10040新增 控制DatePicker 一些特有的样式
 * @param {bool} datePickerStyle.allowFontScaling - 10040新增 dialog中text是否支持大字体显示，即是否随系统字体大小变化而变化, 默认`true`
 * @param {bool} datePickerStyle.unlimitedHeightEnable - 10040新增 设置控件高度是否自适应。 默认为false，即默认高度
 * @param {number} datePickerStyle.titleNumberOfLines - 10040新增 控制title 文字的行数， 默认 1行
 * @param {number} datePickerStyle.subTitleNumberOfLines - 10040新增 控制subTitle 文字的行数，默认 1行
 * @param {ViewPropTypes.style} datePickerStyle.titleStyle - 10040新增 控制title 文字的样式
 * @param {ViewPropTypes.style} datePickerStyle.subTitleStyle - 10040新增 控制subTitle 文字的样式
 * @param {number} datePickerStyle.leftButtonNumberOfLines - 10040新增 控制底部左边 文字的行数， 默认 1行  10045废弃
 * @param {number} datePickerStyle.rightButtonNumberOfLines - 10040新增 控制底部右边 文字的行数，默认 1行  10045废弃
 * @param {ViewPropTypes.style} datePickerStyle.leftButtonStyle - 10040新增 控制底部左边文字的样式
 * @param {ViewPropTypes.style} datePickerStyle.rightButtonStyle - 10040新增 控制底部右边 文字的样式
 * @param {Object} datePickerStyle.leftButtonBgStyle - 10047新增 控制底部左边按钮背景颜色{ bgColorNormal: string; bgColorPressed: string };详情请参阅组件PopButton
 * @param {Object} datePickerStyle.rightButtonBgStyle - 10047新增 控制底部右边按钮背景颜色
 * @param {Object} datePickerStyle.pickerInnerStyle - 10040新增 控制中间滑轮等样式， 可参考 StringSpinner  pickerInnerStyle

 * @param {TYPE} type - 时间选择器类型, enum('single', 'time24', 'time12', 'date')
 * @param {SINGLE_TYPE} singleType - 单个picker时的选择器类型, enum('month', 'day', 'hour', 'minute', 'second')
 * @param {array<string>|array<number>|Date} current - 当前选中值，可传入数字数组，字符串数组，Date实例，对所有时间选择器类型有效
 * @param {array<string>|array<number>|Date} min - 最小值，可传入数字数组，字符串数组，Date实例，只对`'single'`和`'date'`类型生效。对于 date 类型，默认值：现在向前15年
 * @param {array<string>|array<number>|Date} max - 最大值，可传入数字数组，字符串数组，Date实例，只对`'single'`和`'date'`类型生效。对于 date 类型，默认值：现在向后15年
 * @param {function} onSelect - 选好之后的回调函数，返回所有picker的选中值 组成的数组 / 拼接的字符串 / 以及计算出的Date实例, 详见使用 demo
 * @param {function} onDismiss - 点击`Modal`内容外面/取消按钮/确定按钮，Modal隐藏时的回调函数
 * @param {(result) => void} onValueChange - 选择完单个 picker 之后的回调， 返回所有picker的选中值 组成的数组 / 拼接的字符串 / 以及计算出的Date实例
 */

class MHDatePicker extends React.Component {
  static contextType = ConfigContext;
  static propTypes = {
    animationType: PropTypes.string,
    visible: PropTypes.bool,
    title: PropTypes.string,
    showSubtitle: PropTypes.bool,
    confirmColor: PropTypes.string,
    type: PropTypes.oneOf([TYPE.DATE, TYPE.SINGLE, TYPE.TIME12, TYPE.TIME24]),
    singleType: PropTypes.oneOf([SINGLE_TYPE.MONTH, SINGLE_TYPE.DAY, SINGLE_TYPE.HOUR, SINGLE_TYPE.MINUTE, SINGLE_TYPE.SECOND]),
    current: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.number), PropTypes.instanceOf(Date)]).isRequired,
    min: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.number), PropTypes.instanceOf(Date)]),
    max: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.number), PropTypes.instanceOf(Date)]),
    datePickerStyle: PropTypes.object,
    onSelect: PropTypes.func,
    onDismiss: PropTypes.func,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint
  };
  static defaultProps = {
    animationType: 'fade',
    visible: false,
    title: '开启时间',
    showSubtitle: true,
    confirmColor: Styles.common.MHGreen,
    type: TYPE.TIME24,
    singleType: SINGLE_TYPE.MINUTE,
    datePickerStyle: {
      unlimitedHeightEnable: false,
      allowFontScaling: true,
      titleNumberOfLines: 1,
      subTitleNumberOfLines: 1,
      titleStyle: null,
      subTitleStyle: null,
      leftButtonNumberOfLines: 1,
      rightButtonNumberOfLines: 1,
      leftButtonStyle: null,
      rightButtonStyle: null,
      rightButtonBgStyle: null,
      leftButtonBgStyle: null
    },
    onSelect: () => {},
    accessible: true
  };
  /**
   * @description 时间选择器类型
   * @enum {string}
   */

  static TYPE = TYPE;
  /**
   * @description 单个picker时选择器的类型，也就是显示的单位
   * @enum {string}
   */

  static SINGLE_TYPE = SINGLE_TYPE;

  constructor(props, context) {
    super(props);
    referenceReport('MHDatePicker');
    const {
      currentArray,
      dataSourceArray
    } = this.init(props, context);
    const subtitle = this.getSubtitle(currentArray, context);
    this.state = {
      visible: this.props.visible,
      dataSourceArray,
      // 待显示的数据源数组
      currentArray,
      // 当前选中值数组
      subtitle
    };
    this.responsiveDialogStyle = context.media?.screenType === 'tablet' ? {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    } : {};
    this.responsiveDialogModalStyle = context.media?.screenType === 'tablet' ? Styles.dialog.padModal : {};
  }

  colorDatePickerSelectBg = new DynamicColor('#f3f3f3', '#242424');
  /**
   * 根据时间选择器类型、app 语言和初始值数组显示不同模板的副标题文案
   * @param {*} arr
   */

  getSubtitle(arr, context) {
    if (this.props.type === TYPE.SINGLE) {
      const count = parseInt(arr[0], 10);
      const unit = count > 1 ? Locale.of(context.language)[`${this.props.singleType}s`] : Locale.of(context.language)[this.props.singleType]; // 英文单复数单位

      return formatString(Locale.of(context.language).singleSubTitle, count, unit);
    }

    return formatString({
      [TYPE.DATE]: Locale.of(context.language).dateSubTitle,
      [TYPE.TIME24]: Locale.of(context.language).time24SubTitle,
      [TYPE.TIME12]: Locale.of(context.language).time12SubTitle
    }[this.props.type], ...arr);
  }
  /**
   * 根据类型将 Date 实例或者 Array<number> 转换成 ['','','']形式
   * @param {*} cur
   * @param {string} type
   */


  convert(cur, context) {
    const {
      type
    } = this.props;

    if (cur instanceof Date) {
      switch (type) {
        case TYPE.DATE:
          return this.convert([cur.getFullYear(), cur.getMonth() + 1, cur.getDate()], context);

        case TYPE.TIME24:
          return this.convert([cur.getHours(), cur.getMinutes()], context);

        case TYPE.TIME12:
          return this.convertTo12([cur.getHours(), cur.getMinutes()], context);

        case TYPE.SINGLE:
          return ['01'];

        default:
          return ['01'];
      }
    } else if (cur instanceof Array) {
      switch (type) {
        case TYPE.DATE:
          return cur.slice(0, 3).map((v, i) => i === 0 ? `${v}` : `0${v}`.slice(-2));

        case TYPE.TIME24:
          return cur.slice(0, 2).map(v => `0${v}`.slice(-2));

        case TYPE.TIME12:
          return this.convertTo12(cur, context);

        case TYPE.SINGLE:
          return cur.slice(0, 1).map(v => `0${v}`.slice(-2));

        default:
          return ['01'];
      }
    } // 异常处理1
    else if (typeof cur === 'string' || typeof cur === 'number') {
        return [`${cur}`];
      } // 异常处理2
      else {
          return ['01'];
        }
  }
  /**
   * 将24小时制的数组转换成12小时制的数组
   * @param {Array} arr
   */


  convertTo12(arr, context) {
    if (arr.length === 2) {
      const newArr = arr.map(v => parseInt(v));

      if (newArr.every(v => Number.isInteger)) {
        let res;

        if (newArr[0] === 0) {
          res = [Locale.of(context.language).am, 12, newArr[1]];
        } else {
          const timeSystemString = newArr[0] > 11 ? Locale.of(context.language).pm : Locale.of(context.language).am; // 下午 12:34

          const hour = newArr[0] > 12 ? `${newArr[0] - 12}` : `${newArr[0]}`;
          const minute = `${newArr[1]}`;
          res = [timeSystemString, hour, minute];
        }

        return res.map((v, i) => i > 0 ? `0${v}`.slice(-2) : v);
      }
    }

    return this.convert(new Date(), context);
  }
  /**
   * 截取部分数组
   * @param {array} arr
   * @param {*} head
   * @param {*} tail
   */


  slice(arr, head, tail) {
    if (head === undefined && tail === undefined) return arr;
    const index = arr.indexOf(`0${head}`.slice(-2)) || 0;
    const lastIndex = arr.lastIndexOf(`0${tail}`.slice(-2)) || arr.length - 1;
    return arr.slice(index, lastIndex + 1);
  }
  /**
   * 计算出年份的范围
   * @param {*} min
   * @param {*} max
   */


  getYears(min, max, context) {
    this.min = this.convert(min, context); // 留一份滚动比较时候用

    this.max = this.convert(max, context);
    const minY = Number.parseInt(this.min[0]);
    const maxY = Number.parseInt(this.max[0]);
    return this.generateArray(minY, maxY);
  }
  /**
   * 根据极值生成步长为1的数组，并转换成字符串
   * @param {number} min
   * @param {number} max
   */


  generateArray(min, max) {
    if (min > max) {
      console.warn('max < min');
      return [];
    }

    return Array.from({
      length: max - min + 1
    }, (v, i) => i + min).map(v => `${v}`);
  }
  /**
   * 初始化数据，包括每个picker的范围和选中值
   */


  init(props, context) {
    const {
      type,
      singleType,
      current,
      min,
      max
    } = props;
    const currentArray = this.convert(current || new Date(), context);

    switch (type) {
      case TYPE.DATE:
        const yearNow = new Date().getFullYear();
        const minDefault = new Date();
        minDefault.setFullYear(yearNow - defaultYearOffset); // Date 模式下，如果没 min，就往回 defaultYearOffset 年

        const maxDefault = new Date();
        maxDefault.setFullYear(yearNow + defaultYearOffset); // 如果没 max，就往后 defaultYearOffset 年

        const years = this.getYears(min || minDefault, max || maxDefault, context);
        const dataSourceArray = [years, months, days];
        this.updateDays(currentArray, dataSourceArray);
        this.unitArray = [Locale.of(context.language).yearUnit, Locale.of(context.language).monthUnit, Locale.of(context.language).dayUnit];
        return {
          currentArray,
          dataSourceArray
        };

      case TYPE.TIME24:
        this.unitArray = [Locale.of(context.language).hourUnit, Locale.of(context.language).minuteUnit];
        return {
          currentArray,
          dataSourceArray: [hours24, minutes]
        };

      case TYPE.TIME12:
        this.unitArray = ['', Locale.of(context.language).hourUnit, Locale.of(context.language).minuteUnit];
        return {
          currentArray,
          dataSourceArray: [[Locale.of(context.language).am, Locale.of(context.language).pm], hours12, minutes]
        };

      case TYPE.SINGLE:
      default:
        this.unitArray = [Locale.of(context.language)[`${singleType}Unit`]];
        return {
          currentArray,
          dataSourceArray: [this.slice(singleDataSource[singleType], min, max)]
        };
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.visible !== this.state.visible) {
      this.setState({
        visible: newProps.visible
      });
    }

    if (newProps.current === undefined || newProps.current !== this.props.current) {
      const currentArray = this.convert(newProps.current || new Date(), this.context);
      this.setState({
        currentArray,
        subtitle: this.getSubtitle(currentArray, this.context)
      });
    }
  }

  checkUnlimitedHeightEnable() {
    let result = false;

    if (this.props.datePickerStyle && this.props.datePickerStyle.hasOwnProperty('unlimitedHeightEnable')) {
      result = this.props.datePickerStyle.unlimitedHeightEnable;
    }

    return result;
  }
  /**
   * 标题部分
   */


  renderTitle() {
    const {
      theme
    } = this.context;
    const styleHeight = {
      height: this.props.showSubtitle ? titleHeightFat : titleHeightThin
    };
    const heightStyle = {
      height: styleHeight.height,
      minHeight: styleHeight.height
    };

    if (this.checkUnlimitedHeightEnable()) {
      heightStyle.height = null;
    }

    const numberOfLines = {
      titleNumberOfLines: 1,
      subTitleNumberOfLines: 1
    };

    if (this.props.datePickerStyle) {
      if (this.props.datePickerStyle.hasOwnProperty('titleNumberOfLines')) {
        numberOfLines.titleNumberOfLines = this.props.datePickerStyle.titleNumberOfLines;
      }

      if (this.props.datePickerStyle.hasOwnProperty('subTitleNumberOfLines')) {
        numberOfLines.subTitleNumberOfLines = this.props.datePickerStyle.subTitleNumberOfLines;
      }
    }

    return <View style={[styles.titleContainer, heightStyle]} {...getAccessibilityConfig({
      accessible: this.props.accessible,
      accessibilityRole: AccessibilityRoles.text,
      accessibilityLabel: this.props.accessibilityLabel
    })}>
        <Text numberOfLines={numberOfLines.titleNumberOfLines} allowFontScaling={this.props.datePickerStyle.allowFontScaling} style={[styles.title, {
        color: theme?.colorBlack
      }, this.props.datePickerStyle.titleStyle]}>
          {this.props.title || ''}
        </Text>
        {this.props.showSubtitle ? <Text numberOfLines={numberOfLines.subTitleNumberOfLines} allowFontScaling={this.props.datePickerStyle.allowFontScaling} style={[styles.subtitle, {
        color: theme?.colorGrayNormal
      }, this.props.datePickerStyle.subTitleStyle]}>
              {this.state.subtitle}
            </Text> : null}
      </View>;
  }
  /**
   * picker 部分
   */


  renderContent() {
    const {
      theme,
      colorScheme,
      media
    } = this.context;
    const {
      currentArray,
      dataSourceArray
    } = this.state;
    const {
      length
    } = currentArray;
    const actualWidth = media?.screenType === 'tablet' ? Styles.dialog.padModal.width : this.modalWidth; // - (length - 1) * StyleSheet.hairlineWidth; // 去掉分割线的真实宽度 -- 10045去掉分割线

    const normalWidth = actualWidth / length; // 均分宽度

    const yearWidth = normalWidth + 10; // 日期选择器的年份picker宽度稍微大一点

    const monthWidth = (actualWidth - yearWidth) / 2;
    let tempPickerInnerStyle = {
      lineColor: 'transparent',
      // theme.colorSeparator,
      textColor: theme.colorGrayLighter,
      fontSize: 17,
      selectTextColor: theme.colorPrimary,
      selectFontSize: 19,
      unitTextColor: theme.colorPrimary,
      unitFontSize: 10,
      rowHeight,
      selectBgColor: 'transparent' // this.colorDatePickerSelectBg.color(colorScheme),

    };

    if (this.props.datePickerStyle && this.props.datePickerStyle.hasOwnProperty('pickerInnerStyle')) {
      tempPickerInnerStyle = this.props.datePickerStyle.pickerInnerStyle;
    }

    tempPickerInnerStyle.allowFontScaling = this.props.datePickerStyle.allowFontScaling;
    return <View style={styles.pickerContainer}>
        {dataSourceArray.map((dataSource, index) => {
        let style = {
          width: normalWidth
        };

        if (this.props.type === TYPE.DATE) {
          if (index === 0) style = {
            width: yearWidth
          };else style = {
            width: monthWidth
          };
        }

        return <View key={index + this.unitArray[index]} style={[{
          flexDirection: 'row'
        }, style]}>
              <StringSpinner key={index + this.unitArray[index]} style={style} unit={this.unitArray[index]} dataSource={dataSource} defaultValue={currentArray[index]} pickerInnerStyle={tempPickerInnerStyle} onValueChanged={data => this._onValueChanged(index, data)} {...getAccessibilityConfig({
            accessible: this.props.accessible,
            accessibilityRole: AccessibilityRoles.adjustable,
            accessibilityLabel: this.props.accessibilityLabel,
            accessibilityHint: this.props.accessibilityHint,
            accessibilityValue: {
              min: Array.isArray(this.min) ? this.min[index] : 0,
              max: Array.isArray(this.max) ? this.max[index] : 0,
              now: this.state.currentArray[index]
            }
          })} />
            </View>;
      })}
      </View>;
  }
  /**
   * 底部按钮
   */


  renderButton() {
    const heightStyle = {
      height: styles.buttons.minHeight,
      minHeight: styles.buttons.minHeight
    };

    if (this.checkUnlimitedHeightEnable()) {
      heightStyle.height = null;
    } // let numberOfLines = {
    //   leftButtonNumberOfLines: 1,
    //   rightButtonNumberOfLines: 1
    // };
    // if (this.props.datePickerStyle) {
    //   if (this.props.datePickerStyle.hasOwnProperty('leftButtonNumberOfLines')) {
    //     numberOfLines.leftButtonNumberOfLines = this.props.datePickerStyle.leftButtonNumberOfLines;
    //   }
    //   if (this.props.datePickerStyle.hasOwnProperty('rightButtonNumberOfLines')) {
    //     numberOfLines.rightButtonNumberOfLines = this.props.datePickerStyle.rightButtonNumberOfLines;
    //   }
    // }


    return <View style={[styles.buttons, heightStyle]}>
        <PopButton sizeLevel="medium" style={{
        marginRight: 6
      }} title={Locale.of(this.context.language).cancel} titleStyle={this.props.datePickerStyle.leftButtonStyle} titleColor={this.props.datePickerStyle.leftButtonStyle?.color} backgroundColor={this.props.datePickerStyle.leftButtonBgStyle} colorType="grayLayerBlack" onPress={() => this.dismiss()} allowFontScaling={this.props.datePickerStyle.allowFontScaling} />
        <PopButton sizeLevel="medium" style={{
        marginLeft: 6
      }} title={Locale.of(this.context.language).ok} titleStyle={this.props.datePickerStyle.rightButtonStyle} titleColor={this.props.datePickerStyle.rightButtonStyle?.color} backgroundColor={this.props.datePickerStyle.rightButtonBgStyle} colorType="grayLayerBlue" onPress={() => this.confirm()} allowFontScaling={this.props.datePickerStyle.allowFontScaling} />
      </View>;
  }

  render() {
    const {
      theme
    } = this.context;
    const {
      width,
      height
    } = Dimensions.get('window');
    this.modalWidth = width - margin * 2; // 修复横屏宽度bug

    return <Modal animationType={this.props.animationType} transparent visible={this.state.visible} onRequestClose={() => this.dismiss()}>
        <View style={[styles.background, this.responsiveDialogStyle]}>
          <TouchableWithoutFeedback onPress={() => this.dismiss()}>
            <View style={{
            width,
            height
          }} />
          </TouchableWithoutFeedback>
          <View style={[styles.modal, {
          backgroundColor: theme?.colorForeground,
          width: this.modalWidth
        }, this.responsiveDialogModalStyle]}>
            {this.renderTitle()}
            {this.renderContent()}
            {this.renderButton()}
          </View>
        </View>
      </Modal>;
  }
  /**
   * 计算当前年份和月份下的天数
   * @param {array} newCurrentArray
   * @param {array<array>} newDataSourceArray
   */


  updateDays(newCurrentArray, newDataSourceArray) {
    const [year, month, day] = newCurrentArray;

    if (days31.includes(month)) {
      newDataSourceArray[2] = days;
    } else if (days30.includes(month)) {
      newDataSourceArray[2] = days.slice(0, 30);
    } else {
      // 闰年2月29天, 平年28天
      if (isLeapYear(parseInt(year))) {
        newDataSourceArray[2] = days.slice(0, 29);
      } else {
        newDataSourceArray[2] = days.slice(0, 28);
      }
    } // 5月31日 -> 6月30日


    if (!newDataSourceArray[2].includes(day)) {
      newCurrentArray[2] = newDataSourceArray[2][newDataSourceArray[2].length - 1];
    }
  }
  /**
   * Picker 滚动回调
   * @param {number} index
   * @param {object} data
   */


  _onValueChanged(index, data) {
    let newCurrentArray = [...this.state.currentArray];
    newCurrentArray[index] = data.newValue;
    const newDataSourceArray = [...this.state.dataSourceArray];
    this.setState({
      currentArray: newCurrentArray,
      subtitle: this.getSubtitle(newCurrentArray, this.context)
    }, _ => {
      this.props.onValueChange && this.props.onValueChange({
        rawArray: this.state.currentArray,
        rawString: this.state.subtitle,
        date: this.array2Date()
      });

      if (this.props.type === TYPE.DATE) {
        let needUpdate = false; // 判断是否越界

        if (compareDateArray(newCurrentArray, this.max) > 0) {
          newCurrentArray = this.max;
          needUpdate = true;
        }

        if (compareDateArray(newCurrentArray, this.min) < 0) {
          newCurrentArray = this.min;
          needUpdate = true;
        }

        this.updateDays(newCurrentArray, newDataSourceArray);

        if (newDataSourceArray[2].length !== this.state.dataSourceArray[2].length) {
          needUpdate = true;
        }

        needUpdate && this.setState({
          subtitle: this.getSubtitle(newCurrentArray, this.context),
          currentArray: newCurrentArray,
          dataSourceArray: newDataSourceArray
        });
      }
    });
  }
  /**
   * 隐藏 Modal
   */


  dismiss() {
    this.setState({
      visible: false
    });
    this.props.onDismiss && this.props.onDismiss();
  }
  /**
   * 把时间数组转成 `Date` 实例
   * ['2019','06','03'] -> new Date()
   * ['15','36'] -> new Date()
   * ['下午','03','36'] -> new Date()
   */


  array2Date() {
    const {
      currentArray
    } = this.state;
    const date = new Date();

    switch (this.props.type) {
      case TYPE.DATE:
        date.setFullYear(currentArray[0]);
        date.setMonth(parseInt(currentArray[1], 10) - 1, parseInt(currentArray[2], 10));
        date.setDate(parseInt(currentArray[2], 10));
        break;

      case TYPE.TIME24:
        date.setHours(currentArray[0]);
        date.setMinutes(currentArray[1]);
        break;

      case TYPE.TIME12:
        let hour = parseInt(currentArray[1], 10);

        if (currentArray[0] === Locale.of(this.context.language).am) {
          hour = hour === 12 ? 0 : hour;
        } else {
          hour = hour < 12 ? hour + 12 : hour;
        }

        date.setHours(hour);
        date.setMinutes(currentArray[2]);
        break;

      case TYPE.SINGLE:
      default:
        return null;
    }

    return date;
  }

  confirm() {
    if (this.props.onSelect) {
      this.props.onSelect({
        rawArray: this.state.currentArray,
        rawString: this.state.subtitle,
        date: this.array2Date()
      });
    }

    this.dismiss();
  }

}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: screenBackgroundColor
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: 20,
    width: modalWidth,
    marginHorizontal: margin,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    lineHeight: 22,
    marginTop: 25,
    fontSize: 16,
    ...FontPrimary
  },
  subtitle: {
    width: modalWidth,
    textAlign: 'center',
    fontSize: 14,
    marginTop: 5,
    ...FontPrimary
  },
  pickerContainer: {
    flexDirection: 'row',
    height: pickerContainerHeight,
    justifyContent: 'space-between'
  },
  buttons: {
    minHeight: buttonHeight,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    marginHorizontal: 27
  } // button: {
  //   flex: 1,
  //   backgroundColor: 'transparent',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // buttonText: {
  //   fontSize: 14,
  //   lineHeight: 19,
  //   color: '#666',
  //   fontFamily: 'D-DINCondensed-Bold', // TODO: 英文字体，中文加粗效果
  // },

});
export default MHDatePicker;