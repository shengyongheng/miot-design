"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _miotDesign = require("miot-design");
var _react = _interopRequireWildcard(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// import Radio from 'miot/ui/Radio';
// import { Radio } from 'mhui-rn-fixed';

const App = () => {
  const [disabled] = (0, _react.useState)(false);
  const [isChecked, setIsChecked] = (0, _react.useState)(false);
  const changeCheck = () => {
    setIsChecked(!isChecked);
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_miotDesign.Radio, {
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
var _default = exports.default = App;
//# sourceMappingURL=Basic.js.map