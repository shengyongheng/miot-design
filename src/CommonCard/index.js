import React from 'react';
import { WithTheme } from '../style/index';
import CommonCardStyles from './style';

const CommonCard = (props) => {
  return (
    <WithTheme styles={props.styles} themeStyles={CommonCardStyles}>
      {(styles) => {
        return <>CommonCard</>;
      }}
    </WithTheme>
  );
};

export default CommonCard;
