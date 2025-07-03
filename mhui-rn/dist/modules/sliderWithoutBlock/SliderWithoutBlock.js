// @ts-nocheck

/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Switch from "../../components/switch/Switch";
import { SlideGearWithoutBlock } from "../slideGearWithoutBlock"; // import ContainerWithShadowAndSeparator from 'miot/ui/ContainerWithShadowAndSeparator';

import { ContainerWithShadowAndSeparator } from "../containerWithShadowAndSeparator";
import { log } from "../utils/fns";
import { adjustSize } from "../utils/sizes";
import { FontDefault } from "../utils/fonts";
import { ColorGreen } from "../utils/colors";
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from "../../utils/accessibility-helper";
export default class SliderWithoutBlock extends Component {
  static propTypes = {
    options: PropTypes.array,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    initValue: PropTypes.number,
    onSlidingChange: PropTypes.func,
    onSlidingComplete: PropTypes.func,
    disabled: PropTypes.bool,
    switchDisabled: PropTypes.bool,
    themeColor: PropTypes.any,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    contentType: PropTypes.string,
    showEndText: PropTypes.bool,
    showSwitch: PropTypes.bool,
    switchOn: PropTypes.bool,
    invisible: PropTypes.bool,
    onSwitch: PropTypes.func,
    hasShadow: PropTypes.bool,
    showEndImage: PropTypes.bool,
    leftEndImage: PropTypes.any,
    rightEndImage: PropTypes.any,
    leftEndHighlightImage: PropTypes.any,
    rightEndHighlightImage: PropTypes.any,
    leftEndDisImage: PropTypes.any,
    rightEndDisImage: PropTypes.any,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint,
    sliderAccessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    sliderAccessibilityHint: AccessibilityPropTypes.accessibilityHint
  };
  static defaultProps = {
    options: [],
    min: 0,
    max: 0,
    step: 0,
    initValue: 0,
    onSlidingChange: log,
    onSlidingComplete: log,
    disabled: false,
    switchDisabled: false,
    themeColor: '',
    title: '',
    subtitle: '',
    contentType: '',
    showEndText: true,
    showSwitch: false,
    switchOn: true,
    onSwitch: log,
    hasShadow: true,
    showEndImage: 'false',
    invisible: false,
    leftEndImage: '',
    rightEndImage: '',
    leftEndHighlightImage: '',
    rightEndHighlightImage: ''
  };
  onSlidingChange = v => {
    let {
      onSlidingChange,
      options,
      min,
      max,
      step
    } = this.props;
    let isRange = min !== max && step !== 0; // let isRange = false;

    onSlidingChange(isRange ? v : options[v]);
  };
  onSlidingComplete = v => {
    let {
      onSlidingComplete,
      options,
      min,
      max,
      step
    } = this.props;
    let isRange = min !== max && step !== 0; // let isRange = false;

    onSlidingComplete(isRange ? v : options[v]);
  };
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
      options,
      disabled,
      switchDisabled,
      themeColor,
      showSwitch,
      switchOn,
      onSwitch,
      initValue,
      title,
      subtitle,
      hasShadow,
      min,
      max,
      step,
      contentType,
      showEndText,
      showEndImage,
      leftEndImage,
      rightEndImage,
      leftEndHighlightImage,
      rightEndHighlightImage,
      leftEndDisImage,
      rightEndDisImage
    } = this.props;
    let isRange = min !== max && step !== 0;

    if ((!options || !options.length) && !isRange) {
      return null;
    }

    let initSelectedIndex = options.findIndex(option => {
      return option === initValue;
    });
    let Wrap = hasShadow ? ContainerWithShadowAndSeparator : Fragment;
    return <Wrap invisible={this.props.invisible}>
        <View style={Styles.container}>
          {title || subtitle || showSwitch ? <View style={[Styles.header, disabled ? {
          opacity: 0.3
        } : null]} {...getAccessibilityConfig({
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
              {title || subtitle ? <View style={Styles.titleContainer}>
                  {title ? <Text style={Styles.title}>{title}</Text> : null}
                  {title && subtitle ? <View style={Styles.titleSeparator}></View> : null}
                  {subtitle ? <Text style={Styles.subtitle}>{subtitle}</Text> : null}
                </View> : null}
              {showSwitch ? <Switch disabled={disabled} value={switchOn} onTintColor={themeColor || ColorGreen} onValueChange={onSwitch} {...getAccessibilityConfig({
            accessible: false
          })} /> : null}
            </View> : null}

          {showSwitch && !switchOn ? null : <View style={[Styles.sliderContainer, title || subtitle || showSwitch ? Styles.sliderContainerWithHeader : null]}>
              <SlideGearWithoutBlock disabled={disabled || showSwitch && switchDisabled} containerStyle={Styles.slider} options={isRange ? [] : options} minimumTrackTintColor={themeColor || ColorGreen} contentType={contentType} showEndText={showEndText} value={isRange ? initValue : Math.max(0, initSelectedIndex)} optionMin={min} optionMax={max} optionStep={step} onValueChange={this.onSlidingChange} onSlidingComplete={this.onSlidingComplete} showEndImage={showEndImage} leftEndImage={leftEndImage} rightEndImage={rightEndImage} leftEndHighlightImage={leftEndHighlightImage} rightEndHighlightImage={rightEndHighlightImage} leftEndDisImage={leftEndDisImage} rightEndDisImage={rightEndDisImage} {...getAccessibilityConfig({
            accessible: this.props.accessible,
            accessibilityLabel: this.props.sliderAccessibilityLabel || `${title} ${subtitle}`,
            accessibilityHint: this.props.sliderAccessibilityHint
          })} />
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
    color: 'rgba(0, 0, 0, 0.6)'
  },
  sliderContainer: {
    // paddingVertical: adjustSize(124)
    paddingBottom: adjustSize(81)
  },
  sliderContainerWithHeader: {
    paddingTop: adjustSize(33)
  }
}); //@native end