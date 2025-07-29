// @ts-ignore
import BlankPage from 'miot/ui/BlankPage';
import React from 'react';

const App = () => {
  const props1 = {
    // type: BlankPage.TYPE.BUTTON, // 默认是按钮
    button: {
      text: '无列表时点击此按钮',
      callback: () => console.log('点击按钮'),
    },
    message: '你还没创建一条数据...',
    desc: '点击按钮查看创建方法',
    extraInfo: 'ABCabc123测试',
  };
  const props2 = {
    type: BlankPage.TYPE.UNDERLINE,
    underline: {
      text: '无列表时点击此链接',
      callback: () => console.log('点击超链接'),
    },
    message: '你还没创建一条数据...',
    desc: '点击按钮查看创建方法',
    extraInfo: 'ABCabc123测试',
  };
  return (
    <>
      <BlankPage {...props1} />
      <BlankPage {...props2} />
    </>
  );
};

export default App;
