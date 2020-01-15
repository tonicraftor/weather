import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import createStore from './store';
import Header from './components/Header';
import CityCurrent from './components/CityCurrent';

const store = createStore();
function App() {
  return (
    <div>
      <Provider store={store}>
        <Header />
        <CityCurrent />
      </Provider>
    </div>
  );
}

export default App;
