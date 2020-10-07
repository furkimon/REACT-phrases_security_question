import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StateProvider } from './reducer/StateProvider';
import reducer, { initialState } from './reducer/reducer';

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
        <App />
    </StateProvider>, 
  document.getElementById('root')
);
