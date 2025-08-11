import { StyleSheet } from 'react-native';

export default (theme) =>
  StyleSheet.create({
    color: {
      color: theme.color,
    },
    backgroundColor: {
      backgroundColor: theme.backgroundColor,
    },
  });
