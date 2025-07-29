// @ts-ignore
import Switch from 'miot/ui/Switch';
import React, { useState } from 'react';

const App: React.FC<any> = () => {
  const [value, setValue] = useState(false);

  return (
    <Switch
      style={{ width: 20, height: 10 }}
      onTintColor="red"
      tintColor="blue"
      value={value}
      onValueChange={(value: boolean) => setValue(value)}
    />
  );
};

export default App;
