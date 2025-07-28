// @ts-ignore
import Switch from 'miot/ui/Switch';
import React from 'react';

const Index: React.FC<any> = () => {
  return (
    <Switch
      style={{ width: 20, height: 10 }}
      onTintColor="red"
      tintColor="blue"
      value={true}
      disabled={false}
    />
  );
};

export default Index;
