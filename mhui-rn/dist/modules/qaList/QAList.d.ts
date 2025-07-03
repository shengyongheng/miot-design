import { Component } from 'react';
import PropTypes from 'prop-types';
export default class QAList extends Component {
    static propTypes: {
        list: PropTypes.Requireable<(PropTypes.InferProps<{
            title: PropTypes.Requireable<string>;
            text: PropTypes.Requireable<string>;
            textAccessibilityLabel: PropTypes.Requireable<string | number>;
            titleAccessibilityLabel: PropTypes.Requireable<string | number>;
        }> | null | undefined)[]>;
        accessible: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        list: never[];
    };
    getList(): any;
    render(): JSX.Element | null;
}
