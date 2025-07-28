import React, { PureComponent } from 'react';
import { Path } from 'react-native-svg';
import { getRadianByAngle, polarToCartesian } from "../../components/circularSlider/coordUtils";

/** 默认的扇形起始角度 */
const DEFAULT_SECTOR_START_ANGLE = 45;
/** 默认的扇形结束角度 */

const DEFAULT_SECTOR_END_ANGLE = 135;
export default class Sector extends PureComponent {
  static defaultProps = {
    sectorRadius: 100,
    sectorStrokeWidth: 1,
    sectorStroke: 'transparent',
    sectorFill: '#FFF7F7F7',
    innerSectorFill: '#FFF',
    activeOpacity: 0.2
  };

  constructor(props) {
    super(props);
    this.state = {
      activeOpacity: 1
    };
  }
  /** 创建外侧扇形 */


  createSector = (startPoint1, endPoint1, startPoint2, endPoint2) => {
    const {
      sectorRadius = 100,
      sectorStrokeWidth = 1,
      sectorStroke = 'transparent',
      sectorFill
    } = this.props;
    const path = `M${startPoint2.x},${startPoint2.y} L${startPoint1.x}, ${startPoint1.y} 
    A ${sectorRadius},${sectorRadius},0,0,0,${endPoint1.x},${endPoint1.y}
    L${endPoint2.x}, ${endPoint2.y}
    A ${sectorRadius},${sectorRadius},0,0,1,${startPoint2.x},${startPoint2.y}
    `;
    return <Path fillOpacity={this.state.activeOpacity} onPress={this.handlePress} onPressIn={this.handlePressIn} onPressOut={this.handlePressOut} d={path} strokeWidth={sectorStrokeWidth} stroke={sectorStroke} fill={sectorFill} />;
  };
  /** 创建内侧扇形 */

  createInnerSector = (startPoint2, endPoint2) => {
    const {
      sectorRadius = 100,
      sectorStrokeWidth = 1,
      sectorStroke = 'transparent',
      innerSectorFill = 'white'
    } = this.props;
    const origin = {
      x: sectorRadius,
      y: sectorRadius
    };
    const path = ` M${origin.x}, ${origin.y} L${endPoint2.x}, ${endPoint2.y} 
    A ${sectorRadius},${sectorRadius},0,0,1,${startPoint2.x},${startPoint2.y}
    L${origin.x}, ${origin.y} 
    `;
    return <Path d={path} strokeWidth={sectorStrokeWidth} stroke={sectorStroke} fill={innerSectorFill} />;
  };
  handlePressIn = () => {
    this.setState({
      activeOpacity: 0.2
    });
  };
  handlePressOut = () => {
    this.setState({
      activeOpacity: 1
    });
  };
  handlePress = () => {
    const onPress = this.props.onPress;

    if (typeof onPress === 'function') {
      onPress();
    }
  };

  render() {
    const {
      startAngle = DEFAULT_SECTOR_START_ANGLE,
      endAngle = DEFAULT_SECTOR_END_ANGLE,
      sectorRadius = 100
    } = this.props;
    const origin = {
      x: sectorRadius,
      y: sectorRadius
    };
    const startRadian = getRadianByAngle(startAngle);
    const endRadian = getRadianByAngle(endAngle);
    /** 外圆弧的最右上方点 */

    const startPoint1 = polarToCartesian(startRadian, sectorRadius);
    /** 外圆弧的最左上方点 */

    const endPoint1 = polarToCartesian(endRadian, sectorRadius);
    /** 内圆弧的右侧点 */

    const startPoint2 = {
      x: (startPoint1.x + origin.x) / 2,
      y: (startPoint1.y + origin.y) / 2
    };
    /** 内圆弧的左侧点 */

    const endPoint2 = {
      x: (endPoint1.x + origin.x) / 2,
      y: (endPoint1.y + origin.y) / 2
    };
    return <>
        {this.createSector(startPoint1, endPoint1, startPoint2, endPoint2)}
        {this.createInnerSector(startPoint2, endPoint2)}
      </>;
  }

}