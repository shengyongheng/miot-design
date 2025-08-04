/* eslint-disable  */
// @ts-nocheck
import PropTypes from 'prop-types';
import React from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { referenceReport } from '../../decorators/reportDecorator';
import { Styles } from '../../resources';
import {
  AccessibilityPropTypes,
  AccessibilityRoles,
  getAccessibilityConfig,
} from '../../utils/accessibility-helper';
import Checkbox from '../checkbox/Checkbox';
import { ConfigContext } from '../configProvider';
import AbstractDialog from './AbstractDialog';
import InputView from './InputView';
const paddingHorizontal = 27; // 内容的左右边距

const paddingVertical = 28; // 内容的上下边距

const paddingTop = 9; // 输入框和下方内容的间距

const paddingBottom = 6; // 输入框和上方内容的间距

const { height, width } = Dimensions.get('window');
/**
 * @description 输入弹窗的类型
 * @enum {string}
 */

const TYPE = {
  /**
   * 普通，只有输入框
   */
  SIMPLE: 'simple',

  /**
   * 输入框下方有下划线超链接
   */
  UNDERLINE: 'underline',

  /**
   * 输入框下方有勾选框和文字
   */
  CHECKBOX: 'checkbox',

  /**
   * 输入框下方有下划线超链接
   * 输入框下方有勾选框和文字
   */
  BOTH: 'both',
};
Object.freeze(TYPE);
/**
 * 输入框上方的数据 - Deprecated - 10045后必须使用新下划线样式(更改为输入框下方，并且不能添加左侧说明文字）
 * @typedef {Object} UnderlineData
 * @property {boolean} useNewTheme - 10045新增-之后*必须*使用新下划线样式
 * @property {string} leftText - 左侧说明文字
 * @property {number} leftTextNumberOfLines - 10040新增 左侧文字 默认为1
 * @property {ViewPropTypes.style} leftTextStyle - 10040新增 左侧文字的样式
 * @property {string} underlineText - 右侧下划线文字
 * @property {number} underlineTextNumberOfLines - 10040新增 右侧下划线文字能够显示的行数 默认为1
 * @property {ViewPropTypes.style} underlineTextStyle - 10040新增 右侧下划线文字的样式
 * @property {function} onPress - 点击下划线文字的回调函数
 */

/**
 * 输入框
 * @typedef {Object} Input
 * @property {string} placeholder - 占位文字，参考 https://facebook.github.io/react-native/docs/0.54/textinput#placeholder
 * @property {string} defaultValue - 初始默认文字，参考 https://facebook.github.io/react-native/docs/0.54/textinput#defaultvalue
 * @property {function} onChangeText - 文字变化回调，参考 https://facebook.github.io/react-native/docs/0.54/textinput#onchangetext
 * @property {Object} textInputProps - 其他 TextInput 支持的属性，参考 https://facebook.github.io/react-native/docs/0.54/textinput#props
 * @property {boolean} isCorrect - 10045新增 输入框的结果 - 输入框边框变红，下方显示红色警示文字
 * @property {string} type - 10045新增 输入框的类型 - 'DELETE'带删除键, 'SECURE'密码遮挡, 'NONE'右侧无图案
 * @property {string} borderColor - 获得焦点时的边框高亮色, 默认米家绿
 */

