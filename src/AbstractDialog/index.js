// @ts-ignore
import { AbstractDialog } from 'mhui-rn-fixed';
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

const App = () => {
  const [visible0, setVisible0] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const onDismiss = (data) => {
    console.log('data:', data);
    visible0 && setVisible0(false);
    visible1 && setVisible1(false);
  };

  return (
    <>
      <Button
        onPress={() => {
          console.log('基本使用');
          setVisible0(!visible0);
        }}
        title="基本使用"
        color="#841584"
      />
      <AbstractDialog
        visible={visible0}
        title={'基本使用'}
        subtitle={'testTitle'}
        showSubtitle
        onDismiss={() => onDismiss('0')}
      />
      <Button
        onPress={() => {
          console.log('自定义内容');
          setVisible1(!visible1);
        }}
        title="自定义内容"
        color="#841584"
      />
      <AbstractDialog
        visible={visible1}
        title={'自定义内容'}
        subtitle={'testTitle'}
        showSubtitle
        onDismiss={() => onDismiss('1')}
        buttons={[
          {
            text: '是吗',
            style: { color: 'lightpink' },
            callback: () => console.log('是吗'),
          },
          {
            text: '是啊',
            style: { color: '#f0ac3d' },
            callback: () => console.log('是啊'),
          },
        ]}
      >
        <View
          style={{
            flex: 1,
            height: 200,
            backgroundColor: 'lightblue',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>你看她笑得多开心啊</Text>
        </View>
      </AbstractDialog>
    </>
  );
};

export default App;
