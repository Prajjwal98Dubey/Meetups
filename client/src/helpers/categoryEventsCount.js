import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const getCategoryEventCount = async () => {
  let categoriesCount = await Promise.all([
    countForCategories("recent"),
    countForCategories("technology"),
    countForCategories("sports"),
    countForCategories("bike rides"),
  ]);
  return categoriesCount;
};

const countForCategories = (category) => {
  return new Promise((res, rej) => {
    try {
      const eventQuery =
        category !== "recent"
          ? query(
              collection(db, "meet_events"),
              where("eventCategory", "==", category)
            )
          : query(collection(db, "meet_events"));
      let count = 0;
      getDocs(eventQuery)
        .then((eventQuerySnapShot) => {
          eventQuerySnapShot.forEach(() => {
            count += 1;
          });
          res(count);
        })
        .catch((err) => console.log(err));
    } catch {
      rej(0);
    }
  });
};
