import React, { Fragment } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

const ErrorPageMain = props => {
  const {
    children
  } = props;
  const childrenCount = React.Children.count(children);
  const sections = React.Children.map(children, (section, idx) => // eslint-disable-next-line react/no-array-index-key
  <Fragment key={idx}>
      {section}
      {idx !== childrenCount - 1 && <View style={styles.blankSpace} />}
    </Fragment>);
  return <ScrollView alwaysBounceVertical={false} scrollEventThrottle={16}>
      <View style={styles.content}>
        {sections}
      </View>
    </ScrollView>;
};

export default ErrorPageMain;
const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  blankSpace: {
    height: 29
  }
});