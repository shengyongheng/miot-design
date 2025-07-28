import React from 'react';
import { StyleSheet, View } from 'react-native';

const ErrorPageFooter = props => {
  const {
    children
  } = props;
  const childrenCount = React.Children.count(children);

  if (childrenCount === 0) {
    return null;
  }

  return <View style={styles.footer}>
      {children}
    </View>;
};

export default ErrorPageFooter;
const styles = StyleSheet.create({
  footer: {
    marginTop: 21,
    marginBottom: 27,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 27,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});