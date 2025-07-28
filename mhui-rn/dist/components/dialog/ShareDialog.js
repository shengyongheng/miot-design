/* eslint-disable  */
// @ts-nocheck
import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View, TouchableOpacity, Platform } from 'react-native';
import Swiper from 'react-native-swiper';
import { Images, Styles } from "../../resources";
import Checkbox from "../checkbox/Checkbox";
import AbstractDialog from "./AbstractDialog";
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from "../../utils/accessibility-helper";
import { referenceReport } from "../../decorators/reportDecorator";
import { ConfigContext } from "../configProvider";
const paddingHorizontal = 40; // 内容的左右边距

const paddingBottomSmall = 20; // 内容的上下边距

const paddingBottomLarge = 28; // 内容的上下边距

const iconSize = 48; // 图标尺寸

const optionHeight = iconSize + 32; // 单个选项的高度

const testIcon = Images.common.mihome;
/**
 * 分享选项
 * @typedef {Object} Opiton
 * @property {number} icon - 图标的资源, require('../xx/xx.png')
 * @property {string} text - 图标下方的文字说明
 * @property {function} callback - 点击图标的回调函数
 */

/**
 * 按钮
 * @typedef {Object} Button
 * @property {string} text - 按钮的文字
 * @property {style} style - 按钮的样式
 * @property {bool} allowFontScaling - 10040新增 text是否支持大字体显示，即是否随系统字体大小变化而变化, 默认`true`
 * @property {number} numberOfLines - 10040新增 text文字的行数， 默认 undefined (兼容旧版)
 * @property {function} callback - 点击按钮的回调函数
 * @property {object} backgroundColor - 10045新增 自定义按钮背景颜色 { bgColorNormal: string; bgColorPressed: string }
 * @property {string} titleColor - 10045新增 文字颜色
 */

/**
 * @export
 * @author Geeook
 * @since 10021
 * @module ShareDialog
 * @description 分享弹窗，弹窗让用户指定分享渠道
 * @param {string} animationType - modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype
 * @param {bool} visible - 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible
 * @param {string} title - 标题文字
 * @param {Object} dialogStyle - 10040新增 控制dialog 一些特有的样式
 * @param {bool} dialogStyle.allowFontScaling - 10040新增 dialog中text是否支持大字体显示，即是否随系统字体大小变化而变化, 默认`true`
 * @param {number} dialogStyle.titleNumberOfLines - 10040新增 控制title 文字的行数， 默认 1行
 * @param {number} dialogStyle.itemTextNumberOfLines - 10040新增 控制每个选项 文字的行数， 默认 1行
 * @param {bool} dialogStyle.unlimitedHeightEnable - 10040新增 设置控件高度是否自适应。 默认为false，即默认高度
 * @param {ViewPropTypes.style} dialogStyle.titleStyle - 10040新增 控制title 文字的样式
 * @param {ViewPropTypes.style} dialogStyle.itemTextStyle - 10040新增 控制item 文字的样式
 * @param {ViewPropTypes.style} dialogStyle.extraTextStyle - 10045新增 控制checkedBox 文字的样式
 * @param {number} dialogStyle.extraTextNumberOfLines - 10045新增 控制 extraText 文字的行数，默认 1行
 * @param {Opiton[]} options - 分享选项，当可选项 >8 个时，允许左右滑动分页
 * @param {Button[]} buttons - 按钮数组，定义底部按钮的属性，只能显示1～2个按钮，多传将失效。默认左取消右确定，左灰右绿，点击回调都是隐藏 Modal
 * @param {function} onDismiss - Modal 隐藏时的回调函数
 * @param {boolean} checked - 10045新增 勾选框的初始状态
 * @param {string} checkColor - 10045新增 勾选框的勾选颜色，默认米家绿
 * @param {string} extraText - 10045新增 勾选框右侧的说明文字 无说明文字则无勾选框
 * @param {function} onModalHide - 对话框关闭后的回调。onDismiss只会在onRequestClose和button的callback未定义时触发
 * @param {function} onModalShow - 对话框打开后的回调
 * @param {object} modalStyle - 10052新增 自定义弹窗样式[应用于横屏时 弹窗被刘海遮挡等场景，与dialogStyle区分]
 * @param {bool} canDismiss - 点击背景时是否隐藏，默认 true
 */

