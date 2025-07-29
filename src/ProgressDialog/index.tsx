// @ts-ignore
import ProgressDialog from 'miot/ui/Dialog/ProgressDialog';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-native';

const App: React.FC<any> = () => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const timer = useRef<NodeJS.Timeout>();

  timer.current = setInterval(() => {
    visible && progress < 1 && setProgress(progress + 0.1);
  }, 2000);

  useEffect(() => {
    console.log('progress:', progress);
    if (progress >= 1) {
      clearInterval(timer.current!);
      setProgress(0);
      visible && setVisible(false);
    }
  }, [progress, visible]);

  const onDismiss = (data: '3') => {
    console.log('data:', data);
    // visible && setVisible(false);
  };

  return (
    <>
      <Button
        onPress={() => {
          console.log('基本使用');
          setVisible(!visible);
        }}
        title="基本使用"
      />
      <ProgressDialog
        visible={visible}
        message="下载中，请稍后..."
        color="#f0ac3d"
        unfilledColor="#fff"
        textColor="blue"
        progress={progress}
        onDismiss={(_: any) => onDismiss('3')}
      />
    </>
  );
};

export default App;
