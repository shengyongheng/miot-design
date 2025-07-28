import React, { useCallback, useMemo } from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import BarItem from "./BarItem";

/**
 * GroupBarItem 一组或多组柱形条
 */
const GroupBarItem = React.memo(props => {
  const {
    identifier = 0,
    dy = 0,
    barHeights = [],
    totalWidth,
    fill,
    underlayColor,
    borderTopRadius = 3,
    containerHeight = 0,
    containerWidth = totalWidth,
    containerUnderlayColor = 'transparent',
    containerActiveOpacity = 0.85,
    onPress
  } = props;
  /** 处理点击的回调。目前只支持点击整个组，不会返回正确的groupIndex。 */

  const handlePress = useCallback(groupIndex => {
    if (typeof onPress === 'function') {
      if (typeof groupIndex === 'number') {
        onPress(identifier, groupIndex);
      } else {
        onPress(identifier);
      }
    }
  }, [identifier, onPress]);

  const createBars = () => {
    if (!Array.isArray(barHeights)) {
      return <BarItem width={totalWidth} identifier={identifier} fill={Array.isArray(fill) ? fill[0] : fill} underlayColor={Array.isArray(underlayColor) ? underlayColor[0] : underlayColor} height={barHeights} borderTopRadius={borderTopRadius} onPress={handlePress} />;
    }

    if (barHeights.length === 0) {
      return null;
    }

    const itemWidth = totalWidth / barHeights.length;
    const bars = barHeights.map((height, groupIndex) => <BarItem // eslint-disable-next-line react/no-array-index-key
    key={groupIndex} identifier={groupIndex} borderTopRadius={borderTopRadius} fill={Array.isArray(fill) ? fill[groupIndex] : fill} underlayColor={Array.isArray(underlayColor) ? underlayColor[groupIndex] : underlayColor} height={height} width={itemWidth} onPress={handlePress} />);
    return bars;
  };

  const containerStyle = useMemo(() => ({ ...styles.container,
    position: 'absolute',
    left: dy,
    width: containerWidth,
    height: containerHeight
  }), [dy, containerWidth, containerHeight]);
  return <TouchableHighlight style={containerStyle} onPress={handlePress} activeOpacity={containerActiveOpacity} underlayColor={containerUnderlayColor}>
      <>
        {createBars()}
      </>
    </TouchableHighlight>;
});
export default GroupBarItem;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    overflow: 'hidden'
  }
});