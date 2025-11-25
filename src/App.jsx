import React from 'react';
import { Desktop, Toolbar ,Dock} from '@components';

const App = () => {
  return (
    <div className='w-full h-screen'>
      <Toolbar />
      <Desktop />
      <Dock />
    </div>
  );
};

export default App;
