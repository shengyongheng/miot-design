// @ts-nocheck

/* eslint-disable */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { BoxShadow } from 'react-native-shadow';
import { adjustSize } from "../utils/sizes";
import GapWrap from "./GapWrap";
export default class ContainerWithShadowAndSeparator extends Component {
  static propTypes = {
    containerStyle: PropTypes.any,
    separatorStyle: PropTypes.any,
    horizontal: PropTypes.bool,
    invisible: PropTypes.bool
  };
  static defaultProps = {
    containerStyle: {},
    separatorStyle: {},
    horizontal: false,
    invisible: false
  };
  state = {
    width: adjustSize(1020),
    height: adjustSize(240)
  };

  getContents() {
    const {
      children,
      separatorStyle,
      horizontal
    } = this.props;

    if (!children) {
      return null;
    }

    return (Array.isArray(children) ? children : [children]).filter(child => {
      return !!child;
    }).map((child, index) => {
      return <GapWrap key={`${index}`} hasSeparator={index > 0} horizontal={horizontal} separatorStyle={separatorStyle}>
          {child}
        </GapWrap>;
    });
  }

  onLayout = e => {
    const {
      width,
      height
    } = e.nativeEvent.layout;
    this.setState({
      width,
      height
    });
  };

  render() {
    const contents = this.getContents();
    const {
      containerStyle,
      horizontal,
      invisible
    } = this.props;
    const {
      width,
      height
    } = this.state;

    if (!contents) {
      return null;
    }

    return <View style={[Styles.box, {
      height: height <= 1 ? 0 : height + adjustSize(9),
      overflow: 'visible',
      opacity: invisible ? 0 : 1
    }]}>
        <BoxShadow setting={{
        width,
        height,
        color: '#000',
        border: adjustSize(9),
        radius: adjustSize(30),
        opacity: 0.015,
        x: 0,
        y: adjustSize(9),
        style: {
          position: 'absolute',
          top: 0,
          left: 0
        }
      }}>
        </BoxShadow>
        <View style={[Styles.container, horizontal ? Styles.containerHorizontal : Styles.containerVertical, containerStyle]} onLayout={this.onLayout}>
          {contents}
        </View>
      </View>;
  }

}
const Styles = StyleSheet.create({
  box: {
    position: 'relative'
  },
  container: {
    borderRadius: adjustSize(33),
    overflow: 'hidden',
    backgroundColor: '#fff'
  },
  containerHorizontal: {
    flexDirection: 'row'
  }
});