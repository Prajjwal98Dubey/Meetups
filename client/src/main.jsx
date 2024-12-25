import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserInfoContextProvider from "./contexts/UserInfoContextProvider.jsx";
import PostsContextProvider from "./contexts/PostsContextProvider.jsx";
import EventsContextProvider from "./contexts/EventsContextProvider.jsx";
import FilterValueContextProvider from "./contexts/FilterValueContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <UserInfoContextProvider>
    <PostsContextProvider>
      <EventsContextProvider>
        <FilterValueContextProvider>
          <App />
        </FilterValueContextProvider>
      </EventsContextProvider>
    </PostsContextProvider>
  </UserInfoContextProvider>
);
