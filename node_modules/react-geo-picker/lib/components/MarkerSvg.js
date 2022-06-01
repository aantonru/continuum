"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MarkerSvg = function MarkerSvg(props) {
  return _react2.default.createElement(
    "svg",
    _extends({ viewBox: "131 50 760.5 922.5" }, props),
    _react2.default.createElement("path", { d: "M512 2.944c-210.048 0-380.352 170.304-380.352 380.352 0 210.112 318.912 633.984 380.352 633.984 59.52 0 380.352-423.872 380.352-633.984C892.352 173.312 722.112 2.944 512 2.944zM512 636.928c-140.032 0-253.568-113.536-253.568-253.568 0-140.032 113.536-253.568 253.568-253.568s253.504 113.536 253.504 253.568C765.568 523.392 652.032 636.928 512 636.928z" })
  );
};

MarkerSvg.size = {
  width: 30,
  height: 40
};

MarkerSvg.defaultProps = _extends({}, MarkerSvg.size, {
  fill: 'rgba(0, 228, 0, 0.6)'
});

exports.default = MarkerSvg;
module.exports = exports["default"];