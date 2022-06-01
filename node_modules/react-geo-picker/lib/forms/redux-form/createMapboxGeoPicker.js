'use strict';

exports.__esModule = true;

var _index = require('../../../lib/mapbox/index');

var _index2 = _interopRequireDefault(_index);

var _createAdaptor = require('./createAdaptor');

var _createAdaptor2 = _interopRequireDefault(_createAdaptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {
  return (0, _createAdaptor2.default)(options)(_index2.default);
};

module.exports = exports['default'];