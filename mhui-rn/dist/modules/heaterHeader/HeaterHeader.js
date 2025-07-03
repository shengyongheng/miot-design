// @ts-nocheck

/* eslint-disable */
import React, { Component, PureComponent } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { adjustSize, window } from "../utils/sizes";
import { FontDefault } from "../utils/fonts";
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from "../../utils/accessibility-helper";
import LinearGradient from "react-native-linear-gradient";

const Source0 = require("../resources/images/heater-dot0.png");

const Source1 = require("../resources/images/heater-dot1.png");

const Source2 = require("../resources/images/heater-dot2.png");

const Source3 = require("../resources/images/heater-dot3.png");

const Source4 = require("../resources/images/heater-dot4.png");

const Source5 = require("../resources/images/heater-dot5.png");

const Source6 = require("../resources/images/heater-dot6.png");

function getRandomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default class HeaterHeader extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    showLargeTitle: PropTypes.bool,
    subtitle: PropTypes.string,
    showSubtitle: PropTypes.bool,
    unit: PropTypes.string,
    disabled: PropTypes.bool,
    themeColor: PropTypes.any,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel
  };

  render() {
    let {
      title,
      showLargeTitle,
      subtitle,
      showSubtitle,
      unit,
      disabled,
      themeColor
    } = this.props; // let color = disabled ? '#47525F' : (themeColor || '#FA9E19');

    if (!title) {
      return null;
    }

    return <View style={Styles.container} {...getAccessibilityConfig({
      accessible: this.props.accessible,
      accessibilityRole: AccessibilityRoles.text,
      accessibilityLabel: this.props.accessibilityLabel
    })}>
        <View style={Styles.container1}>
          <Text style={Styles.titlesContainerHeightHolder}>{' '}</Text>
          {unit ? <Text style={Styles.unitTransparent}>{`${unit}`}</Text> : null}
          {<View style={Styles.titlesContainer}>
              {showLargeTitle ? <Text style={Styles.titleLarge}>{title}</Text> : null}
              {showLargeTitle ? null : <Text style={Styles.titleSmall}>{title}</Text>}
              {showSubtitle ? <Text style={Styles.subtitle}>{subtitle}</Text> : null}
            </View>}
          {unit ? <Text style={Styles.unit}>{`${unit}`}</Text> : null}
          <Text style={Styles.titlesContainerHeightHolder}>{' '}</Text>
        </View>
      </View>;
  }

}

class Dot extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.height,
    source: PropTypes.any
  };
  state = {
    progress: new Animated.Value(0),
    isLoading: true
  };

  startAnimation() {
    this.ani && this.ani.stop();
    this.ani = Animated.loop(Animated.timing(this.state.progress, {
      toValue: 1,
      duration: getRandomBetween(12000, 24000),
      useNativeDriver: true
    })).start();
  }

  onLayout = () => {
    this.setState({
      isLoading: false
    });
  };

  stopAnimation() {
    this.ani && this.ani.stop();
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.startAnimation();
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.stopAnimation();
  }

  render() {
    let {
      width,
      height,
      source
    } = this.props;
    let {
      progress
    } = this.state;
    let originLeft = getRandomBetween(20, 350);
    let opacity = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });
    let translateX = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [originLeft - 3, originLeft + 3]
    });
    const randomTranslateY = getRandomBetween(window.height * 0.8, window.height);
    let translateY = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [randomTranslateY, 0]
    });

    if (this.state.isLoading) {
      return <View onLayout={this.onLayout} style={[StylesDot.container, {
        width,
        height
      }]} />;
    }

    return <Animated.Image style={[StylesDot.container, {
      width,
      height,
      opacity,
      transform: [{
        translateX: translateX
      }, {
        translateY: translateY
      }]
    }]} source={source} />;
  }

}

class Dot0 extends Component {
  render() {
    return <Dot width={26} height={28} source={Source0} />;
  }

}

class Dot1 extends Component {
  render() {
    return <Dot width={4} height={4} source={Source1} />;
  }

}

class Dot2 extends Component {
  render() {
    return <Dot width={3} height={3} source={Source2} />;
  }

}

class Dot3 extends Component {
  render() {
    return <Dot width={16} height={16} source={Source3} />;
  }

}

class Dot4 extends Component {
  render() {
    return <Dot width={8} height={8} source={Source4} />;
  }

}

class Dot5 extends Component {
  render() {
    return <Dot width={22} height={22} source={Source5} />;
  }

}

class Dot6 extends Component {
  render() {
    return <Dot width={83} height={83} source={Source6} />;
  }

}

export class Background extends Component {
  static propTypes = {
    on: PropTypes.bool,
    themeColor: PropTypes.any,
    useAngel: PropTypes.bool,
    angel: PropTypes.number,
    angelCenter: PropTypes.object,
    locations: PropTypes.array,
    colors: PropTypes.array
  };
  static defaultProps = {
    on: false,
    themeColor: null,
    useAngel: true,
    angel: 180,
    angelCenter: {
      x: 0.5,
      y: 0.5
    },
    locations: [0, 1],
    colors: ["#FFAC6A", "rgba(247,247,247,0.25)"]
  };

  getDots() {
    // let { themeColor } = this.props;
    let dots = [];
    let Dots = [Dot0, Dot1, Dot2, Dot3, Dot4, Dot5, Dot6].reverse();
    let dotCount = [14, 11, 18, 10, 11, 10, 11].reverse();
    dotCount.forEach((c, index) => {
      let DotN = Dots[index];

      for (let i = 0; i < c; i++) {
        dots.push(<DotN key={String(index) + String(i)} />);
      }
    });
    return dots;
  }

  render() {
    let {
      on
    } = this.props;
    let gradientProps = {
      useAngel: this.props.useAngel,
      angel: this.props.angel,
      angelCenter: this.props.angelCenter,
      locations: this.props.locations,
      colors: this.props.colors
    };

    if (!on) {
      return <LinearGradient style={StylesBackground.container} {...gradientProps} />;
    } else {
      let dots = this.getDots();
      return <LinearGradient style={StylesBackground.container} {...gradientProps}>
        {dots}
      </LinearGradient>;
    }
  }

}
const Styles = StyleSheet.create({
  container: {
    paddingVertical: adjustSize(195),
    flexDirection: 'column',
    justifyContent: 'center'
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  titleLarge: {
    fontFamily: FontDefault,
    fontSize: adjustSize(240),
    textAlign: 'center',
    color: '#000000'
  },
  titlesContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  titlesContainerHeightHolder: {
    // 防止按下开关后主标题高度变化
    fontFamily: FontDefault,
    fontSize: adjustSize(282),
    textAlign: 'center',
    color: 'transparent'
  },
  titleSmall: {
    fontFamily: FontDefault,
    fontSize: adjustSize(120),
    textAlign: 'center',
    color: '#000000'
  },
  unitTransparent: {
    fontFamily: FontDefault,
    fontSize: adjustSize(54),
    color: 'transparent'
  },
  unit: {
    fontFamily: FontDefault,
    fontSize: adjustSize(54),
    color: '#000000'
  },
  subtitle: {
    fontFamily: FontDefault,
    textAlign: 'center',
    fontSize: adjustSize(42),
    color: '#000000'
  },
  subtitlePlaceHolder: {
    fontFamily: FontDefault,
    textAlign: 'center',
    fontSize: adjustSize(42),
    color: 'transparent'
  }
});
const StylesDot = StyleSheet.create({
  container: {
    position: 'absolute',
    resizeMode: 'contain'
  }
});
const StylesBackground = StyleSheet.create({
  container: {
    height: "100%",
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
});