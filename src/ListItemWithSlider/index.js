// @ts-ignore
import ListItemWithSlider from 'miot/ui/ListItem/ListItemWithSlider';
import React from 'react';

const App = () => {
  return (
    <ListItemWithSlider
      title="自定义样式的滑动条列表项自定义样式的滑动条列表项"
      sliderProps={{ minimumValue: 25, maximumValue: 75, value: 60 }}
      sliderStyle={{
        minimumTrackTintColor: 'red',
        maximumTrackTintColor: '#fff',
        style: { width: '100%', alignSelf: 'center' },
        trackStyle: { height: 4, borderRadius: 2 },
        thumbStyle: { width: 30, height: 30, borderRadius: 15 },
      }}
      containerStyle={{ width: '100%', backgroundColor: 'lightblue' }}
      titleStyle={{ fontSize: 17, color: 'red' }}
      valueStyle={{ fontSize: 10, color: 'yellow' }}
      showWithPercent={false}
      unit={'cal'}
      onValueChange={(value) => console.log(value)}
      onSlidingComplete={(value) => console.log(value)}
      separator={<>/</>}
    />
  );
};

export default App;
