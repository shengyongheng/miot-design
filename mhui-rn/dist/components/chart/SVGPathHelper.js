// 利用Cubic Bezier Curves绘制平滑的svg路径
// 参考链接：https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
export const SMOOTH_RATIO = 0.2; // Svg path line command
// I:  - point (array) [x, y]: coordinates
// O:  - (string) 'L x,y': svg line command

const lineCommand = point => `L ${point[0]} ${point[1]}`; // Properties of a line
// I:  - pointA (array) [x,y]: coordinates
//     - pointB (array) [x,y]: coordinates
// O:  - (object) { length: l, angle: a }: properties of the line


const line = (pointA, pointB) => {
  const lengthX = pointB[0] - pointA[0];
  const lengthY = pointB[1] - pointA[1];
  return {
    length: Math.sqrt(lengthX ** 2 + lengthY ** 2),
    angle: Math.atan2(lengthY, lengthX)
  };
};
/**
 * 计算控制点
 * @param current
 * @param previous
 * @param next
 * @param reverse 设置方向
 * @param truncValue 控制点在y方向上的截断值。
 */


const controlPoint = (current, previous, next, option) => {
  const {
    reverse = false,
    truncValue,
    smoothing = 0.2
  } = option || {}; // When 'current' is the first or last point of the array
  // 'previous' or 'next' don't exist.
  // Replace with 'current'

  const p = previous || current;
  const n = next || current; // Properties of the opposed-line

  const o = line(p, n); // If is end-control-point, add PI to the angle to go backward

  const angle = o.angle + (reverse ? Math.PI : 0);
  const length = o.length * smoothing; // The control point position is relative to the current point

  const x = current[0] + Math.cos(angle) * length;
  const y = current[1] + Math.sin(angle) * length;

  if (truncValue !== undefined && y > truncValue) {
    return [x, truncValue];
  }

  return [x, y];
}; // Create the bezier curve command
// I:  - point (array) [x,y]: current point coordinates
//     - i (integer): index of 'point' in the array 'a'
//     - a (array): complete array of points coordinates
// O:  - (string) 'C x2,y2 x1,y1 x,y': SVG cubic bezier C command


const bezierCommand = (point, i, a, truncValue) => {
  // start control point
  const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point, {
    reverse: false,
    truncValue
  }); // end control point

  const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], {
    reverse: true,
    truncValue
  });
  return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
};
/**
 * 生成path路径
 * @param points 一组数据点
 * @param command lineCommand or bezierCommand
 * @param truncValue 控制点在y方向上的截断值。只有在bezierCommand下有效
 */


const getSvgPath = (points, command, truncValue) => {
  // build the d attributes by looping over the points
  const d = points.reduce((acc, point, i, a) => i === 0 // if first point
  ? `M ${point[0]},${point[1]}` // else
  : `${acc} ${command(point, i, a, truncValue)}`, '');
  return d;
};
/**
 * 将完整path路径分成多个片段
 * @param points 一组数据点
 * @param command lineCommand or bezierCommand
 * @param fragmentSize 组成片段需要的数据点数量
 * @param truncValue 控制点在y方向上的截断值。只有在bezierCommand下有效
 */


const getSvgPathFragments = (points, command, fragmentSize = 1, truncValue) => {
  const len = points.length;
  let fragmentIdx = 0;
  const fragments = [];
  /** 片段从起始点到终点经过的数据点数。如步长为1时，片段1：0 1， 片段2：1 2 */

  const stepSize = Math.max(fragmentSize - 1, 1);

  while (fragmentIdx * stepSize < len) {
    const startIndex = fragmentIdx * stepSize;
    const currentSize = startIndex + stepSize > len ? len - startIndex : stepSize;
    const currentPath = Array.from({
      length: currentSize + 1
    }).map((v, idx) => {
      if (startIndex + idx >= len) {
        return '';
      }

      return idx === 0 ? `M ${points[startIndex + idx][0]},${points[startIndex + idx][1]}` : `${command(points[startIndex + idx], startIndex + idx, points, truncValue)}`;
    }).join(' ');
    fragments.push(currentPath);
    fragmentIdx += 1;
  }

  return fragments;
};

export default getSvgPath;
export { lineCommand, bezierCommand, getSvgPathFragments };