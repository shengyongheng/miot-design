// @ts-ignore
import AbstractDialog from 'miot/ui/Dialog/AbstractDialog';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

const App: React.FC<any> = () => {
  const [visible0] = useState(true);
  const [visible1] = useState(true);

  const onDismiss = (data: string) => {
    console.log(data);
  };

  return (
    <>
      <AbstractDialog
        visible={visible0}
        title={'testTitle'}
        subtitle={'testTitle'}
        showSubtitle
        onDismiss={() => onDismiss('0')}
      />
      <Text>// 自定义内容</Text>
      <AbstractDialog
        visible={visible1}
        title={'testTitle'}
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
