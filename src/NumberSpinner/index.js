// @ts-ignore
import { NumberSpinner } from 'mhui-rn-fixed';
import React from 'react';

const App = () => {
  return (
    <>
      <NumberSpinner
        style={{ width: 300, height: 200 }}
        maxValue={30}
        minValue={-100}
        interval={2.5}
        defaultValue={80}
        valueFormat={'%.1f'}
        unit={'km'}
        onNumberChanged={(data) => {
          console.log(`newValue:${data.newValue},oldValue:${data.oldValue}`);
        }}
      />
    </>
  );
};

export default App;
