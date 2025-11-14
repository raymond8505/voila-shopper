import { GlobalStyles } from "./components/common/styles/GlobalStyles";
import { ConfigProvider } from "antd";
import { App as InnerApp } from "./app/App";

function App() {
  return (
    <ConfigProvider>
      <GlobalStyles />
      <InnerApp />
    </ConfigProvider>
  );
}

export default App;
