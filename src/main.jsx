import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./index.css";
import { Toaster } from 'react-hot-toast';
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}  >
      <App  />
      <Toaster position="top-right" reverseOrder={false} />
    </Provider>
  </StrictMode>
);
