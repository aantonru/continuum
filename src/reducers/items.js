export function photosHasError(state = false, action) {
    switch (action.type) {
        case 'PHOTOS_HAS_ERROR':
            return action.photosHasError;
        default:
            return state;
    }
}

export function photosIsLoading(state = false, action) {
    switch (action.type) {
        case 'PHOTOS_IS_LOADING':
            return action.photosIsLoading;
        default:
            return state;
    }
}

export function photos(state = [], action) {    
    console.warn(`${action.type} reducer!`)
    console.log(state)
    console.log(action)
    switch (action.type) {
        case 'PHOTOS_FETCH_DATA_SUCCESS':
            return [...action.photos];
        case 'PHOTOS_APPEND':
            return [...state, ...action.photos]
        default:
            return state;
    }
}

export const INITIAL_STATE = {
    photos:[],
    photosFound:0,
    photosHasError:false,
    photosIsLoading:false
}

export function photosClear(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'PHOTOS_CLEAR':
            return INITIAL_STATE;
        default:
            return state;
    }
}

export function photosFound(state = [], action) {
    switch (action.type) {
        case 'PHOTOS_FOUND':
            return action.photosFound;
        default:
            return state;
    }
}
