// import Radio from 'miot/ui/Radio';
// import { Radio } from 'mhui-rn-fixed';
import { Radio } from 'miot-design';
import React, { useState } from 'react';
const App = () => {
  const [disabled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const changeCheck = () => {
    setIsChecked(!isChecked);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Radio, {
    isChecked: isChecked,
    changeCheck: changeCheck,
    id: 1,
    bigCircleStyle: {
      borderWidth: 4,
      width: 40,
      height: 40,
      borderRadius: 20
    },
    checkedBigCircleStyle: {
      borderColorChecked: '#00C',
      backgroundColorChecked: '#33F',
      borderColor: '#666',
      backgroundColor: '#999'
    },
    disabled: disabled
  }));
};
export default App;
//# sourceMappingURL=Basic.js.map