import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

const wrapper = document.createElement("div");
wrapper.id = "client-root";

const shadowRoot = wrapper.attachShadow({ mode: "open" });
document.body.appendChild(wrapper);

ReactDOM.createRoot(shadowRoot).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
