// @ts-nocheck

/* eslint-disable */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated, ScrollView, I18nManager } from 'react-native';
import Switch from "../switch/Switch";
import { ConfigContext } from "../configProvider";
import Card from "./Card";
import SlideGear from "../gear/SlideGear";
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from "../../utils/accessibility-helper";
import { FontPrimary, FontSecondary } from "../../constants/font";
import { adjustSize } from "../../utils/sizes";
const {
  width
} = Dimensions.get('window');
const cardMargin = adjustSize(36); // 卡片左右间距

const cardWidth = width - cardMargin * 2; // 卡片的宽度

const radiusValue = 12; // 卡片圆角

const cardPadding = 20; // 卡片内边距

const tabHeight = 46; // tab绿块高度
// const tabTextWidth = 35; // tab块文字长度

const dotSize = 39; // dot样式

/** tab时实际左右多6的padding */

const CARD_EXCESS_PADDING = 6;
/** card面板中一次能展示的最多tab数。超出则滑动 */

const MAX_TAB_SHOW_COUNT = 5;
/**
 * @description 卡片类型
 * @enum {string}
 */

const CARD_TYPE = {
  /**
   * tab选择档位 最小2挡 最多5挡
   */
  TAB: 'tab',

  /**
   * 滑条
   */
  SLIDER: 'slider',

  /**
   * 点按 最小3挡 最多9挡
   */
  DOT: 'dot'
};
Object.freeze(CARD_TYPE);
/**
 * @exports
 * @author Xiangheng
 * @since 10047
 * @module GearCard
 * @description 滑动档位卡片
 * @property {CARD_TYPE} cardType - 卡片类型 - 默认为tab
 * @property {string} title - 标题
 * @property {string} subtitle - 副标题
 * @property {style} titleStyle - 标题的自定义样式
 * @property {style} subtitleStyle - 副标题的自定义样式
 * @property {style} gearTextStyle - 档位文案的自定义样式
 * @property {bool} disabledGear - 禁止点击滑条/tab
 * @property {style} cardStyle - 卡片样式
 * @property {number} titleNumberOfLines - 设置title显示的最大行数 默认为1
 * @property {number} subtitleNumberOfLines - 设置subtitle显示的最大行数 默认为1
 * @property {bool} unlimitedHeightEnable - 设置控件高度是否自适应。 默认为false，即默认高度, 需使用scrollView
 * @property {bool} allowFontScaling - 设置卡片字体是否随系统设置的字体大小的设置改变而改变 默认为true。
 * @property {array<string>|array<number>} options - 档位可选项，以字符串数组表示，必填
 * @property {number} maxDotShowCount card上一次能展示的最多dot数，超出则开启滑动。 10049新增
 * @property {string} optionGearBackgroundColor option类型的gear背景颜色。滑动类型请设置sliderStyle
 * @property {string} animatedGearBackgroundColor 滑动时gear背景颜色。滑动类型请设置sliderStyle
 * @property {function} onValueChange gear值发生滑动时的回调。统一onPress和onSliderValueChange回调
 * swith属性
 * @property {bool} showSwitch - 是否显示开关 默认false
 * @property {function} onSwitchValueChange - 点击卡片的回调函数，所有的卡片类型有效
 * @property {bool} switchValue - 开关的状态，默认是 `false`
 * @property {string} onTintColor - 开关打开时的背景颜色
 * @property {string} tintColor - 开关关闭时的背景颜色
 * @property {bool} disabledSwitch - 禁止点击开关
 * @property {style} switchStyle - 开关样式
 *
 * tab/dot样式属性
 * @property {function(index)} onPress - 点击档位事件
 * @property {number} currentIndex - 当前档位数组下标 [0, options.length-1]
 * @property {number} duration - 滑块滑动动画时长
 *
 * Slider滑条属性
 * @property {object} sliderProps - slider的属性值，
 * 默认值 {
 *   value:50 // 被选择档位的数组下标 [0, options.length-1]
 *   showEndText:true  // 是否显示两端的文字，即`options`的第一个和最后一个，默认`true`
 *}
 * @property {object} sliderStyle - slider 的自定义样式
 * 默认值：{
 *   minimumTrackTintColor: "#32BAC0", // slider 左侧已填充颜色
 *   maximumTrackTintColor: "#EDEEEF", // slider 右侧未填充颜色
 *   thumbTintColor: "#FFFFFF", // 可移动圆圈的填充颜色
 * }
 * @property {function} onSliderValueChange - 滑动回调函数，返回实时的options下标
 * @property {function} onSlidingComplete - 滑动结束回调函数
 */

