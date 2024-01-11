document.addEventListener('DOMContentLoaded', function() {
    updateTime();
    fetchIP();
    fetchLocation();
    setInterval(updateTime, 1000);
});

function updateTime() {
    document.getElementById('time').textContent = 'Current Time: ' + new Date().toLocaleTimeString();
}

function fetchIP() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => document.getElementById('ip').textContent = 'Your IP: ' + data.ip);
}

function fetchLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        document.getElementById('location').textContent = 'Geolocation is not supported by this browser.';
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    document.getElementById('location').textContent = 'Your Location: Latitude: ' + lat + ', Longitude: ' + lon;

    // Fetch and display the address using reverse geocoding
    fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lon)
        .then(response => response.json())
        .then(data => document.getElementById('address').textContent = 'Your Address: ' + data.display_name);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('location').textContent = 'User denied the request for Geolocation.';
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('location').textContent = 'Location information is unavailable.';
            break;
        case error.TIMEOUT:
            document.getElementById('location').textContent = 'The request to get user location timed out.';
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('location').textContent = 'An unknown error occurred.';
            break;
    }
}
