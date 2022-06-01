import GeoPicker from '../../../lib/google-map/index';
import createReduxFormAdaptor from './createAdaptor';

export default (function (options) {
  return createReduxFormAdaptor(options)(GeoPicker);
});