/**
 * 勾选框相关数据
 * @typedef {Object} CheckboxData
 * @property {boolean} checked - 勾选框的初始勾选状态
 * @property {string} text - 勾选框右侧的说明文字
 * @property {number} numberOfLines - 10040新增 勾选框右侧的说明文字能够显示的行数  默认为1
 * @property {ViewPropTypes.style} textStyle - 10040新增 勾选框右侧说明文字的样式
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
 * @module InputDialog
 * @description 输入弹窗，提示用户录入信息并记录。输入框弹窗的业务场景有时候会很复杂，如果本组件无法满足你的业务需求，请使用 `AbstractDialog` 参考本组件源码自行实现
 * @param {string} animationType - modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype
 * @param {bool} visible - 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible
 * @param {TYPE} type - 输入弹窗的类型。是否只有输入框，输入框上方是否有下划线超链接，输入框下方是否有勾选项，详见 `TYPE`，默认 `TYPE.SIMPLE`
 * @param {string} color - 下划线超链接的文字颜色 / 勾选框的勾选颜色，默认米家绿
 * @param {string} title - 标题文字
 * @param {UnderlineData} underlineData - 输入框上方的数据，包括左侧说明文字，右侧下划线文字及其点击回调函数，只对 `TYPE.UNDERLINE` 和 `TYPE.BOTH` 有效
 * @param {Input[]} inputs - 输入框数组，定义输入框的属性，对所有的 `TYPE` 有效
 * @param {CheckboxData} checkboxData - 输入框下方的数据，包括勾选状态，描述文字，只对 `TYPE.CHECKBOX` 和 `TYPE.BOTH` 有效
 * @param {Button[]} buttons - 按钮数组，定义底部按钮的属性，只能显示1～2个按钮，多传将失效。默认左取消右确定，左灰右绿，点击回调都是隐藏 Modal
 * @param {Object} dialogStyle - 10040新增 控制dialog 一些特有的样式
 * @param {bool} dialogStyle.allowFontScaling - 10040新增 dialog中text是否支持大字体显示，即是否随系统字体大小变化而变化, 默认`true`
 * @param {number} dialogStyle.titleNumberOfLines - 10040新增 控制title 文字的行数， 默认 1行
 * @param {bool} dialogStyle.unlimitedHeightEnable - 10040新增 设置控件高度是否自适应。 默认为false，即默认高度
 * @param {ViewPropTypes.style} dialogStyle.titleStyle - 10040新增 控制title 文字的样式
 * @param {function} onDismiss - Modal 隐藏时的回调函数
 * @param {boolean} isCorrect - 10045新增 弹窗的结果 - 副标题下会显示红色警示文字
 * @param {string} warnText - 10045新增 副标题下的红色警示文字
 * @param {string} inputWarnText  10045新增 输入框下的红色警示文字
 * @param {boolean} noInputDisButton - 10048新增 是否有[无输入内容时无法点击确认按钮]的逻辑，默认无。设置[defaultValue初始默认文字]也算作有输入内容
 * @param {function} onModalHide - 对话框关闭后的回调。onDismiss只会在onRequestClose和button的callback未定义时触发
 * @param {function} onModalShow - 对话框打开后的回调
 * @param {bool} canDismiss - 点击背景时是否隐藏，默认 true
 */

