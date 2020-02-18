import React from 'react';
import './App.css';
import AppRouter from './AppRouter';
import AppContainer from './views/AppContainer';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
      <BrowserRouter>
        <AppContainer>
          <AppRouter />
        </AppContainer>
      </BrowserRouter>
  );
}

export default App;
