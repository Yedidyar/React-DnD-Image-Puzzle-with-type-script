import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ItemsProvider from "./context/ItemsProvider";

ReactDOM.render(
  <React.StrictMode>
    <ItemsProvider>
      <App />
    </ItemsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
