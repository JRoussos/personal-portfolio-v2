import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes/routes';
import Background from './components/background/background';

const App = () => {

  return (
    <BrowserRouter>
      <Background/>
      <Routes/>
    </BrowserRouter>
  )
}

export default App;