class InputDialog extends React.Component {
  static contextType = ConfigContext;
  static propTypes = {
    animationType: PropTypes.string,
    visible: PropTypes.bool,
    type: PropTypes.oneOf([
      TYPE.SIMPLE,
      TYPE.UNDERLINE,
      TYPE.CHECKBOX,
      TYPE.BOTH,
    ]),
    color: PropTypes.string,
    title: PropTypes.string,
    dialogStyle: PropTypes.object,
    extra: PropTypes.object,
    underlineData: PropTypes.shape({
      useNewTheme: PropTypes.bool,
      leftText: PropTypes.string,
      underlineText: PropTypes.string,
      onPress: PropTypes.func,
      accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
      accessibilityHint: AccessibilityPropTypes.accessibilityHint,
    }),
    inputs: PropTypes.arrayOf(
      PropTypes.shape({
        placeholder: PropTypes.string,
        defaultValue: PropTypes.string,
        onChangeText: PropTypes.func,
        textInputProps: PropTypes.object,
        accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
        accessibilityHint: AccessibilityPropTypes.accessibilityHint,
      }),
    ),
    checkboxData: PropTypes.shape({
      checked: PropTypes.bool,
      text: PropTypes.string,
      accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
      accessibilityHint: AccessibilityPropTypes.accessibilityHint,
    }),
    buttons: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        style: PropTypes.any,
        callback: PropTypes.func,
        accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
        accessibilityHint: AccessibilityPropTypes.accessibilityHint,
      }),
    ),
    onModalShow: PropTypes.func,
    onModalHide: PropTypes.func,
    onDismiss: PropTypes.func,
    accessible: AccessibilityPropTypes.accessible,
    isCorrect: PropTypes.bool,
    inputWarnText: PropTypes.string,
    warnText: PropTypes.string,
    noInputDisButton: PropTypes.bool,
    canDismiss: PropTypes.bool,
    hasShade: PropTypes.bool,
  };
  static defaultProps = {
    type: TYPE.SIMPLE,
    color: Styles.common.MHGreen,
    underlineData: {},
    checkboxData: {},
    dialogStyle: {
      allowFontScaling: true,
      unlimitedHeightEnable: false,
      titleNumberOfLines: 1,
      titleStyle: {},
    },
    buttons: [
      {
        text: '取消',
      },
      {
        text: '确定',
      },
    ],
    inputs: [
      {
        placeholder: '自定义占位字符',
        defaultValue: '',
        textInputProps: {
          autoFocus: true,
        },
      },
    ],
    isCorrect: true,
    inputWarnText: '输入错误',
    warnText: '结果错误',
    noInputDisButton: false,
    canDismiss: true,
    hasShade: true,
  };
  /**
   * @description 输入弹窗的类型
   * @enum {string}
   */

  static TYPE = TYPE;

  // constructor(props, context) {
  //   super(props, context);
  //   referenceReport('InputDialog');
  //   this.state = {
  //     checked: props.checkboxData.checked || false,
  //     disButton: props.noInputDisButton
  //   };
  //   this.textInputArray = [];
  //   this.process(props);
  // }

  constructor(props, context) {
    super(props, context);
    referenceReport('InputDialog');

    // 初始化状态
    this.state = {
      checked: props.checkboxData.checked || false,
      disButton: props.noInputDisButton,
      inputValues: this.getInitialInputValues(props.inputs), // 新增状态管理输入值
    };

    this.processButton(props);
  }

  // 新增方法：初始化输入值
  getInitialInputValues(inputs) {
    if (!inputs || inputs.length === 0) return [''];
    return inputs.map((input) => input.defaultValue || '');
  }

  // UNSAFE_componentWillReceiveProps(props) {
  //   this.setState({
  //     checked: props.checkboxData.checked || false,
  //   });
  //   this.processButton(props);
  // }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      checked: props.checkboxData.checked || false,
      // 当props.inputs变化时更新输入值
      inputValues: this.getInitialInputValues(props.inputs),
    });
    this.processButton(props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible && !this.props.visible) {
      // 关闭对话框时重置输入值
      this.setState({
        disButton: this.props.noInputDisButton,
        inputValues: this.getInitialInputValues(this.props.inputs),
      });
    } else if (!prevProps.visible && this.props.visible) {
      // 打开对话框时初始化状态
      const inputValues = this.getInitialInputValues(this.props.inputs);
      this.setState({
        disButton:
          this.props.noInputDisButton && this.isInputArrayEmpty(inputValues),
        inputValues,
      });
    }
  }

  // componentDidUpdate(prevProps) {
  //   // 外部设置visible为fasle时，清空textInputArray缓存并禁用Button
  //   if (prevProps.visible && !this.props.visible) {
  //     this.textInputArray = [];
  //     this.setState({
  //       disButton: this.props.noInputDisButton,
  //     });
  //   } else if (!prevProps.visible && this.props.visible) {
  //     //重新弹出dialog后，再放入textInputArray
  //     this.textInputArray = [];

  //     for (let i = 0; i < this.props.inputs?.length || 0; i++) {
  //       let input = this.props.inputs[i];

  //       if (input !== undefined) {
  //         this.textInputArray.push(input.defaultValue || '');
  //       }
  //     }

  //     if (this.props.noInputDisButton) {
  //       // 判断defaultValue输入内容
  //       let result = this.isInputArrayEmpty(this.textInputArray);
  //       if (result !== this.state.disButton)
  //         this.setState({
  //           disButton: result,
  //         });
  //     }
  //   }
  // }

  processButton(props) {
    // 拦截确认按钮的回调函数，传入 InputDialog 的一些信息
    const buttons = props.buttons;

    if (buttons instanceof Array) {
      const button = buttons[buttons.length - 1];

      if (button && button.callback) {
        const callbackOrigin = button.callback;

        button.callback = () => {
          callbackOrigin({
            hasPressUnderlineText: this.hasPressUnderlineText,
            checked: this.state.checked,
            textInputArray: this.textInputArray,
          });
        };
      }
    }

    this.buttons = buttons;
    this.hasPressUnderlineText = false;
  }

  // process(props) {
  //   // 拦截 onChangeText，记录输入文字
  //   let inputs = props.inputs;

  //   if (props.inputs === null || props.inputs === undefined) {
  //     inputs = [
  //       {
  //         defaultValue: '',
  //         textInputProps: {
  //           autoFocus: true,
  //         },
  //       },
  //     ];
  //   }

  //   for (let i = 0; i < inputs.length; i++) {
  //     let input = inputs[i];

  //     if (input !== undefined) {
  //       this.textInputArray.push(input.defaultValue || '');
  //       const onChangeTextOrigin = input.onChangeText;

  //       input.onChangeText = (text) => {
  //         this._onChangeText(text, i);

  //         if (onChangeTextOrigin instanceof Function) {
  //           onChangeTextOrigin(text);
  //         }
  //       };
  //     }
  //   }

  //   this.inputs = inputs;
  //   this.processButton(props);
  // }

  // 修改后的 onChangeText 处理
  handleInputChange = (text, index) => {
    this.setState((prevState) => {
      const newInputValues = [...prevState.inputValues];
      newInputValues[index] = text;

      const disButton = this.props.noInputDisButton
        ? this.isInputArrayEmpty(newInputValues)
        : prevState.disButton;

      return { inputValues: newInputValues, disButton };
    });

    // 调用原始的 onChangeText 回调（如果存在）
    const input = this.props.inputs?.[index];
    if (input?.onChangeText) {
      input.onChangeText(text);
    }
  };

  /**
   * 判断是否有输入内容
   */

  isInputArrayEmpty(arr) {
    for (const element of arr) {
      if (element === '' || typeof element === undefined || element === null)
        return true;
    }

    return false;
  }
  /**
   * 拦截onChangeText事件，记录输入值
   */

  _onChangeText(text, index) {
    this.textInputArray[index] = text;

    if (this.props.noInputDisButton) {
      // 有输入内容才能点击按钮
      let result = this.isInputArrayEmpty(this.textInputArray);
      if (result !== this.state.disButton)
        this.setState({
          disButton: result,
        });
    }
  }
  /**
   * 输入框上方的文字说明和下划线超链接 - 10045 Deprecated
   */

  renderUpExtra() {
    if (
      (this.props.type === TYPE.BOTH || this.props.type === TYPE.UNDERLINE) &&
      !this.props.underlineData.useNewTheme
    ) {
      const { leftText, underlineText, accessibilityLabel, accessibilityHint } =
        this.props.underlineData;
      let leftTextNumberOfLines = 1;
      let underlineTextNumberOfLines = 1;

      if (
        this.props.underlineData &&
        this.props.underlineData.hasOwnProperty('leftTextNumberOfLines')
      ) {
        leftTextNumberOfLines = this.props.underlineData.leftTextNumberOfLines;
      }

      if (
        this.props.underlineData &&
        this.props.underlineData.hasOwnProperty('underlineTextNumberOfLines')
      ) {
        underlineTextNumberOfLines =
          this.props.underlineData.underlineTextNumberOfLines;
      }

      return (
        <View
          style={[
            styles.underlineContainer,
            {
              paddingBottom: 5,
              paddingTop: 0,
            },
          ]}
        >
          <Text
            numberOfLines={leftTextNumberOfLines}
            allowFontScaling={this.props.dialogStyle.allowFontScaling}
            style={[styles.label, this.props.underlineData.leftTextStyle]}
            {...getAccessibilityConfig({
              accessible: this.props.accessible,
              accessibilityRole: AccessibilityRoles.text,
            })}
          >
            {leftText || ''}
          </Text>
          <Text
            style={[
              styles.underlineText,
              {
                color: this.props.color,
              },
              this.props.underlineData.underlineTextStyle,
            ]}
            numberOfLines={underlineTextNumberOfLines}
            allowFontScaling={this.props.dialogStyle.allowFontScaling}
            onPress={() => this.onPressUnderlineText()}
            {...getAccessibilityConfig({
              accessible: this.props.accessible,
              accessibilityRole: AccessibilityRoles.link,
              accessibilityLabel,
              accessibilityHint,
            })}
          >
            {underlineText || ''}
          </Text>
        </View>
      );
    }

    return null;
  }
  /**
   * 输入框下方的下划线超链接
   */

  renderDownUnderline() {
    if (
      (this.props.type === TYPE.BOTH || this.props.type === TYPE.UNDERLINE) &&
      this.props.underlineData.useNewTheme
    ) {
      const { underlineText, accessibilityLabel, accessibilityHint } =
        this.props.underlineData;
      let underlineTextNumberOfLines = 1;

      if (
        this.props.underlineData &&
        this.props.underlineData.hasOwnProperty('underlineTextNumberOfLines')
      ) {
        underlineTextNumberOfLines =
          this.props.underlineData.underlineTextNumberOfLines;
      }

      return (
        <View style={[styles.underlineContainer]}>
          <Text
            style={[
              styles.underlineText,
              {
                color: this.props.color,
                textAlign: 'left',
              },
              this.props.underlineData.underlineTextStyle,
            ]}
            numberOfLines={underlineTextNumberOfLines}
            allowFontScaling={this.props.dialogStyle.allowFontScaling}
            onPress={() => this.onPressUnderlineText()}
            {...getAccessibilityConfig({
              accessible: this.props.accessible,
              accessibilityRole: AccessibilityRoles.link,
              accessibilityLabel,
              accessibilityHint,
            })}
          >
            {underlineText || ''}
          </Text>
        </View>
      );
    }

    return null;
  }
  /**
   * 警示文字
   */

  renderWarnText() {
    return (
      <Text
        style={[
          styles.inputWarnText,
          {
            color: this.context.theme?.colorWarn,
          },
        ]}
        allowFontScaling={this.props.dialogStyle.allowFontScaling}
        {...getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityRole: AccessibilityRoles.text,
        })}
      >
        {this.props.inputWarnText}
      </Text>
    );
  }
  /**
   * 单个输入框
   */

  // 修改 renderInputView 方法
  renderInputView(input, index) {
    if (input === undefined) return null;
    const { accessibilityLabel, accessibilityHint } = input;
    const marginTop = index === 0 ? 0 : 7;

    return (
      <InputView
        key={index + (input.placeholder || '')}
        style={{ marginTop }}
        placeholder={input.placeholder || ''}
        onChangeText={(text) => this.handleInputChange(text, index)} // 使用新的处理方法
        defaultValue={this.state.inputValues[index]} // 使用状态中的值
        textInputProps={input.textInputProps || {}}
        type={input.type}
        borderColor={input.borderColor}
        isCorrect={input.isCorrect}
        {...getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityLabel,
          accessibilityHint,
        })}
      />
    );
  }

  // renderInputView(input, index) {
  //   if (input === undefined) return null;
  //   const { accessibilityLabel, accessibilityHint } = input;
  //   const marginTop = index === 0 ? 0 : 7; //input.onChangeText = this.inputs[index].onChangeText;
  //   //fix 绿米

  //   const onChangeTextOrigin = input.onChangeText;

  //   input.onChangeText = (text) => {
  //     this._onChangeText(text, index);

  //     if (onChangeTextOrigin instanceof Function) {
  //       onChangeTextOrigin(text);
  //     }
  //   };

  //   return (
  //     <InputView
  //       key={index + (input.placeholder || '')}
  //       style={{
  //         marginTop,
  //       }}
  //       placeholder={input.placeholder || ''}
  //       onChangeText={input.onChangeText}
  //       defaultValue={input.defaultValue || ''}
  //       textInputProps={input.textInputProps || {}}
  //       type={input.type}
  //       borderColor={input.borderColor}
  //       isCorrect={input.isCorrect}
  //       {...getAccessibilityConfig({
  //         accessible: this.props.accessible,
  //         accessibilityLabel,
  //         accessibilityHint,
  //       })}
  //     />
  //   );
  // }
  /**
   * 一组输入框
   */

  renderInputGroup() {
    const input0 = this.props.inputs
      ? this.props.inputs[0]
      : [
          {
            defaultValue: '',
            textInputProps: {
              autoFocus: true,
            },
          },
        ];
    const input1 = this.props.inputs
      ? this.props.inputs.length > 1
        ? this.props.inputs[1]
        : undefined
      : undefined;
    return (
      <View
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        {this.renderInputView(input0, 0)}
        {input0.hasOwnProperty('isCorrect') && !input0.isCorrect
          ? this.renderWarnText()
          : null}
        {this.renderInputView(input1, 1)}
      </View>
    );
  }
  /**
   * 输入框下方的勾选框和文字
   */

  renderDownExtra() {
    if (this.props.type === TYPE.BOTH || this.props.type === TYPE.CHECKBOX) {
      const { text, accessibilityLabel, accessibilityHint } =
        this.props.checkboxData;
      let numberOfLines = 1;

      if (
        this.props.checkboxData &&
        this.props.checkboxData.hasOwnProperty('numberOfLines')
      ) {
        numberOfLines = this.props.checkboxData.numberOfLines;
      }

      return (
        <TouchableOpacity
          onPress={() => this.onPressCheckbox()}
          activeOpacity={1}
          style={{
            paddingTop,
            marginHorizontal: 13,
          }}
          {...getAccessibilityConfig({
            accessible: this.props.accessible,
            accessibilityRole: AccessibilityRoles.checkbox,
            accessibilityLabel: accessibilityLabel || text,
            accessibilityHint,
            accessibilityState: {
              disabled: false,
              checked: this.state.checked,
            },
          })}
        >
          <View style={[styles.checkboxContainer]}>
            <Checkbox
              checked={this.state.checked}
              checkedColor={this.props.color}
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
              }}
              onValueChange={(checked) => {
                this.setState({
                  checked,
                });
              }}
            />
            <Text
              style={[
                styles.checkboxText,
                {
                  color: this.context.theme?.colorGrayHeavier,
                },
                this.props.checkboxData.textStyle,
              ]}
              numberOfLines={numberOfLines}
              allowFontScaling={this.props.dialogStyle.allowFontScaling}
            >
              {text || ''}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    return null;
  }

  render() {
    const buttons = this.buttons;

    if (this.props.noInputDisButton && buttons instanceof Array) {
      let button = buttons[buttons.length - 1];
      button.disabled = this.state.disButton;
      button.colorType = this.state.disButton
        ? 'grayLayerBlack'
        : 'blueLayerWhite';
    }

    const absDialogStyle =
      Platform.OS === 'ios'
        ? {
            bottom: this.inputs?.some(
              (input) => input?.textInputProps?.autoFocus,
            )
              ? ~~(height * 0.45)
              : 16,
            borderRadius: 20,
            marginHorizontal: 10,
            width: width - 20,
          }
        : {};
    return (
      <AbstractDialog
        hasShade={this.props.hasShade}
        animationType={this.props.animationType}
        visible={this.props.visible}
        title={this.props.title}
        buttons={this.buttons}
        onModalShow={this.props.onModalShow}
        onModalHide={this.props.onModalHide}
        onDismiss={() => this._onDismiss()}
        showSubtitle={!this.props.isCorrect}
        subtitle={this.props.warnText}
        canDismiss={this.props.canDismiss}
        useNewTheme
        dialogStyle={{
          subTitleStyle: {
            color: '#F43F31',
            fontSize: 14,
            lineHeight: 19,
          },
          ...(this.props.dialogStyle || {}),
        }}
        style={absDialogStyle}
        {...getAccessibilityConfig({
          accessible: this.props.accessible,
        })}
      >
        <View style={[styles.container]}>
          {this.renderUpExtra()}
          {this.renderInputGroup()}
          {this.renderDownUnderline()}
          {this.renderDownExtra()}
        </View>
      </AbstractDialog>
    );
  }

  _onDismiss() {
    this.props.onDismiss && this.props.onDismiss();
    this.setState({
      disButton: this.props.noInputDisButton,
    });
  }

  onPressUnderlineText() {
    this.hasPressUnderlineText = true;
    const { onPress } = this.props.underlineData;
    onPress && onPress();
  }

  onPressCheckbox() {
    this.setState({
      checked: !this.state.checked,
    });
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal,
    paddingBottom: paddingVertical,
    backgroundColor: 'transparent',
    borderRadius: Styles.dialog.modal.borderRadius,
  },
  underlineContainer: {
    marginHorizontal: 13,
    paddingTop,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  label: {
    fontSize: 14,
    lineHeight: 19,
    color: 'rgba(0,0,0,0.8)',
    flex: 1,
  },
  underlineText: {
    flex: 1,
    textAlign: 'right',
    lineHeight: 19,
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    flex: 1,
    marginLeft: 7,
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'left',
  },
  inputWarnText: {
    alignSelf: 'flex-start',
    marginHorizontal: 19,
    marginTop: 9,
    fontSize: 14,
    lineHeight: 19,
    flex: 1,
  },
});
export default InputDialog;
