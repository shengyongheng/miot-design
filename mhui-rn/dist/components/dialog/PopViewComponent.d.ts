import React, { PureComponent } from 'react';
import { PopViewComponentPropsType } from './interface';
import MHDatePicker from '../mhDatePicker/MHDatePicker';
import { InputDialog, LoadingDialog, MessageDialog, ChoiceDialog } from './index';
declare type PopViewComponentState = Omit<PopViewComponentPropsType, 'name'>;
declare type componentRefsType = {
    [key: string]: {
        current: PopViewComponent;
        count: number;
        ids: Map<number, number>;
    };
};
export declare const componentRefs: componentRefsType;
export declare const DialogDict: {
    date: typeof MHDatePicker;
    input: typeof InputDialog;
    message: typeof MessageDialog;
    loading: typeof LoadingDialog;
    choice: typeof ChoiceDialog;
    modal: React.FC<import("./ModalDialog").ModalDialogPropsType>;
};
export default class PopViewComponent extends PureComponent<PopViewComponentPropsType, PopViewComponentState> {
    static show: (name: string, config?: PopViewComponentState) => void;
    static hide: (name: string) => void;
    static update: (name: string, config: PopViewComponentState) => void;
    static has: (name: string) => boolean;
    static get: (name: string) => PopViewComponent | undefined;
    static getFirstId: (name: string) => number | undefined;
    id: number;
    constructor(props: PopViewComponentPropsType);
    componentDidMount(): void;
    componentDidUpdate(prevProps: PopViewComponentPropsType): void;
    componentWillUnmount(): void;
    show: () => void;
    hide: (callback?: ((...args: any[]) => void) | undefined) => void;
    update: (config: Pick<PopViewComponentPropsType, "visible" | "title" | "children" | "accessible" | "animationType" | "backgroundColor" | "onDismiss" | "subtitle" | "showTitle" | "showSubtitle" | "canDismiss" | "showButton" | "dialogStyle" | "onModalHide" | "onModalShow" | "useNewTheme" | "popViewType" | "onSelect" | "onOk" | "okText" | "onCancel" | "cancelText">) => void;
    handleOk: (...args: any[]) => void;
    handleCancel: (...args: any[]) => void;
    handleSelect: (...args: any[]) => void;
    handleRequestClose: () => void;
    render(): JSX.Element | null;
}
export {};
