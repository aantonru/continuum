var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import compose from 'recompose/compose';
import withState from 'recompose/withState';
import mapProps from 'recompose/mapProps';
import withDefaultProps from 'recompose/defaultProps';
import withHandlers from 'recompose/withHandlers';

export var defaultProps = {
  value: undefined,
  onChange: undefined,
  defaultValue: undefined,
  propNameMap: {
    location: 'location',
    latitude: 'latitude',
    longitude: 'longitude',
    onLocationChange: 'onLocationChange'
  }
};

var propsMapper = function propsMapper(_ref) {
  var value = _ref.value,
      location = _ref.location,
      rest = _objectWithoutProperties(_ref, ['value', 'location']);

  return _extends({
    width: 400,
    height: 300,
    location: value || location
  }, rest);
};

export { propsMapper };
export var initialState = function initialState(_ref2) {
  var _ref2$defaultValue = _ref2.defaultValue;
  _ref2$defaultValue = _ref2$defaultValue === undefined ? {} : _ref2$defaultValue;
  var latitude = _ref2$defaultValue.latitude,
      longitude = _ref2$defaultValue.longitude;
  return {
    latitude: latitude || 0,
    longitude: longitude || 0
  };
};

export var onLocationChange = function onLocationChange(_ref3) {
  var _ref3$propNameMap = _ref3.propNameMap,
      propNameMap = _ref3$propNameMap === undefined ? {} : _ref3$propNameMap,
      value = _ref3.value,
      onChange = _ref3.onChange,
      setLocation = _ref3.setLocation;
  return function () {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        latitude = _ref4[propNameMap.latitude],
        longitude = _ref4[propNameMap.longitude];

    var location = { latitude: latitude, longitude: longitude };
    if (onChange) {
      onChange(location);
    }

    if (!value) {
      setLocation(location);
    }
  };
};

var propNameMapper = function propNameMapper(_ref5) {
  var _ref6, _extends2;

  var _ref5$propNameMap = _ref5.propNameMap,
      propNameMap = _ref5$propNameMap === undefined ? {} : _ref5$propNameMap,
      location = _ref5.location,
      onLocationChange = _ref5.onLocationChange,
      rest = _objectWithoutProperties(_ref5, ['propNameMap', 'location', 'onLocationChange']);

  return _extends({}, rest, (_extends2 = {}, _extends2[propNameMap.location] = location ? (_ref6 = {}, _ref6[propNameMap.latitude] = location.latitude, _ref6[propNameMap.longitude] = location.longitude, _ref6) : location, _extends2[propNameMap.onLocationChange] = onLocationChange, _extends2));
};

export { propNameMapper };
export default (function () {
  var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      propNameMap = _ref7.propNameMap;

  return compose(withDefaultProps(_extends({}, defaultProps, {
    propNameMap: _extends({}, defaultProps.propNameMap, propNameMap)
  })), withState('location', 'setLocation', initialState), mapProps(propsMapper), withHandlers({ onLocationChange: onLocationChange }), mapProps(propNameMapper));
});