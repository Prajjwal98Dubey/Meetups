import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserInfoContextProvider from "./contexts/UserInfoContextProvider.jsx";
import PostsContextProvider from "./contexts/PostsContextProvider.jsx";
import EventsContextProvider from "./contexts/EventsContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <UserInfoContextProvider>
    <PostsContextProvider>
      <EventsContextProvider>
        <App />
      </EventsContextProvider>
    </PostsContextProvider>
  </UserInfoContextProvider>
);
