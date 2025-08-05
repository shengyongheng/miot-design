// @ts-ignore
import { ChoiceDialog } from 'mhui-rn-fixed';
import React, { useState } from 'react';
import { Button } from 'react-native';

const App = () => {
  const [visible16, setVisible16] = useState(false);
  const [visible17, setVisible17] = useState(false);
  const [selectedIndexArray, setSelectedIndexArray] = useState([]);
  const [selectedIndexArray1, setSelectedIndexArray1] = useState([]);

  const onDismiss = (data) => {
    console.log('data:', data);
    visible16 && setVisible16(false);
    visible17 && setVisible17(false);
  };

  return (
    <>
      <Button
        onPress={() => {
          console.log('基本使用');
          setVisible16(!visible16);
        }}
        title="基本使用"
      />
      <ChoiceDialog
        visible={visible16}
        title={'单选弹窗'}
        options={[
          {
            title: 'Test',
            subtitle: 'test',
          },
          {
            title: 'Test',
          },
          {
            title: '测试',
            subtitle: '测试',
          },
        ]}
        selectedIndexArray={selectedIndexArray}
        onDismiss={(_) => onDismiss('16')}
        onSelect={(result) => setSelectedIndexArray(result)}
      />
      <Button
        onPress={() => {
          console.log('多选弹窗');
          setVisible17(!visible17);
        }}
        title="多选弹窗"
      />
      <ChoiceDialog
        type={ChoiceDialog.TYPE.MULTIPLE}
        visible={visible17}
        title={'多选弹窗'}
        options={[
          {
            title: '🙈',
            subtitle: '🙈',
          },
          {
            title: '🙉',
            subtitle: '🙉',
          },
          {
            title: '🙊',
            subtitle: '🙊',
          },
        ]}
        selectedIndexArray={selectedIndexArray1}
        color="#f0ac3d"
        buttons={[
          {
            text: '保存',
            style: { color: 'lightblue' },
            callback: (result) => {
              console.log(`选中的选项`, result);
              setVisible17(false);
              setSelectedIndexArray1(result);
            },
          },
        ]}
        onDismiss={(_) => onDismiss('17')}
      />
    </>
  );
};

export default App;
