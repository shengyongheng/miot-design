import React, { PureComponent } from 'react';
import MHDatePicker from "../mhDatePicker/MHDatePicker";
import { InputDialog, LoadingDialog, MessageDialog, ChoiceDialog, ModalDialog } from "./index";
export const componentRefs = {};
export const DialogDict = {
  date: MHDatePicker,
  input: InputDialog,
  message: MessageDialog,
  loading: LoadingDialog,
  choice: ChoiceDialog,
  modal: ModalDialog
};
export default class PopViewComponent extends PureComponent {
  constructor(props) {
    super(props);
    const {
      name,
      popViewType = 'input',
      ...reset
    } = props;
    this.state = {
      popViewType,
      ...reset
    };
    this.id = 0;
  }

  componentDidMount() {
    const {
      name
    } = this.props;

    if (PopViewComponent.has(name)) {
      const {
        count
      } = componentRefs[name];
      this.id = count + 1;
      componentRefs[name].count = count + 1;
      componentRefs[name].ids.set(count + 1, 1);
    } else {
      componentRefs[name] = {
        current: this,
        count: 1,
        ids: new Map([[1, 1]])
      };
      this.id = 1;
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        visible: this.props.visible
      });
    }
  }

  componentWillUnmount() {
    // 当对话框销毁时，当前name对应的对话框数量减1，当数量为0时，移除name
    const {
      name
    } = this.props;
    const {
      ids
    } = componentRefs[name];
    ids.delete(this.id);

    if (ids.size === 0) {
      delete componentRefs[name];
    }
  }

  show = () => {
    this.setState({
      visible: true
    });
  };
  hide = callback => {
    const {
      onModalHide
    } = this.state;
    this.setState({
      visible: false
    }, () => {
      if (typeof callback === 'function') {
        callback();
      }

      if (typeof onModalHide === 'function') {
        onModalHide();
      }
    });
  };
  /** 更新PopView */

  update = config => {
    this.setState(config);
  };
  /** 处理确认事件回调 */

  handleOk = (...args) => {
    const {
      onOk
    } = this.state;
    this.hide(() => {
      if (typeof onOk === 'function') {
        onOk(...args);
      }
    });
  };
  /** 处理取消事件回调 */

  handleCancel = (...args) => {
    const {
      onCancel
    } = this.state;
    this.hide(() => {
      if (typeof onCancel === 'function') {
        onCancel(...args);
      }
    });
  };
  /** 处理日期等选择事件 */

  handleSelect = (...args) => {
    const {
      onSelect
    } = this.state;
    this.hide(() => {
      if (typeof onSelect === 'function') {
        onSelect(...args);
      }
    });
  };
  handleRequestClose = () => {
    this.hide();
  };

  render() {
    const {
      name
    } = this.props; // 相同名字都会复用一个组件

    if (PopViewComponent.has(name) && this.id !== PopViewComponent.getFirstId(name)) {
      return null;
    }

    const {
      visible,
      popViewType = 'input',
      children,
      cancelText,
      okText,
      // onOk,
      // onCancel,
      ...rest
    } = this.state;

    if (!visible) {
      return null;
    }

    if (popViewType === 'date') {
      return (// @ts-ignore
        <MHDatePicker {...rest} onSelect={this.handleSelect} visible={visible} />
      );
    }

    if (popViewType === 'modal') {
      return <ModalDialog {...rest} onRequestClose={this.handleRequestClose} visible={visible}>
          {children}
        </ModalDialog>;
    }

    const TargetComponent = DialogDict[popViewType];
    const buttons = [{
      text: cancelText,
      callback: this.handleCancel
    }, {
      text: okText,
      callback: this.handleOk
    }];
    return <TargetComponent {...rest} onSelect={this.handleSelect} visible={visible} buttons={buttons}>
        {children}
      </TargetComponent>;
  }

}
/** 打开对应name的对话框，可以附带其他属性 */

PopViewComponent.show = (name, config) => {
  componentRefs[name] && componentRefs[name].current.update({ ...config,
    visible: true
  });
};
/** 隐藏指定name的对话框 */


PopViewComponent.hide = name => {
  componentRefs[name] && componentRefs[name].current.hide();
};
/** 更新指定name的对话框 */


PopViewComponent.update = (name, config) => {
  componentRefs[name] && componentRefs[name].current.update(config);
};
/** 检查所有对话框里是否含有name对话框 */


PopViewComponent.has = name => Object.prototype.hasOwnProperty.call(componentRefs, name);
/** 获取name对话框 */


PopViewComponent.get = name => componentRefs[name]?.current;
/** 获取name对应的对话框中第一个组件id */


PopViewComponent.getFirstId = name => {
  if (componentRefs[name]) {
    const {
      ids
    } = componentRefs[name];
    const [firstId] = ids.entries().next().value;
    return firstId;
  }

  return undefined;
};