class ShareDialog extends React.Component {
  static contextType = ConfigContext;
  static propTypes = {
    animationType: PropTypes.string,
    visible: PropTypes.bool,
    title: PropTypes.string,
    dialogStyle: PropTypes.object,
    modalStyle: PropTypes.object,
    canDismiss: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.any,
      text: PropTypes.string,
      callback: PropTypes.func,
      accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
      accessibilityHint: AccessibilityPropTypes.accessibilityHint
    })),
    buttons: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      style: PropTypes.any,
      callback: PropTypes.func,
      accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
      accessibilityHint: AccessibilityPropTypes.accessibilityHint
    })),
    onModalShow: PropTypes.func,
    onModalHide: PropTypes.func,
    onDismiss: PropTypes.func,
    accessible: AccessibilityPropTypes.accessible,
    checked: PropTypes.bool,
    checkColor: PropTypes.string,
    extraText: PropTypes.string,
    // CHECKBOX 才有效
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint,
    hasShade: PropTypes.bool
  };
  static defaultProps = {
    options: Array.from({
      length: 6
    }, () => ({
      icon: testIcon,
      text: ['米家', '微信', 'QQ', '微博', '朋友圈', '收藏', '即刻'][~~(Math.random() * 7)],
      callback: () => console.log('分享成功')
    })),
    dialogStyle: {
      unlimitedHeightEnable: false,
      allowFontScaling: true,
      titleNumberOfLines: 1,
      itemTextNumberOfLines: 1
    },
    canDismiss: true,
    checkColor: Styles.common.MHGreen,
    hasShade: true
  }; // UNSAFE_componentWillReceiveProps(newProps) {
  //   if (newProps.visible === true) {
  //     // Android modal swiper bug：在 modal 🀄️不显示 swiper 的内容
  //     // 解决办法：先显示 modal 再显示 swiper
  //     // reference: https://github.com/leecade/react-native-swiper/issues/435#issuecomment-354585864
  //     setTimeout(() => this.setState({ swiperVisible: true }));
  //   } else {
  //     this.setState({ swiperVisible: false });
  //   }
  // }

  constructor(props, context) {
    super(props, context);
    referenceReport('ShareDialog');
    this.state = {
      swiperVisible: false,
      pressed: -1,
      checked: props.checked || false
    }; // 分页

    this.pages = Array.from({
      length: Math.ceil(props.options.length / 8)
    }, (v, i) => props.options.slice(8 * i, 8 * i + 8));
    this.iconMargin = ~~(((this.context.media?.screenType === 'tablet' ? Styles.dialog.padModal.width : Styles.dialog.modal.width) - paddingHorizontal * 2 - iconSize * 4) / 3);
  }

  componentDidMount() {
    this.setState({
      swiperVisible: true
    });
  }
  /**
   * 勾选框
   */


  renderCheckBox() {
    let extraTextNumberOfLines = 1;

    if (this.props.dialogStyle && this.props.dialogStyle.hasOwnProperty('extraTextNumberOfLines')) {
      extraTextNumberOfLines = this.props.dialogStyle.extraTextNumberOfLines;
    }

    return <TouchableOpacity onPress={() => this.onPressCheckbox()} activeOpacity={1} style={{
      paddingTop: 10,
      paddingHorizontal
    }} {...getAccessibilityConfig({
      accessible: false
    })}>
        <View style={styles.extraContainer} {...getAccessibilityConfig({
        accessible: this.props.accessible,
        accessibilityRole: AccessibilityRoles.checkbox,
        accessibilityLabel: this.props.accessibilityLabel || this.props.extraText,
        accessibilityHint: this.props.accessibilityHint,
        accessibilityState: {
          disabled: false,
          checked: this.state.checked
        }
      })}>
          <Checkbox checked={this.state.checked} checkedColor={this.props.checkColor} style={{
          width: 22,
          height: 22,
          borderRadius: 11
        }} onValueChange={checked => {
          this.setState({
            checked
          });
        }} />
          <Text style={[styles.checkboxText, {
          color: this.context.theme?.colorGrayHeavier
        }, this.props.dialogStyle.extraTextStyle]} numberOfLines={extraTextNumberOfLines} allowFontScaling={this.props.dialogStyle.allowFontScaling}>
            {this.props.extraText || ''}
          </Text>
        </View>
      </TouchableOpacity>;
  }
  /**
   * 一页 icons
   * @param {Opiton[]} options
   * @param {number} index
   */


  renderIcons(options, index) {
    let numberOfLines = 1;

    if (this.props.dialogStyle && this.props.dialogStyle.hasOwnProperty('itemTextNumberOfLines')) {
      numberOfLines = this.props.dialogStyle.itemTextNumberOfLines;
    }

    const {
      theme
    } = this.context;
    return <View key={`${index}0`} style={styles.optionsPage}>
        {options.map((option, index) => {
        if (option === undefined) return null;
        const marginLeft = index % 4 === 0 ? {} : {
          marginLeft: this.iconMargin
        };
        const scale = this.state.pressed === index ? 0.95 : 1;
        const opacity = this.state.pressed === index ? 0.88 : 1;
        return <TouchableWithoutFeedback key={index + (option.text || '')} onPress={option.callback} onPressIn={() => this.setState({
          pressed: index
        })} onPressOut={() => this.setState({
          pressed: -1
        })} {...getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityRole: AccessibilityRoles.button,
          accessibilityLabel: option.accessibilityLabel || option.text || '',
          accessibilityHint: option.accessibilityHint
        })}>
              <View style={[styles.optionContainer, marginLeft]}>
                <Image style={[styles.icon, {
              transform: [{
                scale
              }]
            }]} source={option.icon} resizeMode="center" />
                <Text style={[styles.optionText, {
              opacity,
              color: theme.colorGrayHeavier
            }, this.props.dialogStyle.itemTextStyle]} numberOfLines={numberOfLines} allowFontScaling={this.props.dialogStyle.allowFontScaling}>
                  {option.text || ''}
                </Text>
              </View>
            </TouchableWithoutFeedback>;
      })}
      </View>;
  }
  /**
   * 一页或者分页
   * @param {Opiton[]} options
   */


  renderIconsPages(options) {
    if (options.length < 9) return this.renderIcons(options, 0);
    if (!this.state.swiperVisible) return <View style={styles.swiper} />;
    const {
      theme
    } = this.context;
    return <Swiper style={styles.swiper} autoplay={false} loop={false} paginationStyle={styles.paginationStyle} dotColor="rgba(0,0,0,0.2)" activeDotColor={theme.colorPrimary} dotStyle={styles.dot} activeDotStyle={styles.dot} {...{
      accessibilityLabel: '',
      accessibilityHint: Platform.OS === 'ios' ? '' : ' '
    }}>
        {this.pages.map((options, index) => this.renderIcons(options, index))}
      </Swiper>;
  }

  render() {
    const {
      theme
    } = this.context;
    const paddingBottom = this.props.options.length > 8 ? {
      paddingBottom: paddingBottomLarge
    } : {
      paddingBottom: paddingBottomSmall
    };
    const hasCheckBox = !!this.props.extraText;
    return <AbstractDialog hasShade={this.props.hasShade} animationType={this.props.animationType} visible={this.props.visible} title={this.props.title} dialogStyle={this.props.dialogStyle} buttons={this.props.buttons} onModalShow={this.props.onModalShow} onModalHide={this.props.onModalHide} onDismiss={() => this._onDismiss()} style={this.props.modalStyle} canDismiss={this.props.canDismiss} useNewTheme>
        <View style={[styles.container, {
        backgroundColor: theme.colorForeground
      }, paddingBottom]}>
          {this.renderIconsPages(this.props.options)}
          {hasCheckBox && this.renderCheckBox()}
        </View>
      </AbstractDialog>;
  }

  _onDismiss() {
    //this.setState({ swiperVisible: false });
    this.props.onDismiss && this.props.onDismiss();
  }

  onPressCheckbox() {
    this.setState({
      checked: !this.state.checked
    });
  }

}

const styles = StyleSheet.create({
  container: {
    borderRadius: Styles.dialog.modal.borderRadius
  },
  extraContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  swiper: {
    height: optionHeight * 2 + 13,
    marginTop: 9
  },
  optionsPage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal
  },
  optionContainer: {
    minHeight: optionHeight,
    alignItems: 'center'
  },
  icon: {
    width: iconSize,
    height: iconSize
  },
  optionText: {
    marginTop: 4,
    marginBottom: 10,
    width: iconSize,
    textAlign: 'center',
    fontSize: 12
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 0
  },
  dot: {
    width: 6,
    height: 6
  },
  checkboxText: {
    flex: 1,
    marginLeft: 7,
    fontSize: 14,
    color: '#333333'
  }
});
export default ShareDialog;