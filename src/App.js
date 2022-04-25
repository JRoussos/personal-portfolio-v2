import React, { useState, useLayoutEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import imagesloaded from 'imagesloaded';

import Routes from './routes/routes';
import Background from './components/background/background';
import LoadingScreen from './components/loading/loading.js'

import { StateProvider } from './contexts/store';

const App = () => {
  const [ imagesLoadedState, setLoadingState ] = useState(false)

  useLayoutEffect(() => {
    imagesloaded(document.querySelectorAll('img'), () => setLoadingState(true))
  }, [])

  return (
    <StateProvider>
        <BrowserRouter>
          { imagesLoadedState ? <Background/> : <LoadingScreen/> }
          <Routes imagesLoadedState={imagesLoadedState}/>
        </BrowserRouter>
    </StateProvider>
  )
}

export default App;
