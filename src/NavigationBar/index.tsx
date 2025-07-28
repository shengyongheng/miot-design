import React from 'react';
// @ts-ignore
import ListItem from 'miot/ui/ListItem/ListItem';
// @ts-ignore
const Index: React.FC<any> = () => {
  return (
    <ListItem
      title="自定义样式"
      subtitle="这是用来测试副标题的文案，尽量写长一点争取可以换行。"
      value="这是一段测试右侧文案"
      hideArrow={false}
      showDot={false}
      containerStyle={{ width: '100%', backgroundColor: 'lightblue' }}
      titleStyle={{ fontSize: 17, color: 'red' }}
      subtitleStyle={{ fontSize: 10, color: 'green' }}
      valueStyle={{ fontSize: 10, color: 'yellow' }}
      onPress={(_: any) => console.log(4)}
      separator={<>/</>}
    />
  );
};

export default Index;
