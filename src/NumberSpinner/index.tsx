// @ts-ignore
import NumberSpinner from 'miot/ui/NumberSpinner';
import React from 'react';

interface Data {
  oldValue: number;
  newValue: number;
}

const App: React.FC<any> = () => {
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
        onNumberChanged={(data: Data) => {
          console.log(`newValue:${data.newValue},oldValue:${data.oldValue}`);
        }}
      />
    </>
  );
};

export default App;
