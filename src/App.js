import React from 'react';

import Background from './components/background/background';
import Hero from './components/hero/hero';
import Mouse from './components/mouse/mouse';

import './App.css';

const App = () => {
  return (
    <main>
      <Mouse/>
      <Hero/>
      <Background/>
    </main>
  )
}

export default App;
