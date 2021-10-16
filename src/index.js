import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import './styles/index-style.scss';

ReactDOM.render(
  <React.StrictMode>
    <div id="noise"/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

