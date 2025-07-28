import React, { PureComponent } from 'react';
import Svg, { Defs, LinearGradient, Stop, G } from 'react-native-svg';
import EquilateralTriangle from "./EquilateralTriangle";
import Sector from "./Sector";
/** 扇形区域填充颜色类型 */

/** 扇形区域点击时的渐变颜色ID */
const SECTOR_PRESS_RADIAL_GRADIENT_ID = 'SECTOR_PRESS_RADIAL_GRADIENT_ID';
/** 扇形区域未点击时的渐变颜色ID */

const SECTOR_RAW_RADIAL_GRADIENT_ID = 'SECTOR_RAW_RADIAL_GRADIENT_ID';
/** 扇形的数量 */

const NUM_SECTOR = 4;
/** 相邻扇形的旋转角度 */

const ADJACENT_SECTOR_ROTATE_ANGLE = 90;
export default class ManualAdjuster extends PureComponent {
  // adjusterPartialConfig: { rotateAngle: number }[];
  static defaultProps = {
    sectorRadius: 100,
    sectorStrokeWidth: 1,
    sectorStroke: 'transparent',
    innerSectorFill: '#FFF',
    sectorPressColor: [{
      offset: 0.4,
      stopColor: 'rgba(49,194,166,0.00)'
    }, {
      offset: 1,
      stopColor: 'rgba(49,194,166,0.40)'
    }],
    sectorRawColor: '#FFF7F7F7',
    triangleOffset: 0,
    triangleSlideLength: 10,
    triangleFill: 'black',
    triangleStroke: 'transparent',
    triangleStrokeWidth: 1
  };

  constructor(props) {
    super(props);
    this.state = {
      pressedId: 0
    };
    this.sectorsConfig = Array(NUM_SECTOR).fill(0).map((_value, idx) => idx);
  }

  handlePress = idx => {
    this.setState({
      pressedId: idx
    });
  };
  createSectors = () => {
    const {
      sectorRadius = 100,
      sectorStrokeWidth,
      sectorStroke,
      innerSectorFill = '#FFF',
      sectorPressColor,
      sectorRawColor,
      triangleOffset = 0,
      triangleSlideLength,
      triangleFill,
      triangleStroke,
      triangleStrokeWidth
    } = this.props;
    const {
      pressedId
    } = this.state;
    const sectorPressFill = typeof sectorPressColor === 'string' || typeof sectorPressColor === 'undefined' ? sectorPressColor : `url(#${SECTOR_PRESS_RADIAL_GRADIENT_ID})`;
    const sectorRawFill = typeof sectorRawColor === 'string' || typeof sectorRawColor === 'undefined' ? sectorRawColor : `url(#${SECTOR_RAW_RADIAL_GRADIENT_ID})`;
    const triangleCentre = {
      x: sectorRadius,
      y: sectorRadius / 4 + triangleOffset
    };
    const sectors = this.sectorsConfig.map(idx => {
      const transform = `rotate(${ADJACENT_SECTOR_ROTATE_ANGLE * idx}, ${sectorRadius}, ${sectorRadius})`;
      return <G transform={transform} key={idx}>
          <Sector sectorFill={idx === pressedId ? sectorPressFill : sectorRawFill} sectorRadius={sectorRadius} sectorStroke={sectorStroke} sectorStrokeWidth={sectorStrokeWidth} innerSectorFill={innerSectorFill} onPress={() => this.handlePress(idx)} />
          <EquilateralTriangle centre={triangleCentre} triangleSlideLength={triangleSlideLength} triangleFill={triangleFill} triangleStroke={triangleStroke} triangleStrokeWidth={triangleStrokeWidth} onPress={() => this.handlePress(idx)} />
        </G>;
    });
    return sectors;
  };
  createRadialGradient = (radialGradientId, stopColors) => {
    const {
      sectorRadius = 100
    } = this.props;

    if (Array.isArray(stopColors) && stopColors.length > 0) {
      return <LinearGradient id={radialGradientId} // cx={sectorRadius}
      // cy={sectorRadius}
      // r={sectorRadius}
      x1={sectorRadius} y1={sectorRadius} x2={sectorRadius} y2={0} gradientUnits="userSpaceOnUse">
          {stopColors.map(({
          offset,
          stopColor,
          stopOpacity
        }, idx) => // eslint-disable-next-line react/no-array-index-key
        <Stop key={idx} offset={offset} stopColor={stopColor} stopOpacity={stopOpacity} />)}
        </LinearGradient>;
    }

    return null;
  };

  render() {
    const {
      sectorRadius = 100,
      sectorPressColor,
      sectorRawColor
    } = this.props;
    const svgSize = 2 * sectorRadius;
    return <Svg width={svgSize} height={svgSize}>
        <Defs>
          {this.createRadialGradient(SECTOR_RAW_RADIAL_GRADIENT_ID, sectorRawColor)}
          {this.createRadialGradient(SECTOR_PRESS_RADIAL_GRADIENT_ID, sectorPressColor)}
        </Defs>
        {this.createSectors()}
      </Svg>;
  }

}