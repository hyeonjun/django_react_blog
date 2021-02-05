import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as reportWebVitals from './reportWebVitals';
import * as serviceWorker from "./serviceWorker";

// import { Provider } from 'react-redux';
import axios from "axios";

axios.defaults.baseURL = "http://39.118.174.168:3653";
axios.defaults.withCredentials = true;


ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.

serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
