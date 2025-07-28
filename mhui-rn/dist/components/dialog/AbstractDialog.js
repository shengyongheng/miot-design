/* eslint-disable  */
// @ts-nocheck
import React from 'react';
import { Dimensions, Modal, Platform, StyleSheet, Text, TouchableWithoutFeedback, View, TouchableHighlight } from 'react-native';
import { Styles } from "../../resources";
import Separator from "../separator/Separator";
import { AccessibilityRoles, getAccessibilityConfig } from "../../utils/accessibility-helper";
import { referenceReport } from "../../decorators/reportDecorator";
import { Locale } from "../../locale";
import { ConfigContext } from "../configProvider";
import Logger from "../../utils/Logger";
import PopButton from "../popButton/PopButton";
import { FontPrimary } from "../../constants/font";
const {
  MODAL_MARGIN
} = Styles;
const {
  width,
  height
} = Dimensions.get('window');
const underlayColor = 'rgba(0,0,0,.05)';

/**
 * 按钮
 * @typedef {Object} Button
 * @property {string} text - 按钮的文字
 * @property {style} style - 按钮的文字样式 10045-此处不允许修改文字颜色
 * @param {bool} allowFontScaling - 10040新增 text是否支持大字体显示，即是否随系统字体大小变化而变化, 默认`true`
 * @param {number} numberOfLines - 10040新增 text文字的行数，默认 undefined (兼容旧版)  10044更新:按钮文字最多显示一行
 * @property {function} callback - 点击按钮的回调函数
 * @param {string} colorType - 10045新增 按钮的颜色类型,只在regular和medium按钮上使用 'blueLayerWhite' | 'grayLayerBlack' | 'grayLayerBlue'
 * @param {boolean} disabled - 10045新增 设为true，禁止交互。
 * @param {object} backgroundColor - 10045新增 自定义按钮背景颜色 { bgColorNormal: string; bgColorPressed: string }
 * @param {string} titleColor - 10045新增 文字颜色
 */

/**
 * @export
 * @author Geeook
 * @since 10021
 * @module AbstractDialog
 * @description 通用弹窗容器，包括头部标题和底部按钮，内容自定义 *[若其他弹窗能够满足业务需求，则尽量不要使用AbstractDialog]*
 * @param {string} animationType - modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype
 * @param {bool} visible - 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible
 * @param {style} style - modal 的自定义样式
 * @param {string} title - 标题
 * @param {string} subtitle - 副标题
 * @param {bool} showTitle - 是否显示标题，如果`false`，整个标题都不显示（包括副标题），默认`true`
 * @param {bool} showSubtitle - 是否显示副标题，默认`false`
 * @param {bool} canDismiss - 是否允许点击蒙层背景隐藏 Modal，默认`true`
 * @param {Button[]} buttons - 按钮数组，定义底部按钮的属性，只能显示1～2个按钮，多传将失效。默认左取消右确定，左灰右绿，点击回调都是隐藏 Modal
 * @param {bool} showButton - 是否显示按钮，默认`true`
 * @param {Object} dialogStyle - 10040新增 控制dialog 一些特有的样式
 * @param {bool} dialogStyle.unlimitedHeightEnable - 10040新增 设置控件高度是否自适应。 默认为false，即默认高度
 * @param {bool} dialogStyle.allowFontScaling - 10040新增 dialog中text是否支持大字体显示，即是否随系统字体大小变化而变化, 默认`true`
 * @param {number} dialogStyle.titleNumberOfLines - 10040新增 控制title 文字的行数， 默认 1行
 * @param {number} dialogStyle.subTitleNumberOfLines - 10040新增 控制subTitle 文字的行数，默认 1行
 * @param {ViewPropTypes.style} dialogStyle.titleStyle - 10040新增 控制title 文字的样式
 * @param {ViewPropTypes.style} dialogStyle.subTitleStyle - 10040新增 控制subTitle 文字的样式
 * @param {function} onDismiss - 点击`Modal`内容外面/取消按钮/确定按钮，Modal隐藏时的回调函数
 * @param {boolean} useNewTheme - 10045新增 是否使用新样式，默认false  10045后 *!必须!* 使用新样式 旧样式将被废弃
 * @param {bool} hasShade - 是否有遮罩层，默认`true`
 * @param {function} onModalHide - 对话框关闭后的回调。onDismiss只会在onRequestClose和button的callback未定义时触发
 * @param {function} onModalShow - 对话框打开后的回调
 */
