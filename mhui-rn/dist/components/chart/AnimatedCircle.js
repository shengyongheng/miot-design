import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { Animated, PanResponder } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

/** 小球正常时的缩放倍数 */
const NORMAL_SCALE = 1;
/** 小球放大时的缩放倍数 */

const ENLARGE_SCALE = 1.2;
const AnimatedG = Animated.createAnimatedComponent(Circle);

const AnimatedCircle = props => {
  const {
    onPress,
    identifier,
    x,
    y,
    r = 0,
    fill,
    stroke,
    strokeWidth,
    hitSlop = 10,
    isSelected = false
  } = props;
  /** 防止首次加载调用动画而设置的标识符 */

  const isFirst = useRef(true);
  const scale = useRef(new Animated.Value(NORMAL_SCALE)).current;
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    if (isSelected) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [isSelected, identifier, x, y]);

  const startAnimation = callback => {
    scale.setValue(NORMAL_SCALE);
    Animated.spring(scale, {
      toValue: ENLARGE_SCALE,
      bounciness: 15,
      speed: 9,
      useNativeDriver: true
    }).start(() => {
      if (typeof callback === 'function') {
        callback();
      }
    });
  };

  const stopAnimation = () => {
    scale.setValue(ENLARGE_SCALE);
    Animated.spring(scale, {
      toValue: NORMAL_SCALE,
      bounciness: 15,
      speed: 9,
      useNativeDriver: true
    }).start();
  };

  const handlePress = useCallback(() => {
    startAnimation();

    if (typeof onPress === 'function') {
      onPress(identifier);
    }
  }, [onPress]);
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => {
      handlePress();
      return true;
    },
    onMoveShouldSetPanResponderCapture: () => false
  });

  const renderHitSlop = () => {
    const newHitSlop = Math.max(hitSlop, 0);

    if (newHitSlop === 0 || newHitSlop === undefined) {
      return null;
    }

    const newRadius = r + newHitSlop;
    return <AnimatedG key="outer" x={x} y={y} r={newRadius} fill="none" stroke="none" strokeWidth={0} onPress={handlePress} // @ts-ignore
    style={{
      transform: [{
        scale
      }]
    }} {...panResponder.panHandlers} />;
  };

  const renderCircle = () => <AnimatedG key="inner" x={x} y={y} r={r} fill={fill} stroke={stroke} strokeWidth={strokeWidth} onPress={handlePress} // @ts-ignore
  style={{
    transform: [{
      scale
    }]
  }} {...panResponder.panHandlers} />;

  return <>
      {renderCircle()}
      {renderHitSlop()}
    </>;
};

const MemoAnimatedCircle = React.memo(AnimatedCircle);
export default MemoAnimatedCircle;

const SvgAnimatedCircle = props => {
  const {
    x = 0,
    y = 0,
    r = 0,
    strokeWidth = 0,
    hitSlop = 10,
    ...reset
  } = props;
  const size = 2 * (ENLARGE_SCALE * r + Math.max(hitSlop, strokeWidth));
  const containerStyle = useMemo(() => ({
    position: 'absolute',
    left: x - size / 2,
    top: y - size / 2,
    width: size,
    height: size,
    borderRadius: size / 2
  }), [x, y, size]);
  return <Svg style={containerStyle}>
      <AnimatedCircle x={size / 2} y={size / 2} r={r} strokeWidth={strokeWidth} hitSlop={hitSlop} {...reset} />
    </Svg>;
};

export { SvgAnimatedCircle };