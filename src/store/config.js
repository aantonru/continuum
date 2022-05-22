import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
    return createStore(
        infrastructureReducer,
        initialState,
        applyMiddleware(thunk)
    );
}

function infrastructureReducer(state, action) {
    switch (action.type) {
      case 'GET_INFRASTRUCTURE_TEST':
        return [
          ...state,
          {
            infrastructure: action.infrastructure,
          }
        ]
      default:
        return state
    }
}