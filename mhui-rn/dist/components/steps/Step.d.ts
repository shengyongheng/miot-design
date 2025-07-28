import React from 'react';
export declare type StepStatusType = 'wait' | 'process' | 'finish';
export interface StepPropsType {
    stepIndex: number;
    disabled?: boolean;
    status?: StepStatusType;
    title?: string;
    iconBackgroundColor?: string;
    titleColor?: string;
    onStepPress?: (newCurrent: number) => void;
}
declare const Step: React.FC<StepPropsType>;
export default Step;
