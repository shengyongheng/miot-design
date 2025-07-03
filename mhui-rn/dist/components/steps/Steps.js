import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const Steps = props => {
  const {
    children,
    current: initialCurrent = 0,
    disabled = false,
    status = 'process',
    separatorBackgroundColor = '#696969',
    onChangeCurrent
  } = props;
  const [current, setCurrent] = useState(initialCurrent);
  const isFirst = useRef(true);
  useEffect(() => {
    setCurrent(initialCurrent);
  }, [initialCurrent]);
  useEffect(() => {
    if (!isFirst.current && typeof onChangeCurrent === 'function') {
      onChangeCurrent(current);
    }

    isFirst.current = false;
  }, [current]);
  const handleChangeCurrent = useCallback(newCurrent => {
    setCurrent(newCurrent);
  }, []);
  const separatorStyle = useMemo(() => ({ ...styles.separator,
    backgroundColor: separatorBackgroundColor
  }), [separatorBackgroundColor]);
  const newChildren = React.Children.map(children, (child, childIndex) => {
    const childProps = { ...child.props,
      stepIndex: childIndex,
      disabled: disabled || child.props.disabled,
      onStepPress: handleChangeCurrent
    };

    if (!child.props.status) {
      if (childIndex === current) {
        childProps.status = status;
      } else if (childIndex < current) {
        childProps.status = 'finish';
      } else {
        childProps.status = 'wait';
      }
    }

    const newChild = React.cloneElement(child, childProps);
    return <>
        {newChild}
        {childIndex !== React.Children.count(children) - 1 && <View style={separatorStyle} />}
      </>;
  });
  return <View style={styles.container}>
      {newChildren}
    </View>;
};

export default Steps;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7
  },
  separator: {
    width: 1,
    flex: 1,
    opacity: 0.15,
    backgroundColor: '#696969'
  }
});