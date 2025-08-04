import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Card from 'miot/ui/Card/Card';

const Index = () => {
  const [, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const ICON_SIZE = 16;
  // 插件开发者可以自定义内部视图
  const getInnerView = () => {
    return (
      <View style={styles.innerContainer}>
        <Image
          style={styles.innerIcon}
          source={require('../../public/assets/Mijia_icon.png')}
          resizeMode="contain"
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.innerTitle} numberOfLines={1}>
            {'自定义innerView的标题'}
          </Text>
          <Text style={styles.innersubTitle} numberOfLines={1}>
            {'自定义innerView的副标题'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <Text>自定义样式的卡片</Text>
      <Card
        icon={require('../../public/assets/Mijia_icon.png')}
        text="自定义卡片"
        visible={visible3}
        dismiss={(_) => setVisible3(false)}
        showDismiss
        onPress={(_) => setVisible2(false)}
        cardStyle={{
          width: 750 / 2,
          height: 75,
          borderRadius: 12,
          backgroundColor: 'pink',
        }}
        iconStyle={{ width: ICON_SIZE, height: ICON_SIZE }}
        textStyle={{ fontSize: 10, color: 'red' }}
      />
      <Text>自定义内部视图的卡片</Text>
      <Card
        innerView={getInnerView()}
        visible={visible4}
        dismiss={(_) => setVisible4(false)}
        showShadow={false}
        showDismiss
        onPress={(_) => setVisible3(false)}
        cardStyle={{ width: 222, height: 80 }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  innerContainer: {},
  innerIcon: {},
  innerTitle: {},
  innersubTitle: {},
});

export default Index;
