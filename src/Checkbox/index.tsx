import React, { useState } from 'react';
import { Text } from 'react-native';
// @ts-ignore
import Checkbox from 'miot/ui/Checkbox';

const Index: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const [disabled] = useState(false);
  return (
    <>
      <Text>方形</Text>
      <Checkbox
        checked={checked}
        checkedColor="lightgreen"
        onValueChange={(checked: boolean) => setChecked(checked)}
      />
      <Text>圆形</Text>
      <Checkbox
        style={{ borderRadius: 30 }}
        checked={checked}
        checkedColor="lightgreen"
        onValueChange={(checked: boolean) => setChecked(checked)}
      />
      <Text>禁用</Text>
      <Checkbox
        style={{ borderRadius: 30 }}
        disabled={disabled}
        checked={checked}
        checkedColor="lightgreen"
        onValueChange={(checked: boolean) => setChecked(checked)}
      />
    </>
  );
};

export default Index;
