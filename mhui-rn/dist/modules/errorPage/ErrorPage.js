import React from 'react';
import { StyleSheet, View } from 'react-native';

const ErrorPage = props => {
  const {
    children
  } = props;
  return <View style={styles.container}>
      {children}
    </View>;
};

export default ErrorPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  content: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  footer: {
    marginTop: 21,
    marginBottom: 27,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 27,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  blankSpace: {
    height: 29
  }
});