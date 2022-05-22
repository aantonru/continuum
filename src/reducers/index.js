import { combineReducers } from 'redux';
//import { reducer as formReducer } from 'redux-form';
import { photos, photosClear, photosFound, photosHasError, photosIsLoading, model, message, predictions } from './items';

const appReducer = combineReducers({
    photos,
    photosFound,
    photosClear,
    photosHasError,
    photosIsLoading,
    model,
    message,
    predictions
//    form: formReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'PHOTOS_CLEAR') {
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer;