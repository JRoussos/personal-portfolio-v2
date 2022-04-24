import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import Routes from './routes/routes';
import Background from './components/background/background';

import Mouse from './utils/mouse';

import { StateProvider } from './contexts/store';

const App = () => {
  return (
    <StateProvider>
      { isMobile || <Mouse/> }
      <BrowserRouter>
        <Background/>
        <Routes/>
      </BrowserRouter>
    </StateProvider>
  )
}

export default App;
