// Initialize the map
const map = L.map('map').setView([39.8283, -98.5795], 4);

// Add the OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to generate random coordinates
function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

// Generate three sets of random coordinates
const coordinates = [
  { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
  { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
  { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) }
];

// Function to fetch locality data
async function fetchLocality(lat, lng) {
  const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
  const data = await response.json();
  return data.locality || "Locality not found";
}

// Place markers and display coordinates and locality information
coordinates.forEach(async (coord, index) => {
  // Add marker to map
  L.marker([coord.lat, coord.lng]).addTo(map);

  // Fetch and display locality information
  const locality = await fetchLocality(coord.lat, coord.lng);
  document.getElementById("output").innerHTML += `<p>Marker ${index + 1} (Coordinates: ${coord.lat}, ${coord.lng}) - Locality: ${locality}</p>`;
});
