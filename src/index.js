import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import { signalRRegistration } from './store/middleware/signalRRegistration';
import AzureMapContainer from './components/azureMaps.container';


const store = configureStore();

signalRRegistration(store);
// Create the React app
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <AzureMapContainer azureMapsKey = "hbBBC5OVFUQz0-p71o4emRAHcSCNgy1BLDBYUB4Q69A"/>
      </Router>
    </Provider>,
    document.getElementById('root')
  );
registerServiceWorker();
