import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { adjustSize } from "../../utils/sizes";

function MiLogo(props) {
  const {
    icon
  } = props;
  return <View style={styles.container}>
      <Image style={styles.image} source={icon} accessible={false} />
    </View>;
}

export default MiLogo;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: adjustSize(130)
  },
  image: {}
});