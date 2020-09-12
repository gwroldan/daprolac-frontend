import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import './styles/index.css';
import App from './containers/App';
import reducers from './store/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducers,
    {},
    composeEnhancers(
        applyMiddleware(reduxThunk)
    )
);

ReactDOM.render(
  <Provider store = { store } >
    <App />
  </Provider>,
  document.getElementById('root')
);
