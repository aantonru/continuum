'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMapGl = require('react-map-gl');

var _reactMapGl2 = _interopRequireDefault(_reactMapGl);

require('mapbox-gl/dist/mapbox-gl.css');

var _asGeoPicker = require('../asGeoPicker');

var _asGeoPicker2 = _interopRequireDefault(_asGeoPicker);

var _MarkerSvg = require('../components/MarkerSvg');

var _MarkerSvg2 = _interopRequireDefault(_MarkerSvg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MapboxGeoPicker = function (_Component) {
  _inherits(MapboxGeoPicker, _Component);

  function MapboxGeoPicker() {
    var _temp, _this, _ret;

    _classCallCheck(this, MapboxGeoPicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      viewport: {
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      }
    }, _this.onViewportChange = function (viewport) {
      return _this.setState({ viewport: viewport }, function () {
        var onLocationChange = _this.props.onLocationChange;

        if (onLocationChange) {
          onLocationChange({
            latitude: viewport.latitude,
            longitude: viewport.longitude
          });
        }
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  MapboxGeoPicker.prototype.render = function render() {
    var _props = this.props,
        width = _props.width,
        height = _props.height,
        location = _props.location,
        apiKey = _props.apiKey;

    var viewport = _extends({}, this.state.viewport, location);

    return _react2.default.createElement(
      _reactMapGl2.default,
      _extends({}, viewport, {
        width: width,
        height: height,
        mapboxApiAccessToken: apiKey,
        onViewportChange: this.onViewportChange
      }),
      _react2.default.createElement(
        _reactMapGl.Marker,
        {
          latitude: viewport.latitude,
          longitude: viewport.longitude,
          offsetTop: -_MarkerSvg2.default.size.height,
          offsetLeft: -_MarkerSvg2.default.size.width / 2
        },
        _react2.default.createElement(_MarkerSvg2.default, null)
      )
    );
  };

  return MapboxGeoPicker;
}(_react.Component);

MapboxGeoPicker.defaultProps = {
  width: 400,
  height: 300,
  location: undefined
};

exports.default = (0, _asGeoPicker2.default)()(MapboxGeoPicker);
module.exports = exports['default'];