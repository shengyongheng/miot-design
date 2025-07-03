import React from 'react';
import { ErrorPageMainPropsType } from './ErrorPageMain';
import { ErrorPageHeaderPropsType } from './ErrorPageHeader';
import { ErrorPageFooterPropsType } from './ErrorPageFooter';
export interface ErrorPagePropsType {
    children?: Array<React.ReactElement<ErrorPageMainPropsType> | React.ReactElement<ErrorPageHeaderPropsType> | React.ReactElement<ErrorPageFooterPropsType>> | null;
}
declare const ErrorPage: (props: ErrorPagePropsType) => JSX.Element;
export default ErrorPage;
