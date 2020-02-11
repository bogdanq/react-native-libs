import * as React from "react";
import { render } from "react-dom";
import { ModalRootProvider } from "./modal";
import App from "./App";

const rootElement = document.getElementById("root");
render(
  <ModalRootProvider>
    <App />
  </ModalRootProvider>,
  rootElement
);
