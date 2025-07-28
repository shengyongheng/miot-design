import React from 'react';
import ChoiceItem from "./ChoiceItem";
import ListItem from "./ListItem";
import ListItemWithSwitch from "./ListItemWithSwitch";
import ListItemWithDatePicker from "./ListItemWithDatePicker";
import ListItemWithInputDialog from "./ListItemWithInputDialog";

const createListItem = type => {
  const ListItemDict = {
    checkbox: ChoiceItem,
    button: ListItem,
    switch: ListItemWithSwitch,
    // ListItemWithSlider,
    text: ListItemWithInputDialog,
    date: ListItemWithDatePicker
  };
  return ListItemDict[type];
};

class InputListItem extends React.PureComponent {
  render() {
    const {
      type = 'button',
      choiceType = 'stateless',
      value,
      onPress,
      onChange,
      ...reset
    } = this.props;
    const TargetComponent = createListItem(type);

    if (type === 'switch') {
      // ListItemWithSwitch本身没有onChange属性，但是有与之相同的onValueChange属性
      return (// @ts-ignore ListItemWithSwitch中value属性为boolean|undefined类型
        <TargetComponent {...reset} value={value} onPress={onPress} onValueChange={onChange} />
      );
    }

    if (type === 'checkbox') {
      // 对于ChoiceItem而言，本身是没有onChange事件的，onPress的同时就是onChange
      const handlePress = newValue => {
        if (typeof onPress === 'function') {
          onPress();
        }

        if (typeof onChange === 'function') {
          onChange(newValue);
        }
      };

      return <TargetComponent {...reset} type={choiceType} selected={value} onPress={handlePress} />;
    }

    return <TargetComponent {...reset} value={value} onPress={onPress} onChange={onChange} />;
  }

}

export default InputListItem;