export const getUserCurrentLocation = async (latitude, longitude) => {
  let res = await fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${
      import.meta.env.VITE_USER_CURRENT_LOCATION
    }`
  );
  res = await res.json();
  return res.features[0].properties.city;
};

export const trimEventLocationString = (location) => {
  if (location.length <= 65) return location;
  return location.substring(0, 66) + "...";
};
