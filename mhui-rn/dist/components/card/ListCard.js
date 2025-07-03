// @ts-nocheck

/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, View, I18nManager } from 'react-native';
import { Images, Styles } from "../../resources";
import Separator from "../separator/Separator";
import Switch from "../switch/Switch";
import Card from "./Card";
import { PopButton } from "../popButton";
import CheckBox from "../checkbox/Checkbox";
import { ConfigContext } from "../configProvider";
import { getAccessibilityConfig } from "../../utils/accessibility-helper";
import { adjustSize } from "../../utils/sizes";
const {
  width
} = Dimensions.get('window');
const radiusValue = 12;
const cardHeight = 89;
const marginHor = 20;
const iconViewLength = 43;
/**
 * @description ListCard右侧图标的类型, 默认无
 * @enum {string}
 */

const TYPE = {
  /**
   * 开关
   */
  SWITCH: 'switch',

  /**
   * 单选
   */
  CHOICE: 'choice',

  /**
   * 按钮
   */
  BUTTON: 'button',

  /**
   * 箭头
   */
  ARROW: 'arrow',

  /**
   * 无
   */
  NONE: 'none'
};
Object.freeze(TYPE);
const CARD_RADIUS_TYPE = {
  /**
   * 四角都是圆角
   */
  ALL: 'all',

  /**
   * 四角都是直角
   */
  NONE: 'none',

  /**
   * 上方圆角下方直角
   */
  TOP: 'top',

  /**
   * 上方直角下方圆角
   */
  BOTTOM: 'bottom'
};
/**
 * @export public
 * @author xiangheng
 * @since 10047
 * @module ListCard
 * @description 列表卡片（注意与ListItem区分）
 * @property {string} type - 右侧的图标类型，默认无
 * @property {string} radiusType - 卡片圆角类型：四个圆角、没有圆角、只有上圆角、只有下圆角。对应值：all（默认）, none, top, bottom
 * @property {string} title - 左侧主标题
 * @property {string} subtitle - 下侧副标题
 * @property {string} value - 右侧文案(仅能与右侧箭头同时存在)
 * @property {style} titleStyle - 标题的自定义样式
 * @property {style} subtitleStyle - 副标题的自定义样式
 * @property {style} valueStyle - 右侧文案的自定义样式
 * @property {number} titleNumberOfLines -  设置title字体显示的最大行数 默认为1
 * @property {number} subtitleNumberOfLines -  设置subtitle字体显示的最大行数 默认为2
 * @property {number} valueNumberOfLines -  设置value字体显示的最大行数 默认为1
 * @property {style} cardStyle - 卡片样式
 * @property {ImageSourcePropType} icon - 左侧自定义图标
 * @property {string} themeColor - card图标背景主题颜色, 默认米家绿
 * @property {function} onPress - 卡片点击事件
 * @property {bool} disabled - 是否禁用点击，默认值 false
 * @property {bool} showSeparator - 是否显示分割线，默认值 true
 * @property {component} separator - 自定义分割线，不传将显示默认样式的分割线
 * @property {bool} allowFontScaling -  设置字体是否随系统设置的字体大小的设置改变而改变 默认为true。
 * @property {bool} unlimitedHeightEnable -  设置控件高度是否自适应。 默认为false，即默认高度
 * @property {object} buttonOption - 按钮属性
 * @property {object} choiceOption - 单选属性
 * @property {object} switchOption - 开关属性
 */

/** switch属性
 * @typedef {object} switchOption
 * @property {function} onSwitchValueChange - 点击卡片的回调函数，所有的卡片类型有效
 * @property {bool} switchValue - 开关的状态，默认是 `false`
 * @property {string} onTintColor - 开关打开时的背景颜色
 * @property {string} tintColor - 开关关闭时的背景颜色
 * @property {style} switchStyle - 开关样式
 */

/**
 * button属性
 * @typedef {object} buttonOption
 * @property {string} title - 按钮文字
 * @property {Object} backgroundColor -  控制按钮背景颜色{ bgColorNormal: string; bgColorPressed: string };详情请参阅组件PopButton
 * @property {style} titleStyle -  按钮标题样式,设置字体大小无效
 * @property {function} onPress - 按钮方法
 */

/**
 * 单选属性
 * @typedef {object} choiceOption
 * @property {string} checkedColor - 背景颜色
 * @property {function} onValueChange - 切换事件
 * @property {bool} checked - 是否勾选
 */

