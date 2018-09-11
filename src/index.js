import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { ActionCableProvider } from 'react-actioncable-provider'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ActionCable from 'actioncable'

ReactDOM.render(
  <ActionCableProvider url='ws://localhost:3000/cable'>
  {/* <ActionCableProvider url='ws://10.39.107.200:3000/cable'> */}
  <Router>
    <App />
  </Router>
  </ActionCableProvider>,
  document.getElementById('root'));
registerServiceWorker();
