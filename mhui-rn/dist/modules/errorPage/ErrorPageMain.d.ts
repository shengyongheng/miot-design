import React from 'react';
import { ErrorPageSectionPropsType } from './ErrorPageSection';
export interface ErrorPageMainPropsType {
    children?: Array<React.ReactElement<ErrorPageSectionPropsType>> | null;
}
declare const ErrorPageMain: React.FC<ErrorPageMainPropsType>;
export default ErrorPageMain;