class ListCard extends React.Component {
  static contextType = ConfigContext;
  static TYPE = TYPE;
  static CARD_RADIUS_TYPE = CARD_RADIUS_TYPE;
  static propTypes = {
    radiusType: PropTypes.oneOf([CARD_RADIUS_TYPE.ALL, CARD_RADIUS_TYPE.TOP, CARD_RADIUS_TYPE.NONE, CARD_RADIUS_TYPE.BOTTOM]),
    type: PropTypes.oneOf([TYPE.SWITCH, TYPE.CHOICE, TYPE.BUTTON, TYPE.ARROW, TYPE.NONE]),
    title: PropTypes.string,
    subtitle: PropTypes.string,
    value: PropTypes.string,
    titleStyle: PropTypes.object,
    subtitleStyle: PropTypes.object,
    valueStyle: PropTypes.object,
    cardStyle: PropTypes.object,
    titleNumberOfLines: PropTypes.number,
    valueNumberOfLines: PropTypes.number,
    subtitleNumberOfLines: PropTypes.number,
    allowFontScaling: PropTypes.bool,
    unlimitedHeightEnable: PropTypes.bool,
    themeColor: PropTypes.string,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    showSeparator: PropTypes.bool,
    separator: PropTypes.element,
    buttonOption: PropTypes.object,
    choiceOption: PropTypes.object,
    onSwitchValueChange: PropTypes.func,
    switchValue: PropTypes.bool,
    onTintColor: PropTypes.string,
    tintColor: PropTypes.string,
    switchStyle: PropTypes.object,
    cardUnderlayColor: PropTypes.string
  };
  static defaultProps = {
    type: TYPE.NONE,
    radiusType: CARD_RADIUS_TYPE.ALL,
    themeColor: Styles.common.MHGreen,
    titleNumberOfLines: 1,
    subtitleNumberOfLines: 2,
    valueNumberOfLines: 1,
    allowFontScaling: true,
    unlimitedHeightEnable: false,
    showSeparator: true,
    disabled: false
  };

  constructor(props) {
    super(props); // 根据 radiusType 设置卡片圆角

    this.radius = {
      [CARD_RADIUS_TYPE.ALL]: {
        borderRadius: radiusValue
      },
      [CARD_RADIUS_TYPE.NONE]: {
        borderRadius: 0
      },
      [CARD_RADIUS_TYPE.TOP]: {
        borderTopLeftRadius: radiusValue,
        borderTopRightRadius: radiusValue
      },
      [CARD_RADIUS_TYPE.BOTTOM]: {
        borderBottomLeftRadius: radiusValue,
        borderBottomRightRadius: radiusValue
      }
    }[props.radiusType];
  }

  renderIcon() {
    return this.props.icon ? <View style={[styles.iconViewStyle, {
      backgroundColor: this.props.themeColor,
      opacity: this.props.disabled ? 0.3 : 1
    }]}>
        <Image style={[styles.iconStyle, {
        transform: [{
          scaleX: I18nManager.isRTL ? -1 : 1
        }]
      }]} source={this.props.icon} />
      </View> : null;
  }

  renderText() {
    let adaptedFontStyle = {};

    if (this.props.unlimitedHeightEnable) {
      adaptedFontStyle = {
        lineHeight: undefined
      };
    }

    const valueStyle = {
      textAlignVertical: 'center',
      textAlign: 'right'
    };
    const textViewStyle = {
      flex: 1,
      flexDirection: 'row'
    }; // 如果不设置英文字体，那么外文字符串将显示不全（Android）

    let fontFamily = {};

    if (Platform.OS === 'android') {
      fontFamily = {
        fontFamily: 'KMedium'
      };
    }

    let titleLine = this.props.titleNumberOfLines == undefined ? 1 : this.props.titleNumberOfLines;
    let subtitleLine = this.props.subtitleNumberOfLines == undefined ? 1 : this.props.subtitleNumberOfLines;
    let valueLine = this.props.valueNumberOfLines == undefined ? 2 : this.props.valueNumberOfLines;
    if (titleLine < 0) titleLine = 0;
    if (subtitleLine < 0) subtitleLine = 0;
    if (valueLine < 0) valueLine = 0;
    return <View style={[textViewStyle, {
      opacity: this.props.disabled ? 0.3 : 1
    }]}>
        <View style={styles.titleView}>
          <Text numberOfLines={titleLine} ellipsizeMode="tail" allowFontScaling={this.props.allowFontScaling} style={[styles.title, {
          color: this.context.theme?.colorBlack
        }, fontFamily, adaptedFontStyle, this.props.titleStyle]} {...getAccessibilityConfig({
          accessible: false
        })}>
            {this.props.title}
          </Text>
          {this.props.subtitle ? <Text numberOfLines={subtitleLine} ellipsizeMode="tail" allowFontScaling={this.props.allowFontScaling} style={[styles.subtitle, {
          color: this.context.theme?.colorGrayLighter
        }, adaptedFontStyle, this.props.subtitleStyle]} {...getAccessibilityConfig({
          accessible: false
        })}>
                {this.props.subtitle}
              </Text> : null}
        </View>
        {this.props.value && (this.props.type === TYPE.NONE || this.props.type === TYPE.ARROW) ? <View style={styles.valueText}>
            <Text numberOfLines={valueLine} allowFontScaling={this.props.allowFontScaling} ellipsizeMode="tail" style={[styles.subtitle, {
          color: this.context.theme?.colorGrayLighter
        }, valueStyle, adaptedFontStyle, this.props.valueStyle]} {...getAccessibilityConfig({
          accessible: false
        })}>
              {this.props.value}
            </Text>
          </View> : null}
      </View>;
  }

