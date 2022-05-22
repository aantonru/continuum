//import * as nsfwjs from 'nsfwjs';

export function modelLoaded(model) {
    return {
        type: 'MODEL_LOADED',
        model
    };
}

export function setMessage(message) {
    return {
        type: 'AI_MESSAGE',
        message
    }
}


export function loadModel() {
    console.log('action run');
    return async (dispatch) => {
        dispatch(setMessage('AI loading...'));
    //    nsfwjs.load().then(model => {
      //      console.log('model is here');
       //     dispatch(modelLoaded(model));
            dispatch(setMessage('AI ready'));
      //  })
    }
}