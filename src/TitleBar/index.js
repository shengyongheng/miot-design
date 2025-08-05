// @ts-ignore
import { TitleBar } from 'mhui-rn-fixed';
import React from 'react';

const Index = () => {
  return (
    <TitleBar
      type="light"
      title="title"
      subTitle="subtitle"
      style={{
        height: 65,
        backgroundColor: '#222',
      }}
      onPressLeft={() => {
        // navigation.goBack();
      }}
      onPressLeft2={() => console.log('onPressLeft2')}
      onPressRight={() => {
        // navigation.navigate('moreMenu', { title: '设置' });
      }}
      onPressRight2={() => console.log('onPressRight2')}
      showDot={true}
    />
  );
};

export default Index;
