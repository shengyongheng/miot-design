/* eslint-disable  */
// @ts-nocheck
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View, Animated, I18nManager } from 'react-native';
import { Styles } from "../../resources";
import AbstractDialog from "./AbstractDialog";
import { ConfigContext } from "../configProvider";
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from "../../utils/accessibility-helper";
import { referenceReport } from "../../decorators/reportDecorator";
import { Locale } from "../../locale/index";
import { formatString } from "../../utils/string";
const padding = 27;
const INDETERMINATE_WIDTH_FACTOR = 0.3;
const BAR_WIDTH_ZERO_POSITION = INDETERMINATE_WIDTH_FACTOR / (1 + INDETERMINATE_WIDTH_FACTOR);

class ProgressBar extends React.Component {
  static propTypes = {
    animated: PropTypes.bool,
    borderColor: PropTypes.string,
    borderRadius: PropTypes.number,
    borderWidth: PropTypes.number,
    children: PropTypes.node,
    color: PropTypes.string,
    height: PropTypes.number,
    indeterminate: PropTypes.bool,
    indeterminateAnimationDuration: PropTypes.number,
    onLayout: PropTypes.func,
    progress: PropTypes.number,
    style: PropTypes.any,
    unfilledColor: PropTypes.string,
    width: PropTypes.number,
    useNativeDriver: PropTypes.bool,
    animationConfig: PropTypes.object,
    animationType: PropTypes.oneOf(['decay', 'timing', 'spring'])
  };
  static defaultProps = {
    animated: true,
    borderRadius: 4,
    borderWidth: 1,
    color: 'rgba(0, 122, 255, 1)',
    height: 6,
    indeterminate: false,
    indeterminateAnimationDuration: 1000,
    progress: 0,
    width: 150,
    useNativeDriver: false,
    animationConfig: {
      bounciness: 0
    },
    animationType: 'spring'
  };

  constructor(props) {
    super(props);
    const progress = Math.min(Math.max(props.progress, 0), 1);
    this.state = {
      width: 0,
      progress: new Animated.Value(props.indeterminate ? INDETERMINATE_WIDTH_FACTOR : progress),
      animationValue: new Animated.Value(BAR_WIDTH_ZERO_POSITION)
    };
  }

  componentDidMount() {
    if (this.props.indeterminate) {
      this.animate();
    }
  }

  componentWillReceiveProps(props) {
    if (props.indeterminate !== this.props.indeterminate) {
      if (props.indeterminate) {
        this.animate();
      } else {
        Animated.spring(this.state.animationValue, {
          toValue: BAR_WIDTH_ZERO_POSITION,
          useNativeDriver: props.useNativeDriver
        }).start();
      }
    }

    if (props.indeterminate !== this.props.indeterminate || props.progress !== this.props.progress) {
      const progress = props.indeterminate ? INDETERMINATE_WIDTH_FACTOR : Math.min(Math.max(props.progress, 0), 1);

      if (props.animated) {
        const {
          animationType,
          animationConfig
        } = this.props;
        Animated[animationType](this.state.progress, { ...animationConfig,
          toValue: progress,
          useNativeDriver: props.useNativeDriver
        }).start();
      } else {
        this.state.progress.setValue(progress);
      }
    }
  }

  handleLayout = event => {
    if (!this.props.width) {
      this.setState({
        width: event.nativeEvent.layout.width
      });
    }

    if (this.props.onLayout) {
      this.props.onLayout(event);
    }
  };

  animate() {
    this.state.animationValue.setValue(0);
    Animated.timing(this.state.animationValue, {
      toValue: 1,
      duration: this.props.indeterminateAnimationDuration,
      easing: Easing.linear,
      isInteraction: false,
      useNativeDriver: this.props.useNativeDriver
    }).start(endState => {
      if (endState.finished) {
        this.animate();
      }
    });
  }

  render() {
    const {
      borderColor,
      borderRadius,
      borderWidth,
      children,
      color,
      height,
      style,
      unfilledColor,
      width,
      ...restProps
    } = this.props;
    const innerWidth = Math.max(0, width || this.state.width) - borderWidth * 2;
    const containerStyle = {
      width,
      borderWidth,
      borderColor: borderColor || color,
      borderRadius,
      overflow: 'hidden',
      backgroundColor: unfilledColor
    };
    const progressStyle = {
      backgroundColor: color,
      height,
      transform: [{
        translateX: this.state.animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [innerWidth * -INDETERMINATE_WIDTH_FACTOR, innerWidth]
        })
      }, {
        translateX: this.state.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [innerWidth / (I18nManager.isRTL ? 2 : -2), 0]
        })
      }, {
        // Interpolation a temp workaround for https://github.com/facebook/react-native/issues/6278
        scaleX: this.state.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.0001, 1]
        })
      }]
    };
    return <View style={[containerStyle, style]} onLayout={this.handleLayout} {...restProps}>
        <Animated.View style={progressStyle} />
        {children}
      </View>;
  }

}
/**
 * @export
 * @author Geeook
 * @since 10021
 * @module ProgressDialog
 * @description 进度条弹窗，显示进度条和提示信息
 * @param {string} animationType - modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype
 * @param {bool} visible - 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible
 * @param {string} message - 提示信息文字
 * @param {number} progress - 当前进度，默认`0`
 * @param {string} color - progressBar 填充颜色，默认米家绿
 * @param {string} unfilledColor - progressBar 未填充颜色，默认`#f1f1f1`
 * @param {string} textColor - 进度百分比文字颜色，默认米家绿
 * @param {bool} autoDismiss - 是否在进度条读完之后自动隐藏 Modal, 默认`false`
 * @param {Object} dialogStyle - 10040新增 控制dialog 一些特有的样式
 * @param {bool} dialogStyle.allowFontScaling - 10040新增 dialog中message是否支持大字体显示，即是否随系统字体大小变化而变化, 默认`true`
 * @param {number} dialogStyle.messageNumberOfLines - 10040新增 控制message 文字的行数， 默认 1行
 * @param {ViewPropTypes.style} dialogStyle.messageStyle - 10040新增 控制message 文字的样式
 * @param {ViewPropTypes.style} dialogStyle.progressTextStyle - 10040新增 进度百分比 文字的样式
 * @param {function} onDismiss - Modal 隐藏时的回调函数
 * @param {function} onModalHide - 对话框关闭后的回调。onDismiss只会在onRequestClose和button的callback未定义时触发
 * @param {function} onModalShow - 对话框打开后的回调
 */


