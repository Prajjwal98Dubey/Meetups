import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// all feeds containing events and posts as well.
export const feedsPosts = async () => {
  let postsDetails = [];
  let eventsDetails = [];
  let feeds = [];
  const postsQuery = query(collection(db, "meet_posts"));
  const postsQuerySnapShot = await getDocs(postsQuery);
  postsQuerySnapShot.forEach((doc) => {
    postsDetails.push(doc.data());
  });
  const eventQuery = query(collection(db, "meet_events"));
  const eventQuerySnapShot = await getDocs(eventQuery);
  eventQuerySnapShot.forEach((doc) => {
    eventsDetails.push(doc.data());
  });
  feeds = [...postsDetails, ...eventsDetails];
  feeds.sort((a, b) => b.createdAt - a.createdAt);
  return feeds;
};

export const handleSearchQuery = async (text) => {
  let searchResult = [];
  // search for the user
  const userQuery = query(collection(db, "meet_users"));
  const userQuerySnapShot = await getDocs(userQuery);
  let filterdUsers = [];
  userQuerySnapShot.forEach((doc) => {
    let currUser = doc.data();
    if (
      currUser.user_email.toLowerCase().includes(text) ||
      currUser.user_name.toLowerCase().includes(text)
    ) {
      filterdUsers.push({
        search_category: "users",
        user_name: currUser.user_name,
        user_photo: currUser.user_photo,
        user_email: currUser.user_email,
      });
    }
  });
  // search for events
  const eventQuery = query(collection(db, "meet_events"));
  const eventQuerySnapShot = await getDocs(eventQuery);
  let filteredEvents = [];
  eventQuerySnapShot.forEach((doc) => {
    let currEvent = doc.data();
    if (
      currEvent.eventTitle.toLowerCase().includes(text) ||
      currEvent.eventDescription.toLowerCase().includes(text) ||
      currEvent.eventCategory.toLowerCase().includes(text)
    ) {
      filteredEvents.push({
        search_category: "events",
        event_title: currEvent.eventTitle,
      });
    }
  });
  filteredEvents.sort((a, b) => b.createdAt - a.createdAt);
  searchResult = [...filterdUsers, ...filteredEvents];
  return searchResult;
};
