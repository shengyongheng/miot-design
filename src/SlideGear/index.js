// @ts-ignore
import { SlideGear } from 'mhui-rn-fixed';
import React, { useState } from 'react';
import { Text } from 'react-native';

const App = () => {
  const [selectIndex, setSelectIndex] = useState(2);
  const [options] = useState(['1', '2', '3']);
  return (
    <>
      <Text style={{}}>{`滑动选择档位(圆形滑块)`}</Text>
      <SlideGear
        options={options}
        value={selectIndex}
        containerStyle={{ width: '100%' }}
        onValueChange={(index) => {
          setSelectIndex(index);
          console.log(index);
        }}
        onSlidingComplete={(index) => {
          setSelectIndex(index);
          console.log(index);
        }}
      />
      {/* @ts-ignore */}
      <Text style={{}}>{`滑动选择档位(方形滑块)`}</Text>
      <SlideGear
        type={SlideGear.TYPE.RECTANGLE}
        options={options}
        showEndText={false}
        containerStyle={{ width: '100%', height: 66 }}
        blockStyle={{ width: 30, backgroundColor: 'red' }}
        minimumTrackTintColor="lightpink"
        maximumTrackTintColor="skyblue"
        value={selectIndex}
        onValueChange={(index) => {
          setSelectIndex(index);
          console.log(index);
        }}
        onSlidingComplete={(index) => {
          setSelectIndex(index);
          console.log(index);
        }}
      />
    </>
  );
};

export default App;
