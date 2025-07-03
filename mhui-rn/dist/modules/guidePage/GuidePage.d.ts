import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConfigContext } from '../../components/configProvider';
export default class GuidePage extends Component {
    static contextType: React.Context<Partial<Pick<import("../../components/configProvider").ConfigContextProps, "language" | "colorScheme" | "environment" | "media"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    context: React.ContextType<typeof ConfigContext>;
    static propTypes: {
        topTitle: PropTypes.Requireable<string>;
        onPress: PropTypes.Requireable<(...args: any[]) => any>;
        goBack: PropTypes.Requireable<(...args: any[]) => any>;
    };
    swiper: any;
    constructor(props: any, context: any);
    ImgArr: {
        en: {
            traditionalPlugin: any;
            standardPlugin: any;
            firstStep: any;
            secondStep: any;
        };
        zh: {
            traditionalPlugin: any;
            standardPlugin: any;
            firstStep: any;
            secondStep: any;
        };
        tc: {
            traditionalPlugin: any;
            standardPlugin: any;
            firstStep: any;
            secondStep: any;
        };
    };
    lang: string;
    returnBackImg: any;
    traditionalPlugin: any;
    standardPlugin: any;
    firstStep: any;
    secondStep: any;
    selectedId: number;
    btnonPress: () => void;
    backonPress: () => void;
    onPress: () => void;
    renderPagination: (index: any, total: any) => JSX.Element;
    optChecked: (id: any) => void;
    renderOption(option: any): JSX.Element;
    renderTitle(): JSX.Element;
    render(): JSX.Element;
}
