import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalStyles } from "../components/common/styles/GlobalStyles";
import { ClientPlayground } from "./components/ClientPlayground";



ReactDOM.createRoot(document.getElementById('client-playground')!).render(
  <React.StrictMode>
    <ConfigProvider>
      <GlobalStyles />
      <ClientPlayground />
    </ConfigProvider>
  </React.StrictMode>
);
