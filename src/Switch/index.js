// @ts-ignore
import Switch from 'miot/ui/Switch';
import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState(false);

  return (
    <Switch
      style={{ width: 20, height: 10 }}
      onTintColor="red"
      tintColor="blue"
      value={value}
      onValueChange={(value) => setValue(value)}
    />
  );
};

export default App;
