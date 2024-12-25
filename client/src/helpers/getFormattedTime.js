export const getTimeStamp = (time) => {
  const diffTime = Date.now() - time;
  const seconds = diffTime / 1000;
  if (Math.floor(seconds) === 0) {
    return "just now";
  }
  const minutes = seconds / 60;
  if (Math.floor(minutes) === 0) {
    return Math.round(seconds) + " seconds ago";
  }
  const hours = minutes / 60;
  if (Math.floor(hours) === 0) {
    return Math.round(minutes) + " minutes ago";
  }
  const day = hours / 24;
  if (Math.floor(day) === 0) {
    return Math.round(hours) + " hours ago";
  }
  return Math.round(day) + " day ago";
};

export const timeDiffEndTimeToToday = (endTime) => {
  return new Date(endTime).getTime() - Date.now();
};

export const isEventLive = (startTime, endTime) => {
  const updatedStartTime = new Date(startTime).getTime();
  const updatedEndTime = new Date(endTime).getTime();
  const currTime = Date.now();
  if (updatedStartTime <= currTime && updatedEndTime > currTime) return true;
  return false;
};
