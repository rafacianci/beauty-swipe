import React from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Products from './containers/Products'

import './App.css';

const store = createStore(
  reducers,
  {},
  applyMiddleware(thunk),
);

axios.defaults.baseURL = 'https://ycl641scac.execute-api.us-west-2.amazonaws.com/staging';

const App = () => (
  <Provider store={store}>
    <div className='App'>
      <Products />
    </div>
  </Provider>
);

export default App;
