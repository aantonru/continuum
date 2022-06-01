import { combineReducers } from 'redux';
//import { reducer as formReducer } from 'redux-form';
import { photos, photosClear, photosFound, photosHasError, photosIsLoading } from './items';

export default combineReducers({
    photos,
    photosFound,
    photosClear,
    photosHasError,
    photosIsLoading,
//    form: formReducer
});