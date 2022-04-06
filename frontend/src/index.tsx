import App from "./App";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
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

// import { createRoot } from "react-dom/client";
const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.DOMAIN_AUTH0!}
      clientId={process.env.CLIENT_ID_AUTH0!}
      redirectUri={`${window.location.origin}/dashboard`}
    >
      <Provider store={store}>
        <App />
      </Provider>{" "}
    </Auth0Provider>
  </React.StrictMode>
);
