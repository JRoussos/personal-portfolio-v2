import React from 'react';
import ReactDOM from 'react-dom';

import { isMobile } from 'react-device-detect';
import Mouse from './utils/mouse';

import App from './App';

import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <div id='noise'></div>
    { isMobile || <Mouse/> }
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

