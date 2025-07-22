// @ts-ignore
import DragGear from 'miot/ui/Gear/DragGear';
import React, { useState } from 'react';
import { Text } from 'react-native';

const App: React.FC<any> = () => {
  const [selectIndex, setSelectIndex] = useState<number>(1);

  return (
    <>
      <Text>// 参数和 NormalGear 一致</Text>
      <DragGear
        options={['off', '1', '2', '3', '4', '5']}
        normalStyle={{ width: 60 }}
        margin={20}
        selectColor={'green'}
        textStyle={{ fontSize: 16, fontFamily: 'DS-Digital' }}
        maxWidth={300}
        selectIndex={selectIndex}
        onSelect={(index: number) => {
          setSelectIndex(index);
          console.log(`select${index}`);
        }}
        containerStyle={{ backgroundColor: '#fff' }}
      />
    </>
  );
};

export default App;
