import browserEnv from 'browser-env';


// Set the coordinates of your office location
const OFFICE_LAT = 30.1544394;
const OFFICE_LNG = 72.6978816;

// Set the maximum distance from your office location (in meters)
const MAX_DISTANCE = 100;

// Function to calculate the distance between two coordinates using the haversine formula
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lng2-lng1) * Math.PI/180;
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;
  return d;
}

// Function to check if you are in your office
function isInOffice(position) {
  const distance = calculateDistance(position.coords.latitude, position.coords.longitude, OFFICE_LAT, OFFICE_LNG);
  return distance <= MAX_DISTANCE;
}

// Function to handle success when getting the user's location
function handleSuccess(position) {
  if (isInOffice(position)) {
    // Perform the desired action (e.g. place a present on your desk)
    console.log("You are in your office!");
  }
}

// Function to handle errors when getting the user's location
function handleError(error) {
  console.log(error.message);
}

// Check if geolocation is supported by the browser
if ("geolocation" in navigator) {
  // Get the user's location
  navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
} else {
  console.log("Geolocation is not supported by this browser.");
}
