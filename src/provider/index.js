import React from 'react';
import { ThemeProvider } from '../style';
export default function Provider({ theme, children }) {
  return <ThemeProvider value={theme}>{children}</ThemeProvider>;
}
