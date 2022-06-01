import GeoPicker from '../../../lib/mapbox/index';
import createReduxFormAdaptor from './createAdaptor';

export default (function (options) {
  return createReduxFormAdaptor(options)(GeoPicker);
});