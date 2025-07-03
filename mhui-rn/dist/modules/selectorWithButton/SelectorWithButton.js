// @ts-nocheck

/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { ConfigContext } from "../../components/configProvider";
import Switch from "../../components/switch/Switch";
import CircleButton from "../circleButton/CircleButton";
import ContainerWithShadowAndSeparator from "../containerWithShadowAndSeparator/ContainerWithShadowAndSeparator";
import { adjustSize } from "../utils/sizes";
import { NOOP, log, isSameArrayElements } from "../utils/fns";
import { FontDefault } from "../utils/fonts";
import { ColorGreen } from "../utils/colors";
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from "../../utils/accessibility-helper";
export default class SelectorWithButton extends Component {
  static contextType = ConfigContext;
  static propTypes = {
    title: PropTypes.string,
    //标题
    subtitle: PropTypes.string,
    //副标题
    items: PropTypes.arrayOf(PropTypes.shape({
      //item选项
      icon: PropTypes.oneOf([PropTypes.number, PropTypes.object]).required,
      iconSelected: PropTypes.oneOf([PropTypes.number, PropTypes.object]).required,
      title: PropTypes.string,
      accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
      accessibilityHint: AccessibilityPropTypes.accessibilityHint
    })),
    initSelectedIndexs: PropTypes.array,
    //初始选择选项数组 默认[0]
    onSelected: PropTypes.func,
    //点击事件
    disabled: PropTypes.bool,
    //禁用 默认false
    switchDisabled: PropTypes.bool,
    //开关禁用 [无效属性]
    alwaysShowSelectors: PropTypes.bool,
    //是否一直显示选项 [设为false时，showSwitch为true且switchOn为false下不显示选项] 默认false
    themeColor: PropTypes.any,
    //主题色
    multiple: PropTypes.bool,
    //是否支持多选
    minSelected: PropTypes.number,
    //最少选择项 默认1
    maxSelected: PropTypes.number,
    //最多选择项 默认Infinity
    showSwitch: PropTypes.bool,
    //是否显示开关 默认false
    switchOn: PropTypes.bool,
    //开关初始状态 默认true
    onSwitch: PropTypes.func,
    //开关点击事件 默认log
    hasShadow: PropTypes.bool,
    //是否有阴影 默认true
    maxNumberInRow: PropTypes.number,
    //每行最多容纳的Button个数 默认4
    hideTitleLeastNumber: PropTypes.number,
    //当选项数量大于等于该值时，隐藏选项title 默认1000
    isHorizontal: PropTypes.bool,
    // 两个item下是否横向展示 默认true
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint
  };
  static defaultProps = {
    title: '',
    subtitle: '',
    items: [],
    initSelectedIndexs: [0],
    onSelected: NOOP,
    disabled: false,
    switchDisabled: false,
    alwaysShowSelectors: false,
    themeColor: '',
    offColor: '',
    multiple: false,
    minSelected: 1,
    maxSelected: Infinity,
    showSwitch: false,
    switchOn: true,
    onSwitch: log,
    hasShadow: true,
    maxNumberInRow: 4,
    isHorizontal: true,
    hideTitleLeastNumber: 1000
  };
  state = {
    selectedIndexs: [0]
  };
  select = index => {
    let {
      disabled,
      switchDisabled,
      multiple,
      onSelected,
      minSelected,
      maxSelected
    } = this.props;

    if (disabled || switchDisabled) {
      return;
    }

    let selectedIndexs = [...this.state.selectedIndexs];
    let selectedIndex = selectedIndexs.indexOf(index);
    let hasChanged = false;

    if (multiple) {
      if (selectedIndex === -1) {
        if (selectedIndexs.length >= maxSelected) {
          selectedIndexs.shift();
        }

        selectedIndexs.push(index);
        hasChanged = true;
      } else {
        if (selectedIndexs.length > minSelected) {
          selectedIndexs.splice(selectedIndex, 1);
          hasChanged = true;
        }
      }
    } else {
      if (selectedIndex === -1) {
        hasChanged = true;
        selectedIndexs = [index];
      }
    }

    if (hasChanged) {
      onSelected(selectedIndexs);
    }

    return null;
  };

  getSizeLevel(items) {
    let itemCount = items.length;
    return itemCount <= 2 ? 0 : itemCount === 3 ? 1 : 2;
  }

