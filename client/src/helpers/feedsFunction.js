import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import ALTERNATE_IMG from "../icons/alternate_img.webp";

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

export const prepopulateFeedsImage = async (images) => {
  let allImages = [];
  images.forEach((image) => {
    let currImage = new Image();
    currImage.src = image;
    allImages.push(
      new Promise((res, rej) => {
        currImage.onload = () => {
          res(currImage.src);
        };
        currImage.onerror = () => {
          rej(ALTERNATE_IMG);
        };
      })
    );
  });
  let preLoadedImages = await Promise.all(allImages);
  return preLoadedImages;
};

export const getAllStories = async (userEmail) => {
  let followingUsers = [];
  const followingQuery = query(
    collection(db, "meet_follower_following"),
    where("follower", "==", userEmail)
  );
  const followingQuerySnapShot = await getDocs(followingQuery);
  followingQuerySnapShot.forEach((doc) => {
    followingUsers.push(doc.data());
  });
  let filteredFollowingUsers = [];
  followingUsers.forEach((f) => {
    filteredFollowingUsers.push(f.following);
  });
  if (filteredFollowingUsers.length === 0) return [{ isEmpty: true }];

  const storyQuery = query(
    collection(db, "meet_story"),
    where("user_name", "in", filteredFollowingUsers)
  );
  let storyQuerySnapShot = await getDocs(storyQuery);
  let storiesDetails = [];
  storyQuerySnapShot.forEach((doc) => {
    storiesDetails.push(doc.data());
  });
  let filteredStoriesDetails = storiesDetails.filter(
    (story) => story.story_post_time >= Date.now() - 24 * 60 * 60 * 1000
  );
  let storiesWithUserDetails = [];
  filteredStoriesDetails.forEach((s) => {
    storiesWithUserDetails.push(
      new Promise((res, rej) => {
        const userQuery = query(
          collection(db, "meet_users"),
          where("user_name", "==", s.user_name)
        );
        getDocs(userQuery)
          .then((response) => {
            let userQuerySnapShot = response;
            userQuerySnapShot.forEach((doc) => {
              res({
                ...s,
                user_name: doc.data().user_name,
                user_photo: doc.data().user_photo,
              });
            });
          })
          .catch((err) => rej(err));
      })
    );
  });
  let finalStoriesAndUserDetails = await Promise.all(storiesWithUserDetails);
  if (finalStoriesAndUserDetails.length === 0) {
    finalStoriesAndUserDetails.push({ isEmpty: true });
  } else {
    finalStoriesAndUserDetails.push({ isEmpty: false });
  }
  return finalStoriesAndUserDetails;
};
