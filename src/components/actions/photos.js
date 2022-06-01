//import axios from "axios";
import { store } from '../../index';

export function photosHasError(bool) {
    bool=true;
    return {
        type: 'PHOTOS_HAS_ERROR',
        photosHasError: bool
    };
}

export function photosIsLoading(bool) {
    return {
        type: 'PHOTOS_IS_LOADING',
        photosIsLoading: bool
    };
}

export function photosFetchDataSuccess(photos) {
    return {
        type: 'PHOTOS_FETCH_DATA_SUCCESS',
        photos: photos,
    };
}

export function photosDataAppend(photos) {
    return {
        type:"PHOTOS_APPEND",
        photos: photos
    }
}

export function photosClear() {
    return {
        type: 'PHOTOS_CLEAR'
    }
}

export function photosFound(count) {
    return {
        type: 'PHOTOS_FOUND',
        photosFound: count
    };
}

export function gotPredictions(id, predictions) {
    return {
        type: 'GOT_PRED',
        id,
        predictions
    }
}

export function getNsfw(id, url, width, height) {
    return async (dispatch) => {
    const img = new Image();
    img.width=width;
    img.height=height;
    img.crossOrigin = 'anonymous';
    img.src = url;
    console.log(img);
    let state=store.getState();
    const predictions = await state.model.classify(img);    
    console.log(predictions);
   store.dispatch(gotPredictions(id,predictions));
    }
}

export function photosSearch(params) {
    console.log('--search params--');
    console.log(params);
//    let state0=store.getState();
//    console.warn(state0);
 
    return (dispatch) => {
        dispatch(photosIsLoading(true));
        const VK = window.VK;
        if (VK && VK!==null && VK!==undefined) {
            
            VK.Api.call('photos.search', {lat:params.lat, long:params.long, sort:1, offset:params.offset, count:params.count, radius:params.radius, start_time:params.start_time, end_time:params.end_time, v:params.v},(r) => { // eslint-disable-line no-undef
                dispatch(photosIsLoading(false));
                if (r && r.hasOwnProperty('response')) {
                    console.log(r.response)
                    dispatch(photosFound(r.response.count))
                    dispatch(photosFetchDataSuccess(r.response.items ));
                } else {
                   dispatch(photosHasError(true));
                }
                
            });
        } else {
           dispatch(photosIsLoading(true));
           dispatch(photosHasError(true));
        }
    }
}

export function photosAppend(params) {
 
    return (dispatch) => {
        const VK = window.VK;
        if (VK && VK!==null && VK!==undefined) {            
            VK.Api.call('photos.search', {lat:params.lat, long:params.long, sort:1, offset:params.offset, count:params.count, radius:params.radius, start_time:params.start_time, end_time:params.end_time, v:params.v},(r) => { // eslint-disable-line no-undef
                if (r && r.hasOwnProperty('response')) {
                    console.log(r.response)
                    dispatch(photosDataAppend(r.response.items ));
                } else {
                   dispatch(photosHasError(true));
                }
                
            });
        } else {
           dispatch(photosIsLoading(true));
           dispatch(photosHasError(true));
        }
    }
}