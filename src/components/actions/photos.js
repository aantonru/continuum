//import axios from "axios";
import { store } from '../../index';

export function photosHasError(bool) {
    return {
        type: 'PHOTOS_HAS_ERRORED',
        hasError: bool
    };
}

export function photosIsLoading(bool) {
    return {
        type: 'PHOTOS_IS_LOADING',
        isLoading: bool
    };
}

export function photosFetchDataSuccess(photos) {
    return {
        type: 'PHOTOS_FETCH_DATA_SUCCESS',
        photos: photos,
    };
}

export const photosClear = {
    type: 'PHOTOS_CLEAR'
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
    dispatch(gotPredictions(id,predictions));
    }
}

export function photosSearch(params) {
    console.log('--search params--');
    console.log(params);
 
    return (dispatch) => {
        dispatch(photosIsLoading(true));
        const VK = window.VK;
        if (VK && VK!==null && VK!=='undefined') {
            VK.Api.call('photos.search', {lat:params.lat, long:params.long, sort:params.sort, offset:params.offset, count:params.count, radius:params.radius, start_time:params.start_time, end_time:params.end_time, v:params.v},(r) => { // eslint-disable-line no-undef
                dispatch(photosIsLoading(false));
                if (r.response && r.response!=='undefined' && r.response.items && r.response.items!=='undefined') {
                    dispatch(photosFound(r.response.count));
                    dispatch(photosFetchDataSuccess(r.response.items));
//                    r.response.items.map((item) => {
//                        let size=Math.floor(item.sizes.length/2)+1;
//                        dispatch(getNsfw(item.id, item.sizes[size].url, item.sizes[size].width, item.sizes[size].height));
//                    })
                } else {
                    dispatch(photosHasError())
                }
                console.log('--response--');
                console.log(r);
            });
        } else {
            dispatch(photosIsLoading(false));
            dispatch(photosHasError())
        }
    }
}