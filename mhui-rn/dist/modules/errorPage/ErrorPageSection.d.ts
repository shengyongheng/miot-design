import React from 'react';
export interface ErrorPageSectionPropsType {
    title?: string;
    content: string | string[];
    contentItemDelimiter?: string;
    contentItemFormatter?: (item: string, idx: number, content: Array<string> | string) => string;
}
declare const ErrorPageSection: React.FC<ErrorPageSectionPropsType>;
export default ErrorPageSection;
