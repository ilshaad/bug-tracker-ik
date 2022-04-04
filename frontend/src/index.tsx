import App from "./App";
import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./styles/customBootstrap.scss";
import "./styles/global.scss";

import store from "./redux/store";

// * uncomment service worker when you ready to enable workbox pwa within webpack config files
// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/service-worker.js")
//       .then((registration) => {
//         console.log("SW registered: ", registration);
//       })
//       .catch((registrationError) => {
//         console.log("SW registration failed: ", registrationError);
//       });
//   });
// }

/*To listen to any unhandled promise rejections (no catch handler?)
+\ you probably remove it afterwards if you think you do not need it. */
window.addEventListener("unhandledrejection", function (event) {
  console.warn("iK unhandledrejection (promise): ", event.promise);
  console.warn("iK unhandledrejection (reason): ", event.reason);
});

/*iK React with not redux store */
/*IK you could set up react context api if needed */
// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// ); /*END ReactDOM.render() */

// import { createRoot } from "react-dom/client";
const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

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
