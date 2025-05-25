const map = L.map('map').setView([39.0458, -76.6413], 8); // Maryland center

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

// Custom icon using local image
const icon = L.icon({
  iconUrl: 'image.png', // Must be in same folder as map.html
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50]
});

// Fetch latest location from SheetBest
fetch("https://api.sheetbest.com/sheets/9fa4b131-6e2a-4561-9d58-1d02c09af17e")
  .then(response => response.json())
  .then(data => {
    if (data.length === 0) {
      throw new Error("No location data found");
    }

    const latest = data[data.length - 1];
    const lat = parseFloat(latest.Latitude);
    const lng = parseFloat(latest.Longitude);

    const map = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lng]).addTo(map)
      .bindPopup("📍 Kona Ice is here!")
      .openPopup();
  })
  .catch(error => {
    console.error(error);
    document.getElementById("map").innerHTML = "No location data found";
  });
