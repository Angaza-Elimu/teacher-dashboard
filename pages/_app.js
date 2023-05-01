import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";

import store from "../store";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

let persistor = persistStore(store);

const progress = new ProgressBar({
  size: 3,
  delay: 80,
  className: "z-50 bg-primary-600",
});

Router.events.on("routeChangeStart", (url) => (Router.pathname !== url ? progress.start() : null));
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
        <ToastContainer hideProgressBar />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
