import { StyleSheet } from 'react-native';
import { FontSecondary } from "../../constants/font";
export const DEFAULT_X_AXIS_MAX_SPLIT_NUM = 7;
/** 最高点数据（y轴坐标）占最大刻度（y轴）的比率 */

export const RATIO_OF_MAX_SCALE_MAX_DATA = 0.8;
/** 默认的y轴数据最大值 */

export const DEFAULT_MAX_Y_AXIS_DATA = 10;
/** 最小点击区域 */

export const DEFAULT_MIN_PRESS_RADIUS = 10;
/** dotRawPassable开启的最大点数限制 */

export const MAX_POINTS_CAN_RAW_PASSABLE = 30;
/** 默认x轴数据距离x轴偏移量 */

export const defaultXAxisDataOffset = {
  dx: 0,
  dy: -5
};
/** 默认y轴数据距离x轴偏移量 */

export const defaultYAxisDataOffset = {
  dx: 0,
  dy: 10
};
/** 默认分割线样式 */

export const defaultLineStyle = {
  stroke: 'rgba(0,0,0,0.20)',
  strokeWidth: StyleSheet.hairlineWidth,
  strokeDasharray: [10, 5]
};
/** 默认标签样式 */

export const defaultLabelStyle = {
  fill: '#B2B2B2',
  strokeWidth: '0.5',
  fontSize: '10',
  // '10', // '10',
  textAnchor: 'middle',
  // 'start',
  ...FontSecondary
};