import { PureComponent } from 'react';
import { ListItemWithDatePickerPropsType } from './interface';
interface ListItemWithDatePickerState {
    value?: string;
}
declare class ListItemWithDatePicker extends PureComponent<ListItemWithDatePickerPropsType, ListItemWithDatePickerState> {
    static displayName: string;
    static defaultProps: {
        value: string;
    };
    constructor(props: ListItemWithDatePickerPropsType);
    componentDidUpdate(prevProps: ListItemWithDatePickerPropsType): void;
    handleDatePickerOpen: () => void;
    handleDatePickerSelect: ({ rawString }: {
        rawArray: string[];
        rawString: string;
        data: Date;
    }) => void;
    render(): JSX.Element;
}
export default ListItemWithDatePicker;
