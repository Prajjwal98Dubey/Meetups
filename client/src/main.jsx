import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserInfoContextProvider from "./contexts/UserInfoContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <UserInfoContextProvider>
    <App />
  </UserInfoContextProvider>
);
