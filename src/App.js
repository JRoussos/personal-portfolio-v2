import React from 'react';

import Background from './components/background/background';
import Hero from './components/hero/hero';
import Projects from './components/projects/projects';
import Contact from './components/contact/contact';

const App = () => {
  return (
    <main>
      <Background/>
      <Hero/>
      <Projects/>
      <Contact/>
    </main>
  )
}

export default App;
