/** 数据源是否由多组数据点组成 */
export function isMultiGroups(dataset) {
  if (dataset.length === 0) {
    return false;
  }

  const result = dataset.some(rowData => {
    if (rowData.length === 0) {
      return false;
    }

    return Array.isArray(rowData[0]);
  });
  return result;
}
/** 提取viewBox的各个属性 */

export function extractViewBox(viewBox) {
  const spacesRegExp = /\s+/;

  if (!viewBox) {
    return null;
  }

  const params = viewBox.trim().split(spacesRegExp).map(Number);

  if (params.length !== 4 || params.some(v => Number.isNaN(v))) {
    return null;
  }

  return params;
}