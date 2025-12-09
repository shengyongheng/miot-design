import React from 'react';
import { ThemeProvider } from '../style';
export default function Provider({
  theme,
  children
}) {
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    value: theme
  }, children);
}
//# sourceMappingURL=index.js.map