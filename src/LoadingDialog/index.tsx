// @ts-ignore
import LoadingDialog from 'miot/ui/Dialog/LoadingDialog';
import React, { useState } from 'react';
import { Button } from 'react-native';

const App: React.FC<any> = () => {
  const [visible0, setVisible0] = useState(false);

  const onDismiss = (data: '2') => {
    console.log('data:', data);
    visible0 && setVisible0(false);
  };

  return (
    <>
      <Button
        onPress={() => {
          console.log('基本使用');
          setVisible0(!visible0);
        }}
        title="基本使用"
      />
      <LoadingDialog
        visible={visible0}
        message="加载中，请稍后...(字体大小随系统字体大小变化而变化)"
        timeout={3000}
        onDismiss={(_: any) => onDismiss('2')}
      />
    </>
  );
};

export default App;
