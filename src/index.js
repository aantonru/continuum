import React from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter as Router, Link, Route } from "react-router-dom";
//import { Provider } from 'react-redux';

import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/config.js';

export const store = configureStore();
window.store = store;

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();