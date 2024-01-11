document.addEventListener('DOMContentLoaded', function() {
    updateTime();
    fetchGeolocationAndIP();
    setInterval(updateTime, 1000); // Update time every second
});

function updateTime() {
    const now = new Date();
    document.getElementById('time').innerHTML = 'Time: ' + now.toLocaleTimeString();
}

function fetchGeolocationAndIP() {
    // Fetch IP using an IP API
    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => document.getElementById('ip').innerHTML = 'IP: ' + data.ip)
    .catch(err => document.getElementById('ip').innerHTML = 'IP: Error fetching IP');

    // Fetch Geolocation
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            document.getElementById('location').innerHTML = 'Location: ' + position.coords.latitude + ', ' + position.coords.longitude;
        }, () => {
            document.getElementById('location').innerHTML = 'Location: Permission denied';
        });
    } else {
        document.getElementById('location').innerHTML = 'Location: Geolocation not supported';
    }
}