  getSelectors = () => {
    let {
      items,
      themeColor,
      disabled,
      switchDisabled,
      maxNumberInRow,
      hideTitleLeastNumber
    } = this.props;
    let {
      selectedIndexs
    } = this.state;
    let itemCount = items.length;
    let sizeLevel = this.getSizeLevel(items);
    let isHorizontal = itemCount === 2 ? this.props.isHorizontal : false;
    let hasSeparator = itemCount === 2;
    let newArray = [];
    let index = 0;

    while (index < items.length) {
      newArray.push(items.slice(index, index += maxNumberInRow)); // 由于超过4(maxNumberInRow)个模式需要换行，先将模式数组按长度4(maxNumberInRow)分割成多份
    }

    return newArray.map((array, index1) => {
      return <View key={index1} style={[Styles.selectors, itemCount === 2 && !isHorizontal ? {
        justifyContent: 'space-evenly'
      } : {}]}>
          {array.map((item, index2) => {
          let realIndex = index2 + maxNumberInRow * index1;
          let selected = selectedIndexs.indexOf(realIndex) !== -1;
          let numInOneRow = itemCount > maxNumberInRow ? maxNumberInRow : itemCount;
          let hideTitle = items.findIndex(item => {
            return item;
          }) === -1 || numInOneRow >= 5 && this.context.language !== 'zh' || itemCount >= hideTitleLeastNumber;
          return <Fragment key={index2 + maxNumberInRow * index1}>
                  {hasSeparator && realIndex > 0 ? <View style={Styles.separator}></View> : null}

                  <CircleButton sizeLevel={sizeLevel} horizontal={isHorizontal} themeColor={themeColor} disabled={disabled || switchDisabled} selected={selected} title={hideTitle ? '' : item.title} icon={item.icon} iconSelected={item.iconSelected} iconText={item.title || ''} onPress={() => {
              this.select(realIndex);
            }} {...getAccessibilityConfig({
              accessible: this.props.accessible,
              accessibilityLabel: item.accessibilityLabel,
              accessibilityHint: item.accessibilityHint
            })} />
                </Fragment>;
        })}
          {
        /* 为使最后一行从左向右排，且与上行对齐，需要补齐空缺位置但不显示 */
        itemCount > maxNumberInRow && itemCount % maxNumberInRow !== 0 && index1 === parseInt(itemCount / maxNumberInRow) ? Array.apply(null, Array(maxNumberInRow - itemCount % maxNumberInRow)).map((item, index) => {
          return <View style={{
            opacity: 0
          }} key={index}><CircleButton sizeLevel={sizeLevel} disabled {...getAccessibilityConfig({
              accessible: false
            })} /></View>;
        }) : null}
        </View>;
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let {
      initSelectedIndexs: selectedIndexsProp
    } = nextProps;
    let {
      initSelectedIndexs: selectedIndexsState
    } = prevState;

    if (isSameArrayElements(selectedIndexsProp, selectedIndexsState)) {
      return null;
    }

    return {
      selectedIndexs: selectedIndexsProp
    };
  }

  onAccessibilityAction = ({
    nativeEvent: {
      actionName
    }
  }) => {
    const {
      disabled,
      showSwitch,
      switchOn,
      onSwitch
    } = this.props;

    if (disabled || !showSwitch || !onSwitch || actionName !== 'activate') {
      return;
    }

    onSwitch(!switchOn);
  };

  render() {
    let {
      title,
      subtitle,
      items,
      hasShadow,
      showSwitch,
      disabled,
      switchOn,
      themeColor,
      onSwitch,
      maxNumberInRow,
      alwaysShowSelectors
    } = this.props;

    if (!items || !items.length) {
      return null;
    }

    let Wrap = hasShadow ? ContainerWithShadowAndSeparator : Fragment;
    let sizeLevel = this.getSizeLevel(items);
    let opacity = disabled ? 0.3 : 1;
    return <Wrap>
        <View style={Styles.container}>
          {title || subtitle || showSwitch ? <View style={[Styles.header]} {...getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityRole: showSwitch ? AccessibilityRoles.switch : AccessibilityRoles.text,
          accessibilityLabel: this.props.accessibilityLabel,
          accessibilityHint: showSwitch ? this.props.accessibilityHint : '',
          accessibilityState: showSwitch ? {
            disabled,
            checked: switchOn
          } : {
            disabled
          }
        })} accessibilityActions={[{
          name: 'activate'
        }]} onAccessibilityAction={this.onAccessibilityAction}>
              {title || subtitle ? <View style={[Styles.titleContainer, {
            opacity
          }]}>
                  {title ? <Text style={Styles.title} ellipsizeMode='tail' numberOfLines={1}>{title}</Text> : null}
                  {title && subtitle ? <View style={Styles.titleSeparator}></View> : null}
                  {subtitle ? <Text style={Styles.subtitle} ellipsizeMode='tail' numberOfLines={1}>{subtitle}</Text> : null}
                </View> : null}
              {showSwitch ? <Switch disabled={disabled} value={switchOn} onTintColor={themeColor || ColorGreen} onValueChange={onSwitch} /> : null}
            </View> : null}

          {showSwitch && !switchOn ? alwaysShowSelectors ? <View style={[title || subtitle || showSwitch ? Styles.selectorsWithHeader : null, items.length >= maxNumberInRow ? null : [Styles.selectorsPadding0, Styles.selectorsPadding1, Styles.selectorsPadding2, Styles.selectorsPadding3][sizeLevel]]}>
                    {this.getSelectors()}
                  </View> : null : <View style={[title || subtitle || showSwitch ? Styles.selectorsWithHeader : null, items.length >= maxNumberInRow ? null : [Styles.selectorsPadding0, Styles.selectorsPadding1, Styles.selectorsPadding2, Styles.selectorsPadding3][sizeLevel]]}>
                {this.getSelectors()}
              </View>}
        </View>
      </Wrap>;
  }

}
const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: adjustSize(60)
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between' // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(0, 0, 0, 0.15)'

  },
  titleContainer: {
    flex: 1,
    height: adjustSize(156),
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: adjustSize(42),
    fontFamily: FontDefault,
    color: '#000'
  },
  titleSeparator: {
    width: 1,
    height: adjustSize(42),
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginHorizontal: adjustSize(18)
  },
  subtitle: {
    fontSize: adjustSize(36),
    fontFamily: FontDefault,
    color: 'rgba(0, 0, 0, 0.6)',
    flex: 1
  },
  selectors: {
    paddingVertical: adjustSize(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  selectorsWithHeader: {
    paddingTop: 0
  },
  selectorsPadding0: {
    paddingHorizontal: adjustSize(0)
  },
  selectorsPadding1: {
    paddingHorizontal: adjustSize(78)
  },
  selectorsPadding2: {
    paddingHorizontal: adjustSize(0)
  },
  selectorsPadding3: {
    paddingHorizontal: adjustSize(0)
  },
  selectorWithHeader: {
    paddingTop: 0
  },
  separator: {
    width: 1,
    height: adjustSize(120),
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    marginHorizontal: adjustSize(60)
  }
});