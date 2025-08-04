// @ts-ignore
import InputDialog from 'miot/ui/Dialog/InputDialog';
import React, { useState } from 'react';
import { Button } from 'react-native';

const App = () => {
  const [visible8, setVisible8] = useState(false);
  const [visible9, setVisible9] = useState(false);
  const [visible10, setVisible10] = useState(false);
  const [visible11, setVisible11] = useState(false);

  const onDismiss = (data) => {
    console.log('data:', data);
    visible8 && setVisible8(false);
    visible9 && setVisible9(false);
    visible10 && setVisible10(false);
    visible11 && setVisible11(false);
  };

  return (
    <>
      <Button
        onPress={() => {
          console.log('基本使用');
          setVisible8(!visible8);
        }}
        title="基本使用"
      />
      <InputDialog
        visible={visible8}
        title="最简单输入弹窗"
        onDismiss={(_) => onDismiss('8')}
      />
      <Button
        onPress={() => {
          console.log('带下划线输入弹窗');
          setVisible9(!visible9);
        }}
        title="带下划线输入弹窗"
      />
      <InputDialog
        type={InputDialog.TYPE.UNDERLINE}
        visible={visible9}
        title="带下划线输入弹窗"
        underlineData={{
          leftText: '请输入你的ID',
          underlineText: '还没有ID？注册一个',
          onPress: (_) => console.log('你注册的ID是123456'),
        }}
        buttons={[
          {
            text: '取消',
            style: { color: 'lightpink' },
            callback: (_) => setVisible9(false),
          },
          {
            text: '保存',
            style: { color: 'lightblue' },
            callback: (result) => {
              console.log(`结果`, result);
              setVisible9(false);
            },
          },
        ]}
        onDismiss={(_) => onDismiss('9')}
      />
      <Button
        onPress={() => {
          console.log('带☑️输入弹窗');
          setVisible10(!visible10);
        }}
        title="带☑️输入弹窗"
      />
      <InputDialog
        type={InputDialog.TYPE.CHECKBOX}
        visible={visible10}
        title="带☑️输入弹窗"
        checkboxData={{
          checked: true,
          text: '记住密码',
        }}
        buttons={[
          {
            text: '取消',
            style: { color: 'lightpink' },
            callback: (_) => setVisible10(false),
          },
          {
            text: '保存',
            style: { color: 'lightblue' },
            callback: (result) => {
              console.log(`结果`, result);
              setVisible10(false);
            },
          },
        ]}
        onDismiss={(_) => onDismiss('10')}
      />
      <Button
        onPress={() => {
          console.log('多TextInput复杂输入弹窗');
          setVisible11(!visible11);
        }}
        title="多TextInput复杂输入弹窗"
      />
      <InputDialog
        visible={visible11}
        type={InputDialog.TYPE.BOTH}
        color="#f0ac3d"
        title="多TextInput复杂输入弹窗"
        underlineData={{
          leftText: '请输入你的ID',
          underlineText: '还没有ID？注册一个',
          onPress: (_) => console.log('你注册的ID是123456'),
        }}
        buttons={[
          {
            text: '取消',
            style: { color: 'lightpink' },
            callback: (_) => setVisible11(false),
          },
          {
            text: '保存',
            style: { color: 'lightblue' },
            callback: (result) => {
              console.log(`结果`, result);
              setVisible11(false);
            },
          },
        ]}
        onDismiss={(_) => onDismiss('11')}
      />
    </>
  );
};

export default App;