class AbstractDialog extends React.Component {
  static contextType = ConfigContext;
  static defaultProps = {
    animationType: 'fade',
    visible: false,
    cancelable: true,
    showTitle: true,
    showSubtitle: false,
    dialogStyle: {
      unlimitedHeightEnable: false,
      allowFontScaling: true,
      titleNumberOfLines: 1,
      subTitleNumberOfLines: 1,
      titleStyle: {},
      subTitleStyle: {}
    },
    canDismiss: true,
    buttons: null,
    showButton: true,
    hasShade: true,
    useNewTheme: false
  };

  constructor(props, context) {
    super(props, context);
    referenceReport('AbstractDialog');
    this.state = {
      visible: this.props.visible
    };
    this.MARGIN_MODAL = this.props.useNewTheme ? 0 : 10;
    this.responsiveContentStyle = this.context.media?.screenType === 'tablet' ? {
      width: width * 0.75
    } : {};
    this.responsiveDialogStyle = this.context.media?.screenType === 'tablet' ? {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    } : {};
    this.responsiveDialogModalStyle = this.context.media?.screenType === 'tablet' ? Styles.dialog.padModal : {};
  }

  componentDidMount() {
    if (this.state.visible === true) {
      const {
        onModalShow
      } = this.props;

      if (typeof onModalShow === 'function') {
        onModalShow();
      }
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.visible !== this.state.visible) {
      this.setState({
        visible: newProps.visible
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.visible === false && this.state.visible === true) {
      const {
        onModalShow
      } = this.props;

      if (typeof onModalShow === 'function') {
        onModalShow();
      }
    }

    if (prevState.visible === true && this.state.visible === false) {
      const {
        onModalHide
      } = this.props;

      if (typeof onModalHide === 'function') {
        onModalHide();
      }
    }
  }
  /**
    * 判断 控件高度是否自适应，  true： 自适应，高度不固定， false： 高度固定
    * @private
  */


  _checkUnlimitedHeightEnable() {
    let result = false;

    if (this.props.dialogStyle && this.props.dialogStyle.hasOwnProperty('unlimitedHeightEnable')) {
      result = this.props.dialogStyle.unlimitedHeightEnable;
    }

    return result;
  }
  /**
   * 标题部分
   */


  renderTitle() {
    if (!this.props.showTitle) return null;
    const {
      titleHeightFat,
      titleHeightThin
    } = Styles.dialog.title;
    const {
      theme
    } = this.context;
    let height = {
      height: this.props.showSubtitle ? titleHeightFat : titleHeightThin
    };
    const marginBottom = this.props.showSubtitle ? {
      marginBottom: 0
    } : {};
    const language = this.context.language;
    let titleLines = 1;

    if (language !== 'zh') {
      // 当前米家 app 语言不是中文
      titleLines = 3;
      height.maxHeight = 86;
    } // 只给安卓手机设置字体为空字符串


    const fontFamily = {};

    if (Platform.OS === 'android') {
      // Android 设备或模拟器
      fontFamily.fontFamily = '';
    }

    let titleNumberOfLines = titleLines;
    let subTitleNumberOfLines = 1;

    if (this.props.dialogStyle) {
      if (this.props.dialogStyle.hasOwnProperty('titleNumberOfLines') && this.props.dialogStyle.titleNumberOfLines > 1) {
        titleNumberOfLines = this.props.dialogStyle.titleNumberOfLines;
        height = null;
      }

      if (this.props.dialogStyle.hasOwnProperty('subTitleNumberOfLines') && this.props.dialogStyle.subTitleNumberOfLines > 1) {
        subTitleNumberOfLines = this.props.dialogStyle.subTitleNumberOfLines;
        height = null;
      }

      if (this._checkUnlimitedHeightEnable()) {
        // unlimitedHeightEnable = true, 不限制高度
        height = null;
      }
    }

    return <View style={[styles.titleContainer, height, {
      backgroundColor: 'transparent'
    }]} {...getAccessibilityConfig({
      accessible: this.props.accessible,
      accessibilityRole: AccessibilityRoles.text
    })}>
        <Text numberOfLines={titleNumberOfLines} allowFontScaling={this.props.dialogStyle.allowFontScaling} style={[{
        width: Styles.dialog.modal.width * 0.75,
        textAlign: 'center',
        fontSize: 16,
        color: theme.colorBlack,
        marginTop: height ? 7 : 10
      }, marginBottom, FontPrimary, this.props.dialogStyle.titleStyle]}>
          {this.props.title || ''}
        </Text>
        {this.props.showSubtitle ? <Text numberOfLines={subTitleNumberOfLines} allowFontScaling={this.props.dialogStyle.allowFontScaling} style={[Styles.dialog.subtitle, {
        color: theme.colorGrayNormal,
        marginTop: 5
      }, this.props.dialogStyle.subTitleStyle]}>
              {this.props.subtitle}
            </Text> : null}
      </View>;
  }
  /**
   * 中间内容
   */


  renderContent() {
    if (this.props.children) return this.props.children;
    return <View {...getAccessibilityConfig({
      accessible: this.props.accessible,
      accessibilityRole: AccessibilityRoles.text
    })}>
        {this.props.useNewTheme ? null : <Separator />}
        <View style={[styles.content, this.responsiveContentStyle]}>
          <Text>⬆️可自定义标题和副标题⬆️</Text>
          <Text>可自定义内容</Text>
          <Text>⬇️可自定义按钮文字和样式⬇️</Text>
        </View>
        {this.props.useNewTheme ? null : <Separator />}
      </View>;
  }
  /**
   * 底部按钮
   */


  renderButtonGroup() {
    if (!this.props.showButton) return null;
    let {
      buttons
    } = this.props;

    if (!buttons) {
      buttons = [{
        text: Locale.of(this.context.language).cancel
      }, {
        text: Locale.of(this.context.language).ok
      }];
    }

    if (this.props.useNewTheme) {
      if (buttons.length === 1) return this.renderOneButton(buttons);
      if (buttons.length === 2) return this.renderTwoButtons(buttons);
    } else {
      if (buttons.length === 1) return this.renderOneButtonDeprecated(buttons);
      if (buttons.length === 2) return this.renderTwoButtonsDeprecated(buttons);
    }

    Logger.warn('只允许设置1～2个按钮');
    return null;
  }
  /**
    * 一个按钮
    * @param {object[]} buttons
    */


  renderOneButton(buttons) {
    const button0 = buttons[0];
    if (typeof button0 !== 'object') return null;
    let callback = button0.callback;

    if (callback === undefined || !(callback instanceof Function)) {
      callback = () => this.dismiss();
    }

    let height = Styles.dialog.buttons.height;
    let buttonNumberOfLines;

    if (button0.hasOwnProperty('numberOfLines')) {
      buttonNumberOfLines = button0.numberOfLines;

      if (buttonNumberOfLines > 1) {
        height = null;
      }
    }

    let allowFontScaling = this.props.dialogStyle.allowFontScaling;

    if (button0.hasOwnProperty('allowFontScaling')) {
      allowFontScaling = button0.allowFontScaling;
    }

    if (this._checkUnlimitedHeightEnable()) {
      height = null;
    }

    const {
      theme
    } = this.context;
    return <View style={[Styles.dialog.button, {
      height
    }]}>
        <PopButton sizeLevel='regular' title={button0.text || Locale.of(this.context.language).cancel} titleStyle={button0.style} titleColor={button0.titleColor} onPress={callback} colorType={button0.colorType || 'blueLayerWhite'} disabled={button0.disabled} backgroundColor={button0.backgroundColor} allowFontScaling={allowFontScaling} {...getAccessibilityConfig({
        accessible: this.props.accessible,
        accessibilityRole: AccessibilityRoles.button,
        accessibilityHint: button0.accessibilityHint
      })} />
      </View>;
  }
  /**
   * 两个按钮
   * @param {object[]} buttons
   */


  renderTwoButtons(buttons) {
    const button0 = buttons[0];
    const button1 = buttons[1];
    if (typeof button0 !== 'object' || typeof button1 !== 'object') return null;
    let callback0 = button0.callback;
    let callback1 = button1.callback;

    if (callback0 === undefined || !(callback0 instanceof Function)) {
      callback0 = () => this.dismiss();
    }

    if (callback1 === undefined || !(callback1 instanceof Function)) {
      callback1 = () => this.dismiss();
    }

    let height = Styles.dialog.buttons.height;
    let button0NumberOfLines;
    let button1NumberOfLines;

    if (button0.hasOwnProperty('numberOfLines')) {
      button0NumberOfLines = button0.numberOfLines;

      if (button0NumberOfLines > 1) {
        height = null;
      }
    }

    if (button1.hasOwnProperty('numberOfLines')) {
      button1NumberOfLines = button1.numberOfLines;

      if (button1NumberOfLines > 1) {
        height = null;
      }
    }

    if (this._checkUnlimitedHeightEnable()) {
      height = null;
    }

    let button0AllowFontScaling = this.props.dialogStyle.allowFontScaling;
    let button1AllowFontScaling = button0AllowFontScaling;

    if (button0.hasOwnProperty('allowFontScaling')) {
      button0AllowFontScaling = button0.allowFontScaling;
    }

    if (button1.hasOwnProperty('allowFontScaling')) {
      button1AllowFontScaling = button0.allowFontScaling;
    }

    const {
      theme
    } = this.context;
    return <View style={[Styles.dialog.buttons, {
      height
    }]}>
        <PopButton sizeLevel='medium' style={{
        marginRight: 8
      }} title={button0.text || Locale.of(this.context.language).cancel} titleStyle={button0.style} titleColor={button0.titleColor} onPress={callback0} colorType={button0.colorType} disabled={button0.disabled} backgroundColor={button0.backgroundColor} allowFontScaling={button0AllowFontScaling} {...getAccessibilityConfig({
        accessible: this.props.accessible,
        accessibilityRole: AccessibilityRoles.button,
        accessibilityHint: button0.accessibilityHint
      })}>
        </PopButton>
        <PopButton sizeLevel='medium' style={{
        marginLeft: 8
      }} title={button1.text || Locale.of(this.context.language).ok} titleStyle={button1.style} titleColor={button1.titleColor} onPress={callback1} colorType={button1.colorType || 'blueLayerWhite'} disabled={button1.disabled} backgroundColor={button1.backgroundColor} allowFontScaling={button1AllowFontScaling} {...getAccessibilityConfig({
        accessible: this.props.accessible,
        accessibilityRole: AccessibilityRoles.button,
        accessibilityHint: button1.accessibilityHint
      })} />
      </View>;
  }

  render() {
    const {
      theme
    } = this.context;
    let width, height;

    if (Platform.OS === 'ios' && this.context.media.screenType !== 'tablet') {
      width = Dimensions.get('screen').width;
      height = Dimensions.get('screen').height;
    } else {
      width = Dimensions.get('window').width;
      height = Dimensions.get('window').height;
    }

    return <Modal animationType={this.props.animationType} transparent visible={this.state.visible} onRequestClose={() => this.dismiss()} {...getAccessibilityConfig({
      accessible: false
    })}>
        <View style={[Styles.dialog.background, {
        backgroundColor: this.props.hasShade ? theme.colorOverLayerBlack : 'transparent'
      }, this.responsiveDialogStyle]} {...getAccessibilityConfig({
        accessible: false
      })}>
          <TouchableWithoutFeedback onPress={() => this.layerDismiss()} {...getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityRole: AccessibilityRoles.button,
          accessibilityLabel: this.props.layerDismissAccessibilityHint || Locale.of(this.context.language).cancel
        })} onAccessibilityTap={() => this.layerDismiss()}>
            <View style={{
            width,
            height
          }} />
          </TouchableWithoutFeedback>
          <View style={[Styles.dialog.modal, {
          backgroundColor: theme.colorForeground,
          width: width - this.MARGIN_MODAL * 2,
          marginHorizontal: this.MARGIN_MODAL
        }, this.props.useNewTheme ? null : styles.modalDeprecated, this.props.style, this.responsiveDialogModalStyle]}>
            {this.renderTitle()}
            {this.renderContent()}
            {this.renderButtonGroup()}
          </View>
        </View>
      </Modal>;
  }
  /**
   * 隐藏 Modal
   */


