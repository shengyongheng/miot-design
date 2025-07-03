import { PureComponent } from 'react';
export declare type RadioItemType = {
    id: number;
    value: string | number;
    type: 'week' | 'month' | 'day';
};
export declare type RadioOptionsPropType = Array<RadioItemType>;
export interface RadioGroupWithSeparatorPropType {
    checkedId?: number;
    radioOptions: Array<RadioItemType>;
    onChangeCheck?: (checkedId: number) => void;
    separatorLineColor?: string;
    radioRawTextColor?: string;
    radioCheckedTextColor?: string;
    radioRawBackgroundColor?: string;
    radioCheckedBackgroundColor?: string;
}
interface RadioGroupWithSeparatorState {
    checkedId: number;
}
export default class RadioGroupWithSeparator extends PureComponent<RadioGroupWithSeparatorPropType, RadioGroupWithSeparatorState> {
    static defaultProps: {
        radioOptions: {
            id: number;
            value: string;
        }[];
        separatorLineColor: string;
        radioRawTextColor: string;
        radioCheckedTextColor: string;
        radioRawBackgroundColor: string;
        radioCheckedBackgroundColor: string;
    };
    constructor(props: RadioGroupWithSeparatorPropType);
    componentDidUpdate(prevProps: RadioGroupWithSeparatorPropType): void;
    onChangeCheck: (checkedId: number) => void;
    createRadioGroup: () => JSX.Element[];
    render(): JSX.Element;
}
export {};
