# react-geo-picker

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![codecov][codecov-badge]][codecov]

## Install

```
npm i -S react-geo-picker
```

## Usage

### Basic

You can view latest [demo][basic-demo] and its [code][basic-demo-code].
```
import MapboxGeoPicker from 'react-geo-picker/lib/mapbox';
// or
// import GoogleMapGeoPicker from 'react-geo-picker/lib/google-map';

<MapboxGeoPicker
  apiKey="AIzaSyB76ISmD-V4SDgMOKnNAIW2X9XwD9tCZtE"
  height={300}
  width={400}
  defaultValue={{
    latitude: 37.871263,
    longitude: -122.268783,
  }}
  value={this.state.location}
  onChange={(location) => this.setState({ location })}
/>

```

### Redux-form

You can view latest [demo][redux-form-demo] and its [code][redux-form-demo-code].
Notice: you don't need to pass `value` and `onChange` props explicitly any more.

```
import createMapboxGeoPicker from 'react-geo-picker/lib/forms/redux-form/createMapboxGeoPicker';
// or
// import createGoogleMapGeoPicker from 'react-geo-picker/lib/forms/redux-form/createGoogleMapGeoPicker';

const formName = 'redux-form-demo';

const MapboxGeoPicker = createMapboxGeoPicker({ formName });
// const GoogleMapGeoPicker = createGoogleMapGeoPicker({ formName });

<MapboxGeoPicker
  apiKey="AIzaSyB76ISmD-V4SDgMOKnNAIW2X9XwD9tCZtE"
  height={300}
  width={400}
  defaultValue={{
    latitude: 37.871263,
    longitude: -122.268783,
  }}
/>

```

### Advanced

You can construct your own component with any hocs of this repo.

```
import compose from 'recompose/compose';
import asGeoPicker from 'react-geo-picker/lib/asGeoPicker';
import createReduxFormAdaptor from 'react-geo-picker/lib/forms/redux-form/createAdaptor';

const MyMapRenderer = ({
  width,
  height,
  apiKey,
  center: {
    lat,
    lng
  },
  onCenterChange,
}) => {
  //...
}

const propNameMap = {
  location: 'center',
  onLocationChange: 'onCenterChange',
  latitude: 'lat',
  longitude: 'lng',
};

const formName = 'myForm';
const precision = 5;

export default compose(
  createReduxFormAdaptor({ formName, precision }),
  asGeoPicker({ propNameMap }),
)(MyMapRenderer);
```

## MIT License

[basic-demo-code]: demo/src/demos/BasicDemo
[basic-demo]: https://stupidism.github.io/react-geo-picker/#/
[redux-form-demo-code]: demo/src/demos/ReduxFormDemo
[redux-form-demo]: https://stupidism.github.io/react-geo-picker/#/redux-form

[build-badge]: https://travis-ci.org/Stupidism/react-geo-picker.svg?branch=master
[build]: https://travis-ci.org/Stupidism/react-geo-picker

[npm-badge]: https://img.shields.io/npm/v/react-geo-picker.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-geo-picker

[codecov-badge]: https://codecov.io/gh/Stupidism/react-geo-picker/branch/master/graph/badge.svg
[codecov]: https://codecov.io/gh/Stupidism/react-geo-picker