  dismiss() {
    if (this.props.cancelable) {
      this.setState({
        visible: false
      });
      this.props.onDismiss && this.props.onDismiss();
    }
  }

  layerDismiss() {
    if (this.props.canDismiss) {
      this.setState({
        visible: false
      });
      this.props.onDismiss && this.props.onDismiss();
    }
  }
  /**
  * 一个按钮-Deprecated
  * @param {object[]} buttons
  */


  renderOneButtonDeprecated(buttons) {
    const button0 = buttons[0];
    if (typeof button0 !== 'object') return null;
    let callback = button0.callback;

    if (callback === undefined || !(callback instanceof Function)) {
      callback = () => this.dismiss();
    }

    let height = Styles.dialog.buttons.height;
    let buttonNumberOfLines;

    if (button0.hasOwnProperty('numberOfLines')) {
      buttonNumberOfLines = button0.numberOfLines;

      if (buttonNumberOfLines > 1) {
        height = null;
      }
    }

    let allowFontScaling = this.props.dialogStyle.allowFontScaling;

    if (button0.hasOwnProperty('allowFontScaling')) {
      allowFontScaling = button0.allowFontScaling;
    }

    if (this._checkUnlimitedHeightEnable()) {
      height = null;
    }

    const {
      theme
    } = this.context;
    return <View style={[styles.buttons, {
      height
    }]}>
        <TouchableHighlight style={{
        flex: 1
      }} onPress={callback} underlayColor={underlayColor} {...getAccessibilityConfig({
        accessible: this.props.accessible,
        accessibilityRole: AccessibilityRoles.button,
        accessibilityHint: button0.accessibilityHint
      })}>
          <View style={Styles.dialog.button}>
            <Text style={[Styles.dialog.buttonText, {
            color: theme.colorGrayNormal
          }, button0.style]} numberOfLines={buttonNumberOfLines} allowFontScaling={allowFontScaling}>
              {button0.text || Locale.of(this.context.language).ok}
            </Text>
          </View>
        </TouchableHighlight>
      </View>;
  }
  /**
   * 两个按钮-Deprecated
   * @param {object[]} buttons
   */


