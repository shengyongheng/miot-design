/* eslint-disable  */
// @ts-nocheck
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import ChoiceItem from "../listItem/ChoiceItem";
import AbstractDialog from "./AbstractDialog";
import { AccessibilityPropTypes, getAccessibilityConfig } from "../../utils/accessibility-helper";
import { referenceReport } from "../../decorators/reportDecorator";
/**
 * @description 选择弹窗的类型
 * @enum {string}
 */

const TYPE = {
  /**
   * 单选弹窗，将不显示底部按钮，点击某项之后弹窗消失
   */
  SINGLE: 'single',

  /**
   * 多选弹窗
   */
  MULTIPLE: 'multiple'
};
Object.freeze(TYPE);
/**
 * 可选项
 * @typedef {Object} Opiton
 * @property {string} title - 主文案
 * @property {string} subtitle - 副文案
 * @property {string} accessibilityLabel - option 的无障碍配置项
 * @property {string} accessibilityHint - option 的无障碍配置项
 */

/**
 * 按钮
 * @typedef {Object} Button
 * @property {string} text - 按钮的文字
 * @property {style} style - 按钮的样式
 * @property {function} callback - 点击按钮的回调函数
 * @property {object} backgroundColor - 10045新增 自定义按钮背景颜色 { bgColorNormal: string; bgColorPressed: string }
 * @property {string} titleColor - 10045新增 文字颜色
 */

/**
 * @export
 * @author Geeook
 * @since 10022
 * @module ChoiceDialog
 * @description 选项弹窗，有选择态，可以定义是单选还是多选
 * @param {string} animationType - modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype
 * @param {TYPE} type - 选项弹窗类型，定义是单选弹窗还是多选弹窗，默认是单选弹窗
 * @param {bool} visible - 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible
 * @param {string} title - 标题
 * @param {Opiton[]} options - 可选项
 * @param {number[]} selectedIndexArray - 选中选项的下标，默认全部未选中
 * @param {string} color - 选中态颜色，单选时表示选中文字颜色，多选时表示勾选框勾选背景颜色，默认米家绿
 * @param {number} icon - 选项被选中时的选中图标，放在文字前面，`TYPE.SINGLE`可用，默认绿色右箭头图片
 * @param {Button[]} buttons - 按钮数组，定义底部按钮的属性，只能显示1～2个按钮，多传将失效。默认左取消右确定，左灰右绿，点击回调都是隐藏 Modal
 * @param {Object} dialogStyle - 控制dialog 一些特有的样式
 * @param {bool} dialogStyle.allowFontScaling - dialog中text是否支持大字体显示，即是否随系统字体大小变化而变化, 默认`true`
 * @param {bool} dialogStyle.unlimitedHeightEnable - 设置控件高度是否自适应。 默认为false，即默认高度
 * @param {ViewPropTypes.style} dialogStyle.titleStyle - 控制title 文字的样式
 * @param {style} dialogStyle.itemTitleStyle - 控制item  title 样式
 * @param {style} dialogStyle.itemSubtitleStyle - 控制item  subtitle 样式
 * @param {bool} dialogStyle.itemTitleNumberOfLines - 控制item  title 行数 默认为1
 * @param {bool} dialogStyle.itemSubtitleNumberOfLines - 控制item  subtitle 行数 默认为1
 * @param {function} onSelect - 选项选择后的确认回调，返回选中选项的下标数组，`TYPE.SINGLE`可用 [旧样式：点击选项后立即调用onSelect并隐藏弹窗，新样式：点击选项并点击确认按钮后才调用onSelect, 推荐将单选的相关逻辑放在button的回调中处理]
 * @param {function} onDismiss - Modal 隐藏时的回调函数
 * @property {bool} useNewType - 10045新增 是否使用新样式 10045以后*!必须!*使用新样式
 * @param {function} onModalHide - 对话框关闭后的回调。onDismiss只会在onRequestClose和button的callback未定义时触发
 * @param {function} onModalShow - 对话框打开后的回调
 * @param {object} modalStyle - 10048新增 自定义弹窗样式[应用于横屏时 弹窗被刘海遮挡等场景，与dialogStyle区分]
 * @param {bool} canDismiss - 点击背景时是否隐藏，默认 true
 */

