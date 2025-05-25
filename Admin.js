document.getElementById('shareLocation').addEventListener('click', () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
  
          fetch("https://api.sheetbest.com/sheets/9fa4b131-6e2a-4561-9d58-1d02c09af17e", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              Latitude: lat,
              Longitude: lng,
              Timestamp: new Date().toISOString()
            })
          })
          .then(res => res.json())
          .then(() => {
            document.getElementById('adminMessage').innerHTML = "✅ Location shared successfully!";
          })
          .catch(() => {
            document.getElementById('adminMessage').innerHTML = "❌ Failed to share location.";
          });
        },
        (error) => {
          document.getElementById('adminMessage').innerHTML = "❌ Failed to get your location.";
          console.error("Geolocation error:", error);
        }
      );
    } else {
      alert("Geolocation not supported.");
    }
  });
  