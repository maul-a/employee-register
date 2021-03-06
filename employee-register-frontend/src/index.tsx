import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import { Provider } from 'react-redux'
import { App } from './components/App'
import store from './store'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
    document.getElementById('app-root'),
)