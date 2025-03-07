import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { persistor, store } from './redux/store/index';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga4';
import { PersistGate } from 'redux-persist/integration/react';

ReactGA.initialize('G-EK9E72LREP');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </React.StrictMode>
  </Provider>


);
