document.addEventListener('DOMContentLoaded', function() {
    updateWeather();
    updateTime();
    fetchAndSendData();
    setInterval(updateTime, 1000); // Update time every second
    setInterval(updateWeather, 600000); // Update weather every 10 minutes
});

function updateWeather() {
    // Add your weather API call here
}

function updateTime() {
    const now = new Date();
    document.getElementById('time').innerHTML = 'Time: ' + now.toLocaleTimeString();
}

function fetchAndSendData() {
    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(ipData => {
        document.getElementById('ip').innerHTML = 'IP: ' + ipData.ip;
        navigator.geolocation.getCurrentPosition(position => {
            const data = {
                ip: ipData.ip,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            sendDataToBackend(data);
        });
    });
}

function sendDataToBackend(data) {
    fetch('YOUR_BACKEND_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}
