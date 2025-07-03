import React, { PureComponent } from 'react';
import MHDatePicker from "../mhDatePicker/MHDatePicker";
import ListItem from "./ListItem";
import PopViewComponent from "../dialog/PopViewComponent";

/**
 * 带时间选择器的ListItem
 * 由于移动设备较小，需要更大的空间来展示DatePicker和选择日期
 */
class ListItemWithDatePicker extends PureComponent {
  static displayName = 'ListItemWithDatePicker';
  static defaultProps = {
    value: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        value: this.props.value
      });
    }
  }

  handleDatePickerOpen = () => {
    const {
      onPress,
      dateType = MHDatePicker.TYPE.TIME12,
      dialogTitle
    } = this.props;

    if (typeof onPress === 'function') {
      onPress();
    } // PopViewComponent.show(ListItemWithDatePicker.displayName);


    const popViewType = 'date';
    const config = {
      popViewType,
      title: dialogTitle,
      type: dateType,
      onSelect: this.handleDatePickerSelect
    };
    PopViewComponent.show(ListItemWithDatePicker.displayName, config);
  };
  handleDatePickerSelect = ({
    rawString
  }) => {
    const {
      onChange
    } = this.props;
    this.setState({
      value: rawString
    }, () => {
      if (typeof onChange === 'function') {
        onChange(rawString);
      }
    });
  };

  render() {
    const {
      dateType = MHDatePicker.TYPE.TIME12,
      dialogTitle,
      ...reset
    } = this.props;
    const {
      value
    } = this.state;
    return <>
        <ListItem {...reset} onPress={this.handleDatePickerOpen} value={value} />
        <PopViewComponent name={ListItemWithDatePicker.displayName} popViewType="date" title={dialogTitle} // @ts-ignore
      type={dateType} onSelect={this.handleDatePickerSelect} />
      </>;
  }

}

export default ListItemWithDatePicker;