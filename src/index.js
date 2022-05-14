import React from 'react';
import ReactDOM from 'react-dom';

import { isMobile } from 'react-device-detect';

import { StateProvider } from './contexts/store';
import Mouse from './utils/mouse';

import App from './App';

import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    { !isMobile && <Mouse/> }
    <StateProvider>
      <App/>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

