// @ts-ignore
import PinCodeDialog from 'miot/ui/Dialog/PinCodeDialog';
import React, { useState } from 'react';
import { Button } from 'react-native';

const App: React.FC<any> = () => {
  const [visible12, setVisible12] = useState(false);
  const [checkboxData] = useState({
    text: '记住密码',
  });

  const onDismiss = (data: string) => {
    console.log('data:', data);
    visible12 && setVisible12(false);
  };

  return (
    <>
      <Button
        onPress={() => {
          console.log('基本使用');
          setVisible12(!visible12);
        }}
        title="基本使用"
      />
      <PinCodeDialog
        visible={visible12}
        title="密码/验证码弹窗"
        message={'密码/验证码弹窗'}
        checkboxData={checkboxData}
        digit={6}
        color="#f0ac3d"
        buttons={[
          {
            text: '取消',
            style: { color: 'lightblue' },
            callback: (result: any) => {
              console.log(`结果`, result);
              setVisible12(false);
            },
          },
          {
            text: '确定',
            style: { color: 'lightblue' },
            callback: (result: any) => {
              console.log(`结果`, result);
              setVisible12(false);
            },
          },
        ]}
        onDismiss={(_: any) => onDismiss('12')}
      />
    </>
  );
};

export default App;
