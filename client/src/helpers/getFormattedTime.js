export const getTimeStamp = (time) => {
  const diffTime = Date.now() - time;

  let seconds = Math.floor(diffTime / 1000);
  let minutes = Math.floor(diffTime / (1000 * 60));
  let hours = Math.floor(diffTime / (1000 * 60 * 60));
  let days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  let months = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
  let year = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30 * 12));
  if (seconds === 0) {
    return "just now";
  } else if (minutes === 0) return `${seconds} seconds ago.`;
  else if (hours === 0) return `${minutes} minutes ago`;
  else if (days === 0) return `${hours} hours ago`;
  else if (months === 0) return `${days} days ago`;
  else if (year === 0) return `${months} months ago`;
  return `${year} year ago`;
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
