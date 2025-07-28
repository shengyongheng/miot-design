// @ts-nocheck

/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import MultiButtons from "../multiButtons/MultiButtons";

function NewMultiButtons(props) {
  const [activeIndex, setActiveIndex] = useState(props.activeIndex);
  const {
    items,
    themeColor,
    onClick,
    invisible,
    disabled
  } = props;

  const handleClick = index => {
    setActiveIndex(index);
    onClick(index);
  };

  const init = () => {
    setActiveIndex(props.activeIndex);
  };

  useEffect(() => {
    init();
  }, [props.activeIndex]);

  if (invisible) {
    return <View style={[{
      opacity: invisible ? 0 : 1
    }]}></View>;
  } else {
    return <MultiButtons titleIsTouchable={true} disabled={disabled} hidden={true} items={items} themeColor={themeColor} activeIndex={activeIndex} onClick={handleClick}></MultiButtons>;
  }
}

export default NewMultiButtons; // @native end