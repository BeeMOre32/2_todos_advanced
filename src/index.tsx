import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { RecoilRoot } from "recoil";
import { DarkTheme } from "./Theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <ThemeProvider theme={DarkTheme}>
      <App />
    </ThemeProvider>
  </RecoilRoot>
);
