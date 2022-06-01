import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from '../index';
import './App.css';
import MyAuth from './MyAuth'
import MyForm from './Core'
import GeoTest from './GeoTest'

export class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
        <div className="App">
          <header className="App-header">
            <Link to="/auth/">Auth</Link>
            <Link to="/get/">Search</Link>
            <Link to="/test/">Test</Link>
          </header>
        </div>
        <div className="AppBody">
          <div className="Container">
          <Route path="/auth/" exact component={MyAuth} />
          <Route path="/get/"  exact component={MyForm} />
          <Route path="/test/" exact component={GeoTest} />
          </div>
        </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
