'use strict';

exports.__esModule = true;

var _reduxForm = require('redux-form');

var _reactRedux = require('react-redux');

var createReduxFormAdaptor = function createReduxFormAdaptor(_ref) {
  var formName = _ref.formName,
      _ref$precision = _ref.precision,
      precision = _ref$precision === undefined ? 4 : _ref$precision;

  if (!formName) {
    throw new Error('formName must be provided');
  }

  var selector = (0, _reduxForm.formValueSelector)(formName);

  var locationMapper = function locationMapper(state) {
    var latitude = selector(state, 'latitude');
    var longitude = selector(state, 'longitude');

    if (!latitude || !longitude) return {};

    return {
      value: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      }
    };
  };

  var dispatchMapper = function dispatchMapper(dispatch) {
    return {
      onChange: function onChange(_ref2) {
        var latitude = _ref2.latitude,
            longitude = _ref2.longitude;

        dispatch((0, _reduxForm.change)(formName, 'latitude', latitude.toFixed(precision)));
        dispatch((0, _reduxForm.change)(formName, 'longitude', longitude.toFixed(precision)));
      }
    };
  };

  return (0, _reactRedux.connect)(locationMapper, dispatchMapper);
};

exports.default = createReduxFormAdaptor;
module.exports = exports['default'];