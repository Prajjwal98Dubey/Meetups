import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserInfoContextProvider from "./contexts/UserInfoContextProvider.jsx";
import PostsContextProvider from "./contexts/PostsContextProvider.jsx";
import EventsContextProvider from "./contexts/EventsContextProvider.jsx";
import FilterValueContextProvider from "./contexts/FilterValueContextProvider.jsx";
import FeedsContextProvider from "./contexts/FeedsContextProvider.jsx";
import CategoryInfoContextProvider from "./contexts/CategoryInfoContextProvider.jsx";
import JoinEventInfoProvider from "./contexts/JoinEventInfoProvider.jsx";
import FollowInfoContextProvider from "./contexts/FollowInfoContextProvider.jsx";
import UserLocationInfoProvider from "./contexts/UserLocationInfoProvider.jsx";

createRoot(document.getElementById("root")).render(
  <UserInfoContextProvider>
    <PostsContextProvider>
      <EventsContextProvider>
        <FilterValueContextProvider>
          <FeedsContextProvider>
            <CategoryInfoContextProvider>
              <JoinEventInfoProvider>
                <FollowInfoContextProvider>
                  <UserLocationInfoProvider>
                    <App />
                  </UserLocationInfoProvider>
                </FollowInfoContextProvider>
              </JoinEventInfoProvider>
            </CategoryInfoContextProvider>
          </FeedsContextProvider>
        </FilterValueContextProvider>
      </EventsContextProvider>
    </PostsContextProvider>
  </UserInfoContextProvider>
);
