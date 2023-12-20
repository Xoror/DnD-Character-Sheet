import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './app/store'
import { Provider } from 'react-redux'
import { debounce } from 'lodash';


import 'bootstrap/dist/css/bootstrap.min.css'

const saveState = async (state) => {
  console.log("initiate saving state", store.getState())
  try {
    const stringifiedCurrentState = JSON.stringify(state);
    sessionStorage.setItem("dnd-sheet-state", stringifiedCurrentState);
  } catch (e) {
    // Ignore
  }
}

store.subscribe(
  // we use debounce to save the state once each 800ms
  // for better performances in case multiple changes occur in a short time
  debounce(() => {
    saveState(store.getState());
  }, 800)
);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
/*
configureStoreAsync().then(store => 
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )  
)
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
