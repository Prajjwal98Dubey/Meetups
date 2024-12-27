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
