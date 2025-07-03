/** 渐变颜色类型 */

/** 渐变颜色类型 */
export function calculateLineGradientByScale(maxScale, lineGradientColor) {
  if (typeof lineGradientColor === 'string' || typeof lineGradientColor === 'undefined') {
    return lineGradientColor;
  }

  if (Array.isArray(lineGradientColor) && lineGradientColor.length === 0) {
    return undefined;
  }

  return lineGradientColor.reduce((prev, curColor) => {
    const {
      value,
      color,
      offset,
      opacity
    } = curColor;

    if (typeof offset !== 'undefined' || typeof value === 'undefined') {
      prev.push({
        offset,
        color,
        opacity
      });
      return prev;
    }

    const ratio = value / maxScale; // 如果渐变色的offset超过1，则截断
    // 解决ios闪退问题

    if (ratio > 1) {
      if (prev.length === 0) {
        prev.push({
          offset: ratio > 1 ? 1 : ratio,
          color,
          opacity
        });
      }

      return prev;
    }

    prev.push({
      offset: ratio,
      color,
      opacity
    });
    return prev;
  }, []);
}