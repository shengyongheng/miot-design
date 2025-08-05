import React, { useState } from 'react';
import { Text } from 'react-native';
import { Checkbox } from 'mhui-rn-fixed';

const Index = () => {
  const [checked, setChecked] = useState(false);
  const [disabled] = useState(false);
  return (
    <>
      <Text>方形</Text>
      <Checkbox
        checked={checked}
        checkedColor="lightgreen"
        onValueChange={(checked) => setChecked(checked)}
      />
      <Text>圆形</Text>
      <Checkbox
        style={{ borderRadius: 30 }}
        checked={checked}
        checkedColor="lightgreen"
        onValueChange={(checked) => setChecked(checked)}
      />
      <Text>禁用</Text>
      <Checkbox
        style={{ borderRadius: 30 }}
        disabled={disabled}
        checked={checked}
        checkedColor="lightgreen"
        onValueChange={(checked) => setChecked(checked)}
      />
    </>
  );
};

export default Index;
