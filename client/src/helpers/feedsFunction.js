import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// all feeds containing events and posts as well.
export const feedsPosts = async (category) => {
  if (!category) category = "recent";
  let postsDetails = [];
  let eventsDetails = [];
  let feeds = [];
  const postsQuery = query(collection(db, "meet_posts"));
  const postsQuerySnapShot = await getDocs(postsQuery);
  postsQuerySnapShot.forEach((doc) => {
    postsDetails.push(doc.data());
  });
  const eventQuery =
    category !== "recent"
      ? query(
          collection(db, "meet_events"),
          where("eventCategory", "==", category)
        )
      : query(collection(db, "meet_events"));
  const eventQuerySnapShot = await getDocs(eventQuery);
  eventQuerySnapShot.forEach((doc) => {
    eventsDetails.push(doc.data());
  });
  feeds =
    category === "recent"
      ? [...postsDetails, ...eventsDetails]
      : [...eventsDetails];
  feeds.sort((a, b) => b.createdAt - a.createdAt);

  feeds.length === 0
    ? feeds.push({ isEmpty: true })
    : feeds.push({ isEmpty: false });
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
        event_id: currEvent.eventId,
      });
    }
  });
  filteredEvents.sort((a, b) => b.createdAt - a.createdAt);
  searchResult = [...filterdUsers, ...filteredEvents];
  return searchResult;
};
