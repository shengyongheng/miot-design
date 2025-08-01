// @ts-ignore
import NormalGear from 'miot/ui/Gear/NormalGear';
import React, { useState } from 'react';

const App: React.FC<any> = () => {
  const [selectIndex] = useState<number>(1);

  return (
    <>
      <NormalGear
        options={['off', '1', '2', '3', '4', '5']}
        normalStyle={{ width: 60 }}
        margin={20}
        selectColor={'green'}
        textStyle={{ fontSize: 16, fontFamily: 'DS-Digital' }}
        maxWidth={300}
        selectIndex={selectIndex}
        onSelect={(index: number) => console.log(`select${index}`)}
        containerStyle={{ backgroundColor: '#fff' }}
      />
    </>
  );
};

export default App;
