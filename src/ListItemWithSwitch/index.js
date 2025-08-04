// @ts-ignore
import ListItemWithSwitch from 'miot/ui/ListItem/ListItemWithSwitch';
import React from 'react';

const Index = () => {
  return (
    <ListItemWithSwitch
      title="标题测试标题测试标题测试标题测试标题测试标题测试"
      valueText="测试测试测试测试测试测试测试测试测试测试测试"
      subtitle="副标题测试副标题测试副标题测试副标题测试副标题测试副标题测试"
      onPress={(_) => console.log('do what u want to do')}
      onValueChange={(value: boolean) => console.log(value)}
      containerStyle={{ width: '100%', backgroundColor: 'lightblue' }}
      titleStyle={{ fontSize: 17, color: 'red' }}
      subtitleStyle={{ fontSize: 10, color: 'green' }}
      valueTextStyle={{ fontSize: 10, color: 'yellow' }}
      separator={<>/</>}
    />
  );
};

export default Index;
