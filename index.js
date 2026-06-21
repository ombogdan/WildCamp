(() => {
  const React = require('react');
  const RN = require('react-native');
  const { Text, TextInput } = RN;
  Text.defaultProps = { ...(Text.defaultProps || {}), allowFontScaling: false, maxFontSizeMultiplier: 1 };
  TextInput.defaultProps = { ...(TextInput.defaultProps || {}), allowFontScaling: false, maxFontSizeMultiplier: 1 };
  const baseOf = (type) => type?.target || type?.render?.type || type?.render || type;
  const isTextLike = (type) => {
    const b = baseOf(type);
    return b === Text || b === TextInput || b?.displayName === 'Text' || b?.displayName === 'TextInput';
  };
  const JSX = require('react/jsx-runtime');
  const wrap = (orig) => (type, props, key) => {
    if (isTextLike(type)) {
      props = { ...(props || {}), allowFontScaling: false, maxFontSizeMultiplier: 1 };
    }
    return orig(type, props, key);
  };
  if (JSX.jsx)  JSX.jsx  = wrap(JSX.jsx);
  if (JSX.jsxs) JSX.jsxs = wrap(JSX.jsxs);
  try {
    const JSXDEV = require('react/jsx-dev-runtime');
    if (JSXDEV?.jsxDEV) JSXDEV.jsxDEV = wrap(JSXDEV.jsxDEV);
  } catch {}
  const _create = React.createElement;
  React.createElement = (type, props, ...children) => {
    if (isTextLike(type)) {
      props = { ...(props || {}), allowFontScaling: false, maxFontSizeMultiplier: 1 };
    }
    return _create(type, props, ...children);
  };
  global.__FONT_PATCH__ = 'applied';
})();
import {AppRegistry} from 'react-native';
import {App} from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
