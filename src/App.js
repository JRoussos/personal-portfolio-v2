import React from 'react';

import Hero from './components/hero/hero';
import Projects from './components/projects/projects';
import Contact from './components/contact/contact';

import SmoothScroll, { getScrollValue } from './utils/SmoothScroll';
import Background from './components/background/background';

const App = () => {
  return (
    <React.Fragment>
      <Background getScrollValue={getScrollValue}/>
      <SmoothScroll>
        <Hero/>
        <Projects/>
        <Contact/>
      </SmoothScroll>
    </React.Fragment>
  )
}

export default App;
