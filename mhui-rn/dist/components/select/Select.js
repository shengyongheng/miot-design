import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions, TouchableWithoutFeedback } from 'react-native';
import PopViewComponent from "../dialog/PopViewComponent";
import CommonButton from "../button/CommonButton";
import Option from "./Option";
import Images from "../../resources/Images";
import Styles from "../../resources/Styles";

const Select = props => {
  const {
    initialOptionValue = '',
    initialOptionIndex = 0,
    selectedColor = 'red',
    selectedIcon = Images.common.tick,
    optionWidth = 163,
    optionHeight = 50,
    options,
    onSelectChange,
    children = [],
    rightIcon = Images.common.select,
    ...reset
  } = props;
  const [selectedOption, setSelectedOption] = useState({
    optionValue: initialOptionValue,
    optionIdx: initialOptionIndex
  });
  const recordRef = useRef({
    isMount: true
  });
  const {
    width: windowWidth,
    height: windowHeight
  } = useWindowDimensions();
  useEffect(() => {
    setSelectedOption({
      optionValue: initialOptionValue,
      optionIdx: initialOptionIndex
    });
  }, [initialOptionIndex, initialOptionValue]);
  useEffect(() => {
    const {
      isMount,
      lastOptionIdx
    } = recordRef.current;

    if (typeof onSelectChange === 'function' && !isMount && typeof selectedOption.optionIdx !== 'undefined' && lastOptionIdx !== selectedOption.optionIdx) {
      onSelectChange(selectedOption.optionIdx, selectedOption.optionValue);
    }

    recordRef.current.lastOptionIdx = selectedOption.optionIdx;
  }, [onSelectChange, selectedOption.optionIdx]);
  useEffect(() => {
    recordRef.current.isMount = false;
  }, []);
  const handleChange = useCallback((newOptionIdx, newValue) => {
    setSelectedOption({
      optionIdx: newOptionIdx,
      optionValue: newValue || ''
    });
    PopViewComponent.hide(Select.displayName);
  }, []);

  const handleOpenModal = e => {
    const {
      pageX,
      pageY
    } = e.nativeEvent;
    const offsetLeft = Math.max(Math.min(windowWidth - modalWidth, pageX), 0);
    const offsetTop = Math.max(Math.min(windowHeight - modalHeight, pageY), 0);

    if (newChildren && newChildren.length > 0) {
      PopViewComponent.show(Select.displayName, {
        children: <TouchableWithoutFeedback onPress={handleCloseModal}>
            <View style={styles.modalContainer}>
              <View style={[styles.modal, {
              top: offsetTop,
              left: offsetLeft
            }]}>
                {newChildren}
              </View>
            </View>

          </TouchableWithoutFeedback>
      });
    }
  };

  const handleCloseModal = useCallback(() => {
    PopViewComponent.hide(Select.displayName);
  }, []);

  const createChildrenFromOptions = () => {
    if (Array.isArray(options)) {
      const newOptions = options.map((optionProps, childIdx) => <Option // eslint-disable-next-line react/no-array-index-key
      key={childIdx} {...optionProps} optionIndex={childIdx} optionWidth={optionWidth} optionHeight={optionHeight} color={childIdx === selectedOption.optionIdx ? selectedColor : optionProps.color} icon={childIdx === selectedOption.optionIdx ? selectedIcon : optionProps.icon} onPress={handleChange} />);
      return newOptions;
    }

    return null;
  };

  const createChildrenFromJSX = () => React.Children.map(children, (child, childIdx) => {
    // TODO: 屏幕发生旋转
    modalWidth = Math.max(modalWidth, child.props.optionWidth || 0);
    modalHeight += child.props.optionHeight || optionHeight;
    const childProps = { ...child.props,
      optionIndex: childIdx,
      optionWidth: child.props.optionWidth || optionWidth,
      optionHeight: child.props.optionHeight || optionHeight,
      onPress: handleChange
    };

    if (childIdx === selectedOption.optionIdx) {
      childProps.color = selectedColor;
      childProps.icon = selectedIcon;
    }

    return React.cloneElement(child, childProps);
  });
  /** 弹出层的宽度 */


  let modalWidth = optionWidth;
  /** 弹出层的高度 */

  let modalHeight = Array.isArray(options) && options.length > 0 ? optionHeight * options.length : 0;
  const newChildren = Array.isArray(options) && options.length > 0 ? createChildrenFromOptions() : createChildrenFromJSX();

  const renderOptions = () => <PopViewComponent name={Select.displayName} onDismiss={handleCloseModal} popViewType="modal" />;

  return <View>
      <CommonButton {...reset} rightIcon={rightIcon} title={`${selectedOption.optionValue}`} onPress={handleOpenModal} />
      {renderOptions()}
    </View>;
};

Select.displayName = 'Select';
export default Select;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    borderRadius: 15
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: Styles.dialog.background.backgroundColor
  },
  modal: {
    position: 'absolute',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  }
});