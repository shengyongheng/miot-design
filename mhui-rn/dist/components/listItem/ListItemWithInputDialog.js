import React, { PureComponent } from 'react';
import ListItem from "./ListItem";
import PopViewComponent from "../dialog/PopViewComponent";

/**
 * 带输入框的ListItem
 * 想要在移动设备上输入文本，需要考虑弹出键盘，调用InputDialog也是有需求的
 */
class ListItemWithInputDialog extends PureComponent {
  static displayName = 'ListItemWithInputDialog';
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

  handleOpenDialog = () => {
    const {
      dialogTitle
    } = this.props;
    const popViewType = 'input';
    const config = {
      popViewType,
      title: dialogTitle,
      onOk: this.handleCloseDialog
    };
    PopViewComponent.show(ListItemWithInputDialog.displayName, config);
  };
  handleCloseDialog = result => {
    let newValue = '';

    if (result && result.textInputArray) {
      const {
        textInputArray
      } = result;
      newValue = textInputArray[0] || '';
    }

    this.setState({
      value: newValue
    }, () => {
      const {
        onChange
      } = this.props;

      if (typeof onChange === 'function') {
        onChange(newValue);
      }
    });
  };

  render() {
    const {
      dialogTitle,
      ...reset
    } = this.props;
    const {
      value
    } = this.state;
    return <>
        <ListItem {...reset} onPress={this.handleOpenDialog} value={value} />
        <PopViewComponent name={ListItemWithInputDialog.displayName} popViewType="input" title={dialogTitle} onOk={this.handleCloseDialog} />
      </>;
  }

}

export default ListItemWithInputDialog;