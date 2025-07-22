// @ts-ignore
import SlideGear from 'miot/ui/Gear/SlideGear';
import React, { useState } from 'react';
import { Text } from 'react-native';

const App: React.FC<any> = () => {
  const [selectIndex, setSelectIndex] = useState<number>(2);
  const [options] = useState(['1', '2', '3']);
  return (
    <>
      <Text style={{}}>{`滑动选择档位(圆形滑块)`}</Text>
      <SlideGear
        options={options}
        value={selectIndex}
        containerStyle={{ width: '100%' }}
        onValueChange={(index: number) => {
          setSelectIndex(index);
          console.log(index);
        }}
        onSlidingComplete={(index: number) => {
          setSelectIndex(index);
          console.log(index);
        }}
      />
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
        onValueChange={(index: number) => {
          setSelectIndex(index);
          console.log(index);
        }}
        onSlidingComplete={(index: number) => {
          setSelectIndex(index);
          console.log(index);
        }}
      />
    </>
  );
};

export default App;
