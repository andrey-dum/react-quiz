import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './store/reducers/rootReducer';

import reportWebVitals from './reportWebVitals';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;


const store = createStore(
  rootReducer, 
  composeEnhancers(
    applyMiddleware(
      thunk
)))


ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
