// @ts-nocheck

/* eslint-disable */

/**
 * @export
 * @module miot/ui/ImageButton
 * @description 按钮
 *
 */
import React from 'react';
import { Image, TouchableWithoutFeedback, I18nManager } from 'react-native';
import PropTypes from 'prop-types';
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from "../../utils/accessibility-helper";
import { referenceReport } from "../../decorators/reportDecorator";

class ImageButton extends React.Component {
  constructor(props) {
    super(props);
    referenceReport('ImageButton');
    this.state = {
      buttonPressed: false
    };
  }

  static initialState = {
    buttonPressed: false
  };
  static propTypes = {
    source: PropTypes.any,
    highlightedSource: PropTypes.any,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    style: PropTypes.any,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint
  };
  static defaultProps = {
    source: null,
    highlightedSource: null,
    onPress: null
  };

  _buttonPressIn() {
    this.setState({
      buttonPressed: true
    });
  }

  _buttonPressOut() {
    this.setState({
      buttonPressed: false
    });
  }

  _isButtonPressed() {
    return this.state.buttonPressed;
  }

  render() {
    let source = this.props.source;

    if (this._isButtonPressed() && this.props.highlightedSource) {
      source = this.props.highlightedSource;
    } // const Touchable =
    //   Platform.OS === 'android' ? TouchableNativeFeedback : TouchableWithoutFeedback;


    return <TouchableWithoutFeedback disabled={this.props.disabled} onPress={this.props.onPress} onPressIn={this._buttonPressIn.bind(this)} onPressOut={this._buttonPressOut.bind(this)} {...getAccessibilityConfig({
      accessible: this.props.accessible,
      accessibilityRole: AccessibilityRoles.button,
      accessibilityLabel: this.props.accessibilityLabel,
      accessibilityHint: this.props.accessibilityHint,
      accessibilityState: {
        disabled: !!this.props.disabled
      }
    })}>
        <Image style={[this.props.style, {
        transform: [{
          scaleX: I18nManager.isRTL ? -1 : 1
        }]
      }]} source={source} />
      </TouchableWithoutFeedback>;
  }

}

export default ImageButton;