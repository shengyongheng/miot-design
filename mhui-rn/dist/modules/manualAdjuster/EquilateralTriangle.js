import React, { PureComponent } from 'react';
import { Polygon } from 'react-native-svg';
export default class EquilateralTriangle extends PureComponent {
  static defaultProps = {
    centre: {
      x: 0,
      y: 0
    },
    triangleSlideLength: 12,
    triangleFill: 'black',
    triangleStroke: 'transparent',
    triangleStrokeWidth: 1,
    activeOpacity: 0.2
  };

  constructor(props) {
    super(props);
    this.state = {
      activeOpacity: 1
    };
  }

  handlePressIn = () => {
    this.setState({
      activeOpacity: 0.2
    });
  };
  handlePress = () => {
    const onPress = this.props.onPress;

    if (typeof onPress === 'function') {
      onPress();
    }
  };
  handlePressOut = () => {
    this.setState({
      activeOpacity: 1
    });
  };

  render() {
    const {
      centre = {
        x: 0,
        y: 0
      },
      triangleSlideLength: slideLength = 12,
      triangleFill,
      triangleStroke,
      triangleStrokeWidth
    } = this.props;
    const triHeight = slideLength / 2 * 3 ** 0.5;
    const points = `${centre.x},${centre.y - triHeight / 2} 
    ${centre.x + slideLength / 2},${centre.y + triHeight / 2}
    ${centre.x - slideLength / 2},${centre.y + triHeight / 2}`;
    return <Polygon fillOpacity={this.state.activeOpacity} onPress={this.handlePress} onPressIn={this.handlePressIn} onPressOut={this.handlePressOut} points={points} fill={triangleFill} stroke={triangleStroke} strokeWidth={triangleStrokeWidth} />;
  }

}