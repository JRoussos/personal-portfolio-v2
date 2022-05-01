import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes/routes';
import Background from './components/background/background';
import Loading from './components/loading/loading'
 
import { useStore } from './contexts/store'

const App = () => {
  const { canvasReady } = useStore().state

  return (
    <BrowserRouter>
      {/* {!canvasReady && <Loading/>} */}
      {/* <Background/> */}
      <Routes/>
    </BrowserRouter>
  )
}

export default App;
