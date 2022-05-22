
export function model(state = [], action) {
    switch (action.type) {
        case 'MODEL_LOADED':
            return action.model;
        default:
            return state;
    }
}

export function predictions(state = [], action) {
    switch (action.type) {
        case 'GOT_PRED':
            state[action.id]=action.predictions;
            return state;
        default:
            return state;
    }
}


export function message(state = [], action) {
    switch (action.type) {
        case 'AI_MESSAGE':
            return action.message;
        default:
            return state;
    }
}

export function photosHasError(state = false, action) {
    switch (action.type) {
        case 'PHOTOS_HAS_ERROR':
            return action.hasError;
        default:
            return state;
    }
}

export function photosIsLoading(state = false, action) {
    switch (action.type) {
        case 'PHOTOS_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}

export function photos(state = [], action) {
    switch (action.type) {
        case 'PHOTOS_FETCH_DATA_SUCCESS':
            return state.concat(action.photos);
        default:
            return state;
    }
}

const INITIAL_STATE = {
    photos:[]
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
