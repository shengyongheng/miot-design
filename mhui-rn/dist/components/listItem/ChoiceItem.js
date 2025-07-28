// @ts-nocheck

/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View, I18nManager } from 'react-native';
import { Images, Styles } from "../../resources";
import Checkbox from "../checkbox/Checkbox";
import { ConfigContext } from "../configProvider";
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from "../../utils/accessibility-helper";
import { FontPrimary, FontSecondary } from "../../constants/font";
const thinHeight = 54; // 无副标题时的高度

const fatHeight = 72; // 有副标题时的高度

const checkboxSize = 22;
/**
 * @description 选择列表项的类型
 * @enum {string}
 */

const TYPE = {
  /**
   * 无状态列表项
   */
  STATELESS: 'stateless',

  /**
   * 单选列表项
   */
  SINGLE: 'single',

  /**
   * 多选列表项
   */
  MULTIPLE: 'multiple'
};
Object.freeze(TYPE);
/**
 * @export
 * @author Geeook
 * @since 10022
 * @module ChoiceItem
 * @description 可选择的列表项，可以单选或者多选
 * @property {TYPE} type - 列表项的类型，是单选还是多选
 * @property {string} title - 标题文字
 * @property {string} subtitle - 副标题文字
 * @property {style} titleStyle - 10040新增 设置title的style
 * @property {style} subtitleStyle - 10040新增 设置subtitle的style
 * @property {number} itemStyleType - 10066新增，列表项的样式
 * @property {boolean} selected - 是否选中，`TYPE.SINGLE`和`TYPE.MULTIPLE`可用
 * @property {string} color - 选中态颜色，单选时表示选中文字颜色，多选时表示勾选框勾选背景颜色，`TYPE.SINGLE`和`TYPE.MULTIPLE`可用
 * @property {number} icon - 列表项被选中时的选中图标，放在文字前面，`TYPE.SINGLE`可用
 * @property {function} onPress - 点击列表项的回调函数
 * @property {bool} allowFontScaling - 10040新增 设置字体是否随系统设置的字体大小的设置改变而改变 默认为true。
 * @property {bool} unlimitedHeightEnable - 10040新增 设置控件高度是否自适应。 默认为false，即默认高度
 * @property {number} titleNumberOfLines - 10040新增 设置title字体显示的最大行数 默认为1
 * @property {number} subtitleNumberOfLines - 10040新增 设置title字体显示的最大行数 默认为1
 */

export default class ChoiceItem extends React.Component {
  static contextType = ConfigContext;
  static propTypes = {
    type: PropTypes.oneOf([TYPE.STATELESS, TYPE.SINGLE, TYPE.MULTIPLE]),
    title: PropTypes.string,
    subtitle: PropTypes.string,
    selected: PropTypes.bool,
    color: PropTypes.string,
    icon: PropTypes.number,
    onPress: PropTypes.func,
    unlimitedHeightEnable: PropTypes.bool,
    allowFontScaling: PropTypes.bool,
    titleNumberOfLines: PropTypes.number,
    subtitleNumberOfLines: PropTypes.number,
    titleStyle: Text.propTypes.style,
    subtitleStyle: Text.propTypes.style,
    itemStyleType: PropTypes.number,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint
  };
  static defaultProps = {
    type: TYPE.STATELESS,
    selected: false,
    color: Styles.common.MHGreen,
    icon: Images.common.selectIcon,
    unlimitedHeightEnable: false,
    allowFontScaling: true,
    titleNumberOfLines: 1,
    subtitleNumberOfLines: 1,
    titleStyle: {},
    subtitleStyle: {},
    itemStyleType: 1
  };
  /**
   * @description 选择列表项的类型
   * @enum {string}
   */

  static TYPE = TYPE;
  static ITEM_STYLE_TYPE_1 = 1;
  static ITEM_STYLE_TYPE_2 = 2;