class ChoiceDialog extends React.Component {
  static propTypes = {
    animationType: PropTypes.string,
    type: PropTypes.oneOf([TYPE.STATELESS, TYPE.SINGLE, TYPE.MULTIPLE]),
    visible: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
      accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
      accessibilityHint: AccessibilityPropTypes.accessibilityHint
    })),
    selectedIndexArray: PropTypes.arrayOf(PropTypes.number),
    color: PropTypes.string,
    icon: PropTypes.number,
    buttons: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      style: PropTypes.any,
      callback: PropTypes.func
    })),
    title: PropTypes.string,
    dialogStyle: PropTypes.object,
    onSelect: PropTypes.func,
    onDismiss: PropTypes.func,
    onModalShow: PropTypes.func,
    onModalHide: PropTypes.func,
    canDismiss: PropTypes.func,
    accessible: AccessibilityPropTypes.accessible,
    hasShade: PropTypes.bool,
    itemStyleType: PropTypes.number
  };
  static defaultProps = {
    useNewType: false,
    type: TYPE.SINGLE,
    options: [],
    selectedIndexArray: [],
    dialogStyle: {
      allowFontScaling: true,
      unlimitedHeightEnable: false,
      titleStyle: {},
      itemTitleStyle: {},
      itemSubtitleStyle: {},
      itemTitleNumberOfLines: 1,
      itemSubtitleNumberOfLines: 1
    },
    canDismiss: true,
    hasShade: true,
    itemStyleType: 1
  };
  /**
   * @description 选择弹窗的类型
   * @enum {string}
   */

  static TYPE = TYPE;

  constructor(props, context) {
    super(props, context);
    referenceReport('ChoiceDialog');
    const buttons = props.buttons;

    if (buttons instanceof Array) {
      const button = buttons[buttons.length - 1]; // 取最后一个按钮进行拦截

      if (button && button.callback) {
        const callbackOrigin = button.callback;

        button.callback = () => {
          const selectedIndexArray = [];
          let selectedIndex; // 仅对新版单选有效,点击确认按钮后才调用onSelect

          for (let i = 0; i < this.state.selectedArray.length; i++) {
            const item = this.state.selectedArray[i];

            if (item) {
              selectedIndexArray.push(i);
              selectedIndex = i;
            }
          }

          if (this.props.type === TYPE.SINGLE) this.props.onSelect && this.props.onSelect([selectedIndex]);
          callbackOrigin(selectedIndexArray);
        };
      }
    }

    this.buttons = buttons;
    const selectedArray = Array.from({
      length: props.options.length
    }, (v, i) => props.selectedIndexArray.includes(i));
    this.state = {
      visible: props.visible,
      selectedArray
    };
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.visible !== this.state.visible) {
      this.setState({
        visible: newProps.visible
      });
    }

    const selectedArray = Array.from({
      length: newProps.options.length
    }, (v, i) => newProps.selectedIndexArray.includes(i));
    this.setState({
      selectedArray
    });
  }

  _onPress(selected, index) {
    if (selected) console.log(`第${index + 1}项被选中`);else console.log(`第${index + 1}项取消选中`);

    if (this.props.type === TYPE.SINGLE) {
      const selectedArray = Array.from({
        length: this.props.options.length
      }, () => false);
      selectedArray[index] = selected;

      if (this.props.useNewType) {
        this.setState({
          selectedArray // 10045修改为点击选项不直接消失，点击确认才消失

        });
      } else {
        this.setState({
          selectedArray,
          visible: false
        });

        this._onDismiss();

        this.props.onSelect && this.props.onSelect([index]);
      }
    } else {
      const selectedArray = this.state.selectedArray;
      selectedArray[index] = selected;
      this.setState({
        selectedArray
      });
    }
  }

  _onDismiss() {
    this.props.onDismiss && this.props.onDismiss();
  }

  render() {
    const showButton = this.props.type === TYPE.MULTIPLE || this.props.useNewType;
    return <AbstractDialog animationType={this.props.animationType} visible={this.state.visible} title={this.props.title} dialogStyle={this.props.dialogStyle} showButton={showButton} buttons={this.buttons} style={this.props.modalStyle} useNewTheme onModalShow={this.props.onModalShow} onModalHide={this.props.onModalHide} onDismiss={() => this._onDismiss()} canDismiss={this.props.canDismiss} hasShade={this.props.hasShade} {...getAccessibilityConfig({
      accessibilityLabel: this.props.accessible
    })}>
        <View style={{
        marginBottom: 16
      }}>
          {this.props.options.map((option, index) => <View key={(option.title || '') + index}>
              <ChoiceItem type={this.props.type} title={option.title || ''} titleStyle={this.props.dialogStyle.itemTitleStyle} subtitleStyle={this.props.dialogStyle.itemSubtitleStyle} allowFontScaling={this.props.dialogStyle.allowFontScaling} unlimitedHeightEnable={this.props.dialogStyle.unlimitedHeightEnable} titleNumberOfLines={this.props.dialogStyle.itemTitleNumberOfLines} subtitleNumberOfLines={this.props.dialogStyle.itemSubtitleNumberOfLines} subtitle={option.subtitle || ''} selected={this.state.selectedArray[index]} color={this.props.color} icon={this.props.icon} itemStyleType={this.props.itemStyleType} onPress={selected => this._onPress(selected, index)} {...getAccessibilityConfig({
            accessible: this.props.accessible,
            accessibilityLabel: option.accessibilityLabel,
            accessibilityHint: option.accessibilityHint
          })} />
            </View>)}
        </View>
      </AbstractDialog>;
  }

}

export default ChoiceDialog;