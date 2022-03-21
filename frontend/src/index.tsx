// import 'react-app-polyfill/ie11';
// import 'normalize.css';
// import './CSS/oikGrid.css';
// import './index.css';
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
// import PropTypes from 'prop-types';
// import { BrowserRouter, Route } from 'react-router-dom';
// import { createStore, applyMiddleware, compose } from 'redux';
// import { Provider, connect, ReactReduxContext } from 'react-redux';
// import ReduxThunk from 'redux-thunk';
// import axios from 'axios';
// import DOMPurify from 'dompurify';

/*To listen to any unhandled promise rejections (no catch handler?)
+\ you probably remove it afterwards if you think you do not need it. */
window.addEventListener("unhandledrejection", function (event) {
  console.warn("iK unhandledrejection (promise): ", event.promise);
  console.warn("iK unhandledrejection (reason): ", event.reason);
});

/*iK React with not redux store */
/*IK you could set up react context api if needed */
ReactDOM.render(
  <React.StrictMode>
    <div>
      indexty
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
); /*END ReactDOM.render() */

/*iK using React-Redux */
// import kStore1 from './Redux-State/Redux-Store/kStore.js';

// ReactDOM.render(
//     <React.StrictMode>
//         <Provider store={kStore1}>
//             <App />
//         </Provider>
//     </React.StrictMode>,
//     document.getElementById('root')
// ); /*END ReactDOM.render() */

// import iKh1 from './components/iKh1.js';
// import iKimg from './components/iKimg.js';

// const iKindexjs = () => {
// 	const iKdiv = document.createElement('div');

// 	iKdiv.textContent = 'iK from iKindexjs';

// 	iKdiv.style.border = 'red 3px solid';

// 	return iKdiv;
// }; /*END iKindexjs */

// const iKbody = document.getElementsByTagName('body')[0];

// iKbody.appendChild(iKindexjs());
// iKbody.appendChild(iKh1());
// iKbody.appendChild(iKimg());