  constructor(props, context) {
    super(props, context);
    this.state = {
      selected: props.selected
    };
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.selected !== this.state.selected) {
      this.setState({
        selected: newProps.selected
      });
    }
  }

  renderIcon() {
    if (this.props.type === TYPE.STATELESS) return null;

    if (!this.state.selected || this.props.type === TYPE.MULTIPLE) {
      return <View style={{
        width: 38,
        height: fatHeight
      }} />;
    }

    return <View style={styles.iconContainer}>
        <Image source={this.props.icon} resizeMode="contain" style={[styles.icon, {
        transform: [{
          scaleX: I18nManager.isRTL ? -1 : 1
        }]
      }]} />
      </View>;
  }

  renderText() {
    const {
      theme
    } = this.context;
    const color = {};
    const textAlign = {};
    if (this.state.selected) color.color = this.props.color;
    if (this.props.type === TYPE.STATELESS) textAlign.textAlign = 'center';
    let adaptedFontStyle = {};

    if (!this.props.unlimitedHeightEnable) {
      adaptedFontStyle = {
        height: undefined,
        lineHeight: undefined
      };
    }

    return <View style={styles.textContainer}>
        <Text style={[styles.title, {
        color: theme.colorBlack
      }, FontPrimary, color, textAlign, adaptedFontStyle, this.props.titleStyle]} numberOfLines={this.props.titleNumberOfLines} allowFontScaling={this.props.allowFontScaling}>
          {this.props.title}
        </Text>
        {this.props.subtitle ? <Text style={[styles.subtitle, {
        color: theme.colorGrayNormal
      }, FontSecondary, color, textAlign, adaptedFontStyle, this.props.subtitleStyle]} numberOfLines={this.props.subtitleNumberOfLines} allowFontScaling={this.props.allowFontScaling}>
                {this.props.subtitle}
              </Text> : null}
      </View>;
  }

  renderCheckbox() {
    if (this.props.type !== TYPE.MULTIPLE) return null;
    return <Checkbox style={{
      width: checkboxSize,
      height: checkboxSize,
      borderRadius: checkboxSize / 2,
      marginRight: 30
    }} checked={this.state.selected} checkedColor={this.props.color} onValueChange={selected => this._onValueChange(selected)} />;
  }

  renderListByStyle(styleTpe, dialogType) {
    if (dialogType === TYPE.SINGLE && styleTpe == ChoiceItem.ITEM_STYLE_TYPE_2) {
      return this.renderListItemStyle2();
    } else {
      return this.renderListItemStyle1();
    }
  }

  renderListItemStyle1() {
    const height = {
      height: thinHeight
    };

    if (this.props.subtitle) {
      height.height = fatHeight;
    }

    const heightStyle = {
      minHeight: height.height,
      height: height.height
    };

    if (this.props.unlimitedHeightEnable) {
      heightStyle.height = null;
    }

    return <View style={[styles.container, heightStyle]}>
      {this.renderIcon()}
      {this.renderText()}
      {this.renderCheckbox()}
    </View>;
  }

  renderListItemStyle2() {
    const backgroundColor = this.props.selected ? 'rgba(50, 186, 192, 0.1)' : '#fff';
    return <View style={[styles.container2, {
      backgroundColor
    }]}>
      {this.renderText()}
      {this.props.selected ? <Image source={Images.common.tick} resizeMode="contain" style={[{
        width: 22
      }, {
        transform: [{
          scaleX: I18nManager.isRTL ? -1 : 1
        }]
      }]} /> : null}
    </View>;
  }

  render() {
    return <TouchableHighlight underlayColor={this.context.theme?.listUnderlayColor} onPress={() => this._onPress()} {...getAccessibilityConfig({
      accessible: this.props.accessible,
      accessibilityRole: AccessibilityRoles.radio,
      accessibilityLabel: this.props.accessibilityLabel,
      accessibilityHint: this.props.accessibilityHint,
      accessibilityState: {
        checked: this.state.selected
      }
    })}>
        {this.renderListByStyle(this.props.itemStyleType, this.props.type)}
      </TouchableHighlight>;
  }

  _onValueChange(selected) {
    // this.state.selected = selected;
    this.setState({
      selected
    });

    if (this.props.onPress) {
      this.props.onPress(selected);
    }
  }

  _onPress() {
    const {
      type
    } = this.props;
    let selected = this.state.selected;

    if (type !== TYPE.STATELESS) {
      if (type === TYPE.MULTIPLE) selected = !selected;
      if (type === TYPE.SINGLE) selected = true;
      this.setState({
        selected
      });
    }

    if (this.props.onPress) {
      this.props.onPress(selected);
    }
  }

}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  container2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 27,
    height: 60
  },
  iconContainer: {
    width: 38,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 10,
    height: 10
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    alignSelf: 'stretch',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'left'
  },
  subtitle: {
    alignSelf: 'stretch',
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18,
    textAlign: 'left'
  }
});