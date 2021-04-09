import React from 'react';
import ReactDOM from 'react-dom';

import "antd/dist/antd.css";
import "./assets/index.scss"
import "./assets/dashboard.scss"
import "./assets/dashboard.lite.scss"
import App from './App';

ReactDOM.render(
  //<React.StrictMode>
      <App />
  //</React.StrictMode>
  ,document.getElementById('application')
);