class GearCard extends Component {
  static propTypes = {
    cardType: PropTypes.oneOf([CARD_TYPE.DOT, CARD_TYPE.SLIDER, CARD_TYPE.TAB]),
    title: PropTypes.string,
    subtitle: PropTypes.string,
    titleStyle: PropTypes.object,
    subtitleStyle: PropTypes.object,
    gearTextStyle: PropTypes.object,
    cardStyle: PropTypes.object,
    showSwitch: PropTypes.bool,
    switchStyle: PropTypes.object,
    disabledSwitch: PropTypes.bool,
    disabledGear: PropTypes.bool,
    titleNumberOfLines: PropTypes.number,
    subtitleNumberOfLines: PropTypes.number,
    allowFontScaling: PropTypes.bool,
    unlimitedHeightEnable: PropTypes.bool,
    options: PropTypes.array,
    onSwitchValueChange: PropTypes.func,
    switchValue: PropTypes.bool,
    onTintColor: PropTypes.string,
    tintColor: PropTypes.string,
    onPress: PropTypes.func,
    duration: PropTypes.number,
    currentIndex: PropTypes.number,
    sliderProps: PropTypes.object,
    sliderStyle: PropTypes.object,
    onSliderValueChange: PropTypes.func,
    onSlidingComplete: PropTypes.func,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint,
    maxDotShowCount: PropTypes.number,
    onValueChange: PropTypes.func,
    optionGearBackgroundColor: PropTypes.string,
    animatedGearBackgroundColor: PropTypes.string
  };
  static defaultProps = {
    cardType: CARD_TYPE.TAB,
    duration: 200,
    currentIndex: 0,
    showSwitch: false,
    titleNumberOfLines: 1,
    subtitleNumberOfLines: 1,
    unlimitedHeightEnable: false,
    allowFontScaling: true,
    disabledSwitch: false,
    disabledGear: false,
    sliderProps: {
      value: 0,
      showDots: 0,
      showEndText: true
    },
    maxDotShowCount: 9
  };
  static contextType = ConfigContext;
  static CARD_TYPE = CARD_TYPE;

  constructor(props) {
    super(props);

    if (!props.options || !(props.options instanceof Array) || props.options.length < 2) {
      this.showNothing = true;
      return;
    }

    if (props.maxDotShowCount > 9) {
      throw new Error('maxDotShowCount cannot exceed 9');
    }

    this.getCorrectLayout(props);
    this.state = {
      gearValue: this.props.sliderProps.value
    };
    this.currentIndex = new Animated.Value(props.currentIndex);
  }

  componentDidMount() {
    this.AnimatedMoveGreenTab(this.props.currentIndex);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.options !== this.props.options) {
      //option不一样时重新计算布局移动绿块
      this.getCorrectLayout(nextProps);
    }

