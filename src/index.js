import React from 'react';
import ReactDOM from 'react-dom';

// import Background from './components/background/background';
import App from './App';

import './styles/index-style.scss';

ReactDOM.render(
  <React.StrictMode>
    <div id="noise"/>
    {/* <Background/> */}
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

