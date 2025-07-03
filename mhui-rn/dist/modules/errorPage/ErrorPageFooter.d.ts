import React from 'react';
import { ErrorPageFooterButtonPropsType } from './ErrorPageFooterButton';
export interface ErrorPageFooterPropsType {
    children?: Array<React.ReactElement<ErrorPageFooterButtonPropsType>> | null;
}
declare const ErrorPageFooter: React.FC<ErrorPageFooterPropsType>;
export default ErrorPageFooter;