class ProgressDialog extends React.Component {
  static contextType = ConfigContext;
  static propTypes = {
    animationType: PropTypes.string,
    visible: PropTypes.bool,
    message: PropTypes.string,
    progress: PropTypes.number,
    color: PropTypes.string,
    unfilledColor: PropTypes.string,
    textColor: PropTypes.string,
    autoDismiss: PropTypes.bool,
    dialogStyle: PropTypes.object,
    onModalShow: PropTypes.func,
    onModalHide: PropTypes.func,
    onDismiss: PropTypes.func,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityValue: AccessibilityPropTypes.accessibilityValue,
    hasShade: PropTypes.bool
  };
  static defaultProps = {
    progress: 0,
    color: Styles.common.MHGreen,
    textColor: Styles.common.MHGreen,
    autoDismiss: false,
    dialogStyle: {
      allowFontScaling: true,
      messageNumberOfLines: 1,
      messageStyle: {},
      progressTextStyle: {}
    },
    hasShade: true
  };

  constructor(props, context) {
    super(props, context);
    referenceReport('ProgressDialog');
    this.state = {
      visible: this.props.visible
    };
    this.responsiveProgressWidth = (this.context.media?.screenType === 'tablet' ? Styles.dialog.padModal.width : Styles.dialog.modal.width) - padding * 2;
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.visible !== this.state.visible) {
      this.setState({
        visible: newProps.visible
      });
    }
  }

  render() {
    if (this.props.autoDismiss && this.state.visible === true && this.props.progress >= 1) {
      // 传参不一定刚好等于1，可能大于1
      this.timer = setTimeout(() => {
        this.setState({
          visible: false
        });
        this.props.onDismiss && this.props.onDismiss();
      }, 350);
    }

    const progressText = formatString(Locale.of(this.context.language).percentage, Math.round(this.props.progress * 100));
    let messageNumberOfLines = 1;

    if (this.props.dialogStyle) {
      if (this.props.dialogStyle.hasOwnProperty('messageNumberOfLines') && this.props.dialogStyle.messageNumberOfLines > 1) {
        messageNumberOfLines = this.props.dialogStyle.messageNumberOfLines;
      }
    }

    let unfilledColor = this.context.theme?.colorBtnGrayNor;

    if (this.props.unfilledColor) {
      unfilledColor = this.props.unfilledColor;
    }

    return <AbstractDialog hasShade={this.props.hasShade} animationType={this.props.animationType} visible={this.state.visible} showTitle={false} onModalShow={this.props.onModalShow} onModalHide={this.props.onModalHide} canDismiss={false} showButton={false} useNewTheme {...getAccessibilityConfig({
      accessible: false
    })}>
        <View style={[styles.container, {
        backgroundColor: this.context.theme?.colorForeground
      }]} {...getAccessibilityConfig({
        accessible: this.props.accessible,
        accessibilityRole: AccessibilityRoles.progressbar,
        accessibilityLabel: this.props.accessibilityLabel,
        accessibilityValue: this.props.accessibilityValue || {
          text: progressText
        }
      })}>
          <View style={styles.messageContainer}>
            <Text numberOfLines={messageNumberOfLines} style={[styles.message, {
            flex: 1,
            color: this.context.theme?.colorGrayHeavier
          }, this.props.dialogStyle.messageStyle]} allowFontScaling={this.props.dialogStyle.allowFontScaling}>
              {this.props.message || ''}
            </Text>
            <Text style={[styles.message, {
            minWidth: 45,
            textAlign: 'right'
          }, {
            color: this.props.textColor
          }, this.props.dialogStyle.progressTextStyle]} numberOfLines={1} allowFontScaling={this.props.dialogStyle.allowFontScaling}>
              {progressText}
            </Text>
          </View>
          <ProgressBar style={{
          marginBottom: messageNumberOfLines > 1 ? 10 : 0
        }} progress={this.props.progress} color={this.props.color} unfilledColor={unfilledColor} width={this.responsiveProgressWidth} height={6} borderRadius={5.5} borderWidth={0} borderColor="#e5e5e5" useNativeDriver />
        </View>
      </AbstractDialog>;
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

}

const styles = StyleSheet.create({
  container: {
    minHeight: 86,
    paddingHorizontal: padding,
    justifyContent: 'center',
    paddingTop: 20,
    borderTopEndRadius: Styles.dialog.modal.borderTopEndRadius,
    borderTopStartRadius: Styles.dialog.modal.borderTopStartRadius
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12
  },
  message: {
    fontSize: 16,
    textAlign: 'left'
  }
});
export default ProgressDialog;