import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { ActionCableProvider } from 'react-actioncable-provider'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <ActionCableProvider url='ws://localhost:3000/cable'>
    <App />
  </ActionCableProvider>,
  document.getElementById('root'));
registerServiceWorker();