    if (this.props.sliderProps && nextProps.sliderProps.value !== this.props.sliderProps.value) {
      this.setState({
        gearValue: nextProps.sliderProps.value
      });
      this.AnimatedMoveGreenTab(nextProps.sliderProps.value);
    }
  }

  getCorrectLayout(props) {
    const {
      cardType,
      maxDotShowCount
    } = props;
    const maxShowCount = cardType === CARD_TYPE.TAB ? MAX_TAB_SHOW_COUNT : maxDotShowCount;
    const length = Math.min(props.options.length, maxShowCount);
    let cardLength = cardWidth - cardPadding * 2 - CARD_EXCESS_PADDING; // tab时实际左右多6的padding
    // dot样式

    if (props.cardType === CARD_TYPE.DOT) {
      cardLength += CARD_EXCESS_PADDING;
      this.buttonWidth = Math.floor(cardLength / length) > dotSize ? dotSize : Math.floor(cardLength / length);
      this.dotSize = this.buttonWidth === dotSize ? dotSize : this.buttonWidth;
      this.leftMargin = 0; // this.buttonWidth === dotSize ? 0 : (dotSize - this.buttonWidth) / 2;

      this.margin = (cardLength - this.buttonWidth * length) / (length - 1);
      return;
    } // tab样式


    this.buttonWidth = Math.floor(cardLength / length) - 10; // 按钮宽度

    this.tabWidth = this.buttonWidth; // tab绿块的宽度

    this.leftMargin = Math.abs(this.tabWidth - this.buttonWidth) / 2 + 3; // 最左侧边界margin

    this.margin = (cardLength - this.buttonWidth * length) / (length - 1); // tab左侧margin

    if (length === maxShowCount) {
      // 5个时需要额外判定宽度不小于72
      this.tabWidth = this.buttonWidth > 72 ? this.buttonWidth : 72;
      this.leftMargin = Math.abs(this.tabWidth - this.buttonWidth) / 2 + 3;
      this.margin = (cardLength - this.buttonWidth * length - this.leftMargin * 2 + CARD_EXCESS_PADDING) / (length - 1);
    }
  }

  renderUpView() {
    if (!!this.props.title || this.props.showSwitch) {
      const unlimitedHeightEnable = this.props.unlimitedHeightEnable;
      return <View style={[styles.upViewContainer, unlimitedHeightEnable || !this.props.allowFontScaling ? {
        height: undefined
      } : {}]} {...!this.props.onSwitchValueChange ? getAccessibilityConfig({
        accessible: this.props.accessible,
        accessibilityRole: AccessibilityRoles.text,
        accessibilityLabel: this.props.accessibilityLabel || this.props.title,
        accessibilityHint: this.props.accessibilityHint
      }) : getAccessibilityConfig({
        accessible: this.props.accessible,
        accessibilityRole: AccessibilityRoles.switch,
        accessibilityLabel: this.props.accessibilityLabel || this.props.title,
        accessibilityHint: this.props.accessibilityHint,
        accessibilityState: {
          disabled: this.props.disabledSwitch,
          checked: this.props.switchValue
        }
      })} accessibilityActions={!this.props.onSwitchValueChange ? [] : [{
        name: 'activate'
      }]} onAccessibilityAction={!this.props.onSwitchValueChange ? null : this.onAccessibilityAction}>
          <View style={styles.titleViewStyle}>
            <Text allowFontScaling={this.props.allowFontScaling} numberOfLines={this.props.titleNumberOfLines} ellipsizeMode="tail" style={[styles.titleStyle, unlimitedHeightEnable ? {
            lineHeight: undefined
          } : {}, {
            color: this.context.theme?.colorBlack
          }, this.props.titleStyle]} {...getAccessibilityConfig({
            accessible: false
          })}>
              {this.props.title}
            </Text>
            {this.props.subtitle ? <View style={styles.gearStyle}>
                <View style={[styles.separatorCol]} />
                <Text numberOfLines={this.props.subtitleNumberOfLines} ellipsizeMode="tail" allowFontScaling={this.props.allowFontScaling} style={[unlimitedHeightEnable ? {
              lineHeight: undefined
            } : {}, {
              fontSize: 12,
              color: this.context.theme?.colorGrayLighter,
              ...FontSecondary
            }, this.props.subtitleStyle]} {...getAccessibilityConfig({
              accessible: false
            })}>
                  {this.props.subtitle}
                </Text>
              </View> : null}
          </View>
          {this.props.showSwitch ? <View style={styles.right}>
              <Switch style={this.props.switchStyle} value={this.props.switchValue} disabled={this.props.disabledSwitch} tintColor={this.props.tintColor} onTintColor={this.props.onTintColor} onValueChange={this.props.onSwitchValueChange} {...getAccessibilityConfig({
            accessible: false
          })} />
            </View> : null}
        </View>;
    }

    return null;
  }

  renderAnimatedView() {
    let isTab;
    if (this.props.cardType === CARD_TYPE.TAB) isTab = true;else if (this.props.cardType === CARD_TYPE.DOT && this.props.options?.length < 10 && this.props.options?.length > 1) isTab = false;
    return <Animated.View style={{
      height: isTab ? tabHeight : this.dotSize,
      borderRadius: isTab ? tabHeight / 2 : this.dotSize / 2,
      width: isTab ? this.tabWidth : this.dotSize,
      backgroundColor: this.props.animatedGearBackgroundColor || this.context.theme.colorPrimary,
      position: 'absolute',
      transform: [{
        translateX: this.currentIndex.interpolate(this.getLeftInterpolate())
      }],
      opacity: this.props.disabledGear ? 0.3 : 1,
      top: isTab ? 3 : 23 - this.dotSize / 2
    }} />;
  }

  renderGear() {
    if (this.props.cardType === CARD_TYPE.SLIDER) {
      const sliderProps = this.props.sliderProps;
      const sliderStyle = this.props.sliderStyle || {
        minimumTrackTintColor: this.context.theme?.colorPrimary,
        maximumTrackTintColor: this.context.theme?.colorGearBackground,
        thumbTintColor: this.context.theme?.colorWhite2
      };
      return <SlideGear options={this.props.options} value={this.state.gearValue} containerStyle={{
        height: 46,
        marginTop: 8
      }} showEndText={sliderProps.showEndText} onValueChange={value => this._onSliderValueChange(value)} onSlidingComplete={value => this.props.onSlidingComplete(value)} minimumTrackTintColor={sliderStyle.minimumTrackTintColor} maximumTrackTintColor={sliderStyle.maximumTrackTintColor} blockStyle={{
        backgroundColor: sliderStyle.thumbTintColor
      }} // showChild={!(sliderProps.showDots === 0)}
      disabled={this.props.disabledGear} {...getAccessibilityConfig({
        accessible: this.props.accessible,
        accessibilityRole: AccessibilityRoles.adjustable,
        accessibilityLabel: this.props.accessibilityLabel,
        accessibilityHint: this.props.accessibilityHint,
        accessibilityState: {
          disabled: this.props.disabledGear
        },
        accessibilityValue: {
          value: this.state.gearValue
        }
      })} accessibilityActions={[{
        name: 'increment'
      }, {
        name: 'decrement'
      }]} onAccessibilityAction={this.onAccessibilityAction}>
          {
          /* {this.renderDotView()} */
        }
        </SlideGear>;
    }

    const {
      cardType,
      maxDotShowCount,
      optionGearBackgroundColor
    } = this.props;
    let viewStyle = {};

    if (this.props.cardType === CARD_TYPE.TAB) {
      viewStyle = [styles.gearTabContainer, {
        backgroundColor: optionGearBackgroundColor || this.context.theme.colorGearBackground
      }];
    } else {
      viewStyle = [styles.gearDotContainer, {
        backgroundColor: optionGearBackgroundColor || 'transparent'
      }];
    }

    const {
      colorGrayLight,
      colorWhite2
    } = this.context.theme;
    const scrollViewWidth = this.props.options.length * (this.buttonWidth + this.margin) + 2 * this.leftMargin;
    const newScrollViewWidth = cardType === CARD_TYPE.TAB ? scrollViewWidth - CARD_EXCESS_PADDING : scrollViewWidth;
    const maxShowCount = cardType === CARD_TYPE.TAB ? MAX_TAB_SHOW_COUNT : maxDotShowCount;
    const gearTabContainerStyle = this.props.options.length <= maxShowCount ? {
      flex: 1
    } : {
      width: newScrollViewWidth
    };
    return <ScrollView alwaysBounceHorizontal={false} contentContainerStyle={gearTabContainerStyle} horizontal showsHorizontalScrollIndicator={false}>
        <View style={[viewStyle, gearTabContainerStyle]}>
          {this.renderAnimatedView()}
          <View style={[this.props.disabledGear ? {
          opacity: 0.3
        } : {}, styles.gearStyle]}>
            {this.props.options.map((option, index) => <TouchableOpacity key={option} onPress={() => this.onPressButton(index)} activeOpacity={1} disabled={this.props.disabledGear} style={[styles.textContainer, {
            width: this.buttonWidth
          }, index == 0 ? {
            marginLeft: this.leftMargin
          } : {
            marginLeft: this.margin
          }]} {...getAccessibilityConfig({
            accessible: this.props.accessible,
            accessibilityRole: AccessibilityRoles.tab,
            accessibilityLabel: option,
            accessibilityHint: option,
            accessibilityState: {
              disabled: this.props.disabledGear,
              selected: index === this.state.gearValue
            }
          })}>
                <Animated.Text ellipsizeMode="tail" style={[styles.gearText, this.props.gearTextStyle, {
              color: this.state.gearValue === index ? colorWhite2 : colorGrayLight
            }]}>
                  {option}
                </Animated.Text>
              </TouchableOpacity>)}
          </View>
        </View>
      </ScrollView>;
  }

  onPressButton = index => {
    const {
      onPress,
      onValueChange
    } = this.props;
    this.setState({
      gearValue: index
    }, () => {
      this.AnimatedMoveGreenTab(index);

      if (onPress) {
        // 传入了按下档位对应的key
        onPress(index);
      }

      if (typeof onValueChange === 'function') {
        onValueChange(index);
      }
    });
  };

  AnimatedMoveGreenTab(index) {
    Animated.timing(this.currentIndex, {
      toValue: index,
      duration: this.props.duration,
      useNativeDriver: true
    }).start();
  }

  getLeftInterpolate() {
    // 绿块位移
    const {
      cardType,
      maxDotShowCount,
      options
    } = this.props;
    const maxShowCount = cardType === CARD_TYPE.TAB ? MAX_TAB_SHOW_COUNT : maxDotShowCount;
    const length = Math.min(options.length, maxShowCount);
    const inputRange = Array.from({
      length
    }).map((_value, idx) => idx);
    const outputRange = inputRange.map(i => {
      let value = i * (this.buttonWidth + this.margin) + this.leftMargin;

      if (this.props.cardType === CARD_TYPE.TAB && length === 5) {
        value -= (this.tabWidth - this.buttonWidth) / 2;
      }

      return I18nManager.isRTL ? -value : value;
    });
    return {
      inputRange: inputRange,
      outputRange: outputRange
    };
  }

  renderInnerView() {
    return <View style={styles.innerView}>
        {this.renderUpView()}
        {this.renderGear()}
      </View>;
  }

  render() {
    if (this.showNothing) return null;
    let cardHeight = 143;
    if (!this.props.title && !this.props.showSwitch) cardHeight = 95;
    if (this.props.unlimitedHeightEnable) cardHeight = undefined;
    const cardStyle = StyleSheet.flatten([{
      width: cardWidth,
      height: cardHeight,
      borderRadius: radiusValue
    }, this.props.cardStyle]);
    return <Card innerView={this.renderInnerView()} cardStyle={cardStyle} showShadow={false} allowFontScaling={this.props.allowFontScaling} unlimitedHeightEnable={this.props.unlimitedHeightEnable} />;
  }

  _onSliderValueChange(value) {
    this.setState({
      gearValue: value
    }, () => {
      if (typeof this.props.onValueChange === 'function') {
        this.props.onValueChange(value);
      }
    });

    if (this.props.onSliderValueChange) {
      this.props.onSliderValueChange(value);
    }
  }

  onAccessibilityAction = ({
    nativeEvent: {
      actionName
    }
  }) => {
    const {
      disabledSwitch,
      switchValue
    } = this.props;

    if (disabledSwitch) {
      return;
    }

    const {
      gearValue
    } = this.state;
    let toValue = gearValue;

    if (actionName === 'activate' && this.props.onSwitchValueChange) {
      this.props.onSwitchValueChange(!switchValue);
      return;
    }

    if (actionName === 'increment') {
      toValue++;
    }

    if (actionName === 'decrement') {
      toValue--;
    }

    this._onSliderValueChange(toValue, () => {
      this.props.onSlidingComplete(toValue);
    });
  };
}

const styles = StyleSheet.create({
  innerView: {
    marginHorizontal: cardPadding,
    marginTop: 14,
    marginBottom: 17,
    flex: 1
  },
  upViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    marginBottom: 18
  },
  gearTabContainer: {
    height: tabHeight + 6,
    flexDirection: 'row',
    borderRadius: 26,
    marginBottom: 13,
    marginTop: 8
  },
  gearDotContainer: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 13
  },
  titleStyle: {
    fontSize: 14,
    lineHeight: 19,
    ...FontPrimary
  },
  textContainer: {
    height: tabHeight,
    justifyContent: 'center',
    alignItems: 'center' //backgroundColor: 'rgba(0,0,0,0.2)'

  },
  gearText: {
    fontSize: 13,
    ...FontSecondary
  },
  right: {
    alignItems: 'flex-end',
    maxWidth: 70,
    marginLeft: 20
  },
  separatorCol: {
    height: 14,
    width: 0.5,
    marginHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  dotView: {
    top: 21,
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: '#999999',
    position: 'absolute'
  },
  gearStyle: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  titleViewStyle: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 10
  }
});
export default GearCard;