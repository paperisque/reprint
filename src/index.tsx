import React from 'react';
import ReactDOM from 'react-dom';

import "antd/dist/antd.css";
import "./assets/index.scss"
import "./assets/dashboard.scss"
import "./assets/dashboard.lite.scss"
import "./assets/dashboard.dark.scss"
import './i18n/config';

import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
  //<React.StrictMode>
  <Provider store={store}>
      <App />
  </Provider>    
  //</React.StrictMode>
  ,document.getElementById('application')
);