  renderTwoButtonsDeprecated(buttons) {
    const button0 = buttons[0];
    const button1 = buttons[1];
    if (typeof button0 !== 'object' || typeof button1 !== 'object') return null;
    let callback0 = button0.callback;
    let callback1 = button1.callback;

    if (callback0 === undefined || !(callback0 instanceof Function)) {
      callback0 = () => this.dismiss();
    }

    if (callback1 === undefined || !(callback1 instanceof Function)) {
      callback1 = () => this.dismiss();
    }

    let height = Styles.dialog.buttons.height;
    let button0NumberOfLines;
    let button1NumberOfLines;

    if (button0.hasOwnProperty('numberOfLines')) {
      button0NumberOfLines = button0.numberOfLines;

      if (button0NumberOfLines > 1) {
        height = null;
      }
    }

    if (button1.hasOwnProperty('numberOfLines')) {
      button1NumberOfLines = button1.numberOfLines;

      if (button1NumberOfLines > 1) {
        height = null;
      }
    }

    if (this._checkUnlimitedHeightEnable()) {
      height = null;
    }

    let button0AllowFontScaling = this.props.dialogStyle.allowFontScaling;
    let button1AllowFontScaling = button0AllowFontScaling;

    if (button0.hasOwnProperty('allowFontScaling')) {
      button0AllowFontScaling = button0.allowFontScaling;
    }

    if (button1.hasOwnProperty('allowFontScaling')) {
      button1AllowFontScaling = button0.allowFontScaling;
    }

    const {
      theme
    } = this.context;
    return <View style={[styles.buttons, {
      height
    }]}>
        <TouchableHighlight style={{
        flex: 1
      }} onPress={callback0} underlayColor={underlayColor} {...getAccessibilityConfig({
        accessible: this.props.accessible,
        accessibilityRole: AccessibilityRoles.button,
        accessibilityHint: button0.accessibilityHint
      })}>
          <View style={Styles.dialog.button}>
            <Text style={[Styles.dialog.buttonText, {
            color: theme.colorGrayNormal
          }, button0.style]} numberOfLines={button0NumberOfLines} allowFontScaling={button0AllowFontScaling}>
              {button0.text || Locale.of(this.context.language).cancel}
            </Text>
          </View>
        </TouchableHighlight>
        {Platform.select({
        android: <Separator type="column" style={{
          flex: 1
        }} />,
        ios: <Separator type="column" style={{
          height: '100%'
        }} />
      })}
        <TouchableHighlight style={{
        flex: 1
      }} onPress={callback1} underlayColor={underlayColor} {...getAccessibilityConfig({
        accessible: this.props.accessible,
        accessibilityRole: AccessibilityRoles.button,
        accessibilityHint: button1.accessibilityHint
      })}>
          <View style={Styles.dialog.button}>
            <Text style={[Styles.dialog.buttonText, {
            color: theme.colorPrimary
          }, button1.style]} numberOfLines={button1NumberOfLines} allowFontScaling={button1AllowFontScaling}>
              {button1.text || Locale.of(this.context.language).ok}
            </Text>
          </View>
        </TouchableHighlight>
      </View>;
  }

}

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    width: width - 10 * 2,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalDeprecated: {
    bottom: 20,
    paddingBottom: 0,
    borderRadius: 20
  },
  buttons: {
    height: 46,
    // 底部按钮的高度
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    // 'space-around',
    alignItems: 'center',
    flex: 1
  }
});
export default AbstractDialog;