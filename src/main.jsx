import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// redux
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./reducer/index";

const store = createStore(rootReducer, composeWithDevTools());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
