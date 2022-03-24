import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

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
    <App />
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
