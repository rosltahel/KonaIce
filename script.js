const form = document.getElementById('alertForm');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const zip = document.getElementById('zip').value;
  const email = document.getElementById('email').value;

  fetch("https://api.sheetbest.com/sheets/3d8a7fe8-b5af-4a12-8c04-1646bb8a1e1c", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      Zip: zip,
      Email: email
    })
  })
  .then(response => response.json())
  .then(data => {
    messageDiv.innerHTML = `✅ Thanks! You’ll get notified when Kona Ice is near ZIP code ${zip}.`;

    // Redirect to map after 2 seconds
    setTimeout(() => {
      window.open("https://www.google.com/maps/search/kona+ice+truck+near+me", "_blank");
    }, 2000);

    form.reset();
  })
  .catch(error => {
    messageDiv.innerHTML = `❌ Something went wrong. Please try again.`;
    console.error("Error:", error);
  });
});
