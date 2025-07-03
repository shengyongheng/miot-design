import React from 'react';
import { ImageSourcePropType } from 'react-native';
export interface ErrorPageHeaderPropsType {
    icon?: ImageSourcePropType;
    title?: React.ReactText;
    subtitle?: React.ReactText;
}
declare const ErrorPageHeader: React.FC<ErrorPageHeaderPropsType>;
export default ErrorPageHeader;
