// @ts-ignore
import StringSpinner from 'miot/ui/StringSpinner';
import React from 'react';

const App = () => {
  return (
    <>
      <StringSpinner
        style={{
          width: 300,
          height: 300,
          backgroundColor: '#ffffff',
        }}
        dataSource={['a', 'b', 'c', 'd']}
        defaultValue={'c'}
        pickerInnerStyle={{
          lineColor: '#cc0000',
          textColor: '#ff0000',
          selectTextColor: '#0000FF',
          fontSize: 12,
          selectFontSize: 30,
          rowHeight: 70,
          selectBgColor: '#f5f5f5',
        }}
        onValueChanged={(data) => {
          // this.updateOneValue(data);
          console.log(data);
        }}
      />
    </>
  );
};

export default App;
