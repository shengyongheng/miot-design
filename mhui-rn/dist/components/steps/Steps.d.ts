import React from 'react';
import { StepStatusType } from './Step';
export interface StepsPropsType {
    current?: 0;
    status?: StepStatusType;
    disabled?: boolean;
    separatorBackgroundColor?: string;
    onChangeCurrent?: (newCurrent: number) => void;
    children: Array<React.ReactElement<StepsPropsType>> | React.ReactElement<StepsPropsType>;
}
declare const Steps: React.FC<StepsPropsType>;
export default Steps;
