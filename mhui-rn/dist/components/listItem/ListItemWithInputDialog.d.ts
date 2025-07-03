import { PureComponent } from 'react';
import { ListItemWithInputDialogPropsType } from './interface';
interface ListItemWithInputDialogState {
    value?: string;
}
declare class ListItemWithInputDialog extends PureComponent<ListItemWithInputDialogPropsType, ListItemWithInputDialogState> {
    static displayName: string;
    static defaultProps: {
        value: string;
    };
    constructor(props: ListItemWithInputDialogPropsType);
    componentDidUpdate(prevProps: ListItemWithInputDialogPropsType): void;
    handleOpenDialog: () => void;
    handleCloseDialog: (result?: {
        textInputArray: string[];
    } | undefined) => void;
    render(): JSX.Element;
}
export default ListItemWithInputDialog;
