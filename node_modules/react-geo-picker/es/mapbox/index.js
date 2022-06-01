var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import asGeoPicker from '../asGeoPicker';
import MarkerSvg from '../components/MarkerSvg';

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

    return React.createElement(
      ReactMapGL,
      _extends({}, viewport, {
        width: width,
        height: height,
        mapboxApiAccessToken: apiKey,
        onViewportChange: this.onViewportChange
      }),
      React.createElement(
        Marker,
        {
          latitude: viewport.latitude,
          longitude: viewport.longitude,
          offsetTop: -MarkerSvg.size.height,
          offsetLeft: -MarkerSvg.size.width / 2
        },
        React.createElement(MarkerSvg, null)
      )
    );
  };

  return MapboxGeoPicker;
}(Component);

MapboxGeoPicker.defaultProps = {
  width: 400,
  height: 300,
  location: undefined
};

export default asGeoPicker()(MapboxGeoPicker);