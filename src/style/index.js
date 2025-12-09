import { mergeWith } from 'lodash';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react';
import defaultTheme from './themes/default';

export const ThemeContext = createContext(defaultTheme);

export const ThemeProvider = (props) => {
  const { value, children } = props;
  const theme = useMemo(() => ({ ...defaultTheme, ...value }), [value]);
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

function customizer(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  } else {
    return [objValue, srcValue];
  }
}

// useTheme hook
export function useTheme(props) {
  const { themeStyles, styles } = props;

  const theme = useContext(ThemeContext);

  const themeStylesMemo = useMemo(
    () => mergeWith(themeStyles(theme), styles, customizer),
    // eslint-disable-next-line prettier/prettier
    [styles, theme, themeStyles],
  );

  return themeStylesMemo;
}
/**
 * Component can extends this props
 */
export function WithTheme(props) {
  const { children, themeStyles, styles } = props;

  const cache = useRef(undefined);

  const getStyles = useCallback(
    (theme) => {
      if (!cache.current && themeStyles) {
        cache.current = themeStyles(theme);
      }

      if (cache.current) {
        return mergeWith(cache.current, styles, customizer);
      }
      return styles;
    },
    // eslint-disable-next-line prettier/prettier
    [themeStyles, styles],
  );

  return (
    <ThemeContext.Consumer>
      {(theme) => children(getStyles(theme), theme)}
    </ThemeContext.Consumer>
  );
}