  renderRight() {
    let component = {};
    if (this.props.type === TYPE.NONE) return null;else if (this.props.type === TYPE.ARROW) component = <Image style={[styles.arrowIcon, {
      transform: [{
        scaleX: I18nManager.isRTL ? -1 : 1
      }]
    }]} source={Images.common.right_arrow} />;else if (this.props.type === TYPE.BUTTON) component = <PopButton sizeLevel={'small'} title={this.props.buttonOption?.title} backgroundColor={this.props.buttonOption?.backgroundColor} titleStyle={this.props.buttonOption?.titleStyle} titleColor={this.props.buttonOption?.titleStyle?.color} disabled={this.props.disabled} allowFontScaling={this.props.allowFontScaling} onPress={this.props.buttonOption?.onPress} />;else if (this.props.type === TYPE.CHOICE) component = <CheckBox style={{
      width: 22,
      height: 22,
      borderRadius: 11
    }} disabled={this.props.disabled} checked={this.props.choiceOption?.checked} checkedColor={this.props.choiceOption?.checkedColor} onValueChange={this.props.choiceOption?.onValueChange} />;else if (this.props.type === TYPE.SWITCH) component = <Switch style={this.props.switchOption?.switchStyle} value={this.props.switchOption?.switchValue} disabled={this.props.disabled} tintColor={this.props.switchOption?.tintColor} onTintColor={this.props.switchOption?.onTintColor} onValueChange={this.props.switchOption?.onSwitchValueChange} />;
    return (//button需要加上flex1否则点击时会消失
      <View style={[styles.right, this.props.type === TYPE.BUTTON ? {
        flex: 1,
        maxWidth: 80
      } : {}]}>
        {component}
      </View>
    );
  }

  renderListCard() {
    return <View style={styles.cardView}>
        <View style={styles.innerView} {...this.props.onPress ? getAccessibilityConfig({
        accessible: this.props.accessible,
        accessibilityLabel: this.props.accessibilityLabel || this.props.title,
        accessibilityHint: this.props.accessibilityHint
      }) : getAccessibilityConfig({
        accessible: this.props.accessible,
        accessibilityLabel: this.props.accessibilityLabel || this.props.title,
        accessibilityHint: this.props.accessibilityHint,
        accessibilityState: {
          disabled: this.props.disabled,
          checked: this.props.choiceOption?.checked,
          value: this.props.switchOption?.switchValue
        }
      })} accessibilityActions={this.props.onPress ? [] : [{
        name: 'activate'
      }]} onAccessibilityAction={this.props.onPress ? null : this.onAccessibilityAction}>
          {this.renderIcon()}
          {this.renderText()}
          {this.renderRight()}
        </View>
        {this.renderSeparator()}
      </View>;
  }

  render() {
    const {
      cardStyle
    } = this.props;
    const defaultCardStyle = {
      height: cardHeight,
      marginTop: 0,
      width: width - adjustSize(36 * 2)
    };
    const mixCardStyle = { ...defaultCardStyle,
      ...cardStyle,
      ...this.radius,
      ...(!this.props.allowFontScaling || this.props.unlimitedHeightEnable ? {
        height: undefined
      } : {})
    };
    return <Card showShadow={false} onPress={this.props.onPress} innerView={this.renderListCard()} cardStyle={mixCardStyle} disabled={this.props.disabled} underlayColor={this.props.cardUnderlayColor || this.context.theme?.listUnderlayColor} allowFontScaling={this.props.allowFontScaling} unlimitedHeightEnable={this.props.unlimitedHeightEnable} />;
  }

  renderSeparator() {
    if (!this.props.showSeparator) return null;
    return this.props.separator || <Separator style={{
      marginHorizontal: Styles.common.padding
    }} />; //20 24
  }

  onAccessibilityAction = ({
    nativeEvent: {
      actionName
    }
  }) => {
    if (this.props.disabled) {
      return;
    }

    if (actionName === 'activate') {
      if (this.props.type === TYPE.SWITCH) this.props.switchOption?.onSwitchValueChange(!this.props.switchOption?.switchValue);else if (this.props.type === TYPE.CHOICE) this.props.choiceOption?.onValueChange(!this.props.choiceOption?.checked);else if (this.props.type === TYPE.BUTTON) this.props.buttonOption?.onPress();
    }
  };
}

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    justifyContent: 'center'
  },
  innerView: {
    flexDirection: 'row',
    marginHorizontal: marginHor,
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 1
  },
  valueText: {
    marginLeft: 6,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  titleView: {
    justifyContent: 'center',
    paddingRight: 10
  },
  iconViewStyle: {
    //icon圆形区域
    width: iconViewLength,
    height: iconViewLength,
    borderRadius: iconViewLength / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13
  },
  iconStyle: {
    width: 24,
    height: 24
  },
  arrowIcon: {
    width: 22,
    height: 22
  },
  right: {
    alignItems: 'flex-end'
  }
});
export default ListCard;