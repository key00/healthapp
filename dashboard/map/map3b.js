/**
 * Create google maps Map instance.
 * @param {number} lat
 * @param {number} lng
 * @return {Object}
 */
const createMap = ({ lat, lng }) => {
  return new google.maps.Map(document.getElementById('map'), {
    center: { lat, lng },
    zoom: 15
  });
};

/**
 * Create google maps Marker instance.
 * @param {Object} map
 * @param {Object} position
 * @return {Object}
 */
const createMarker = ({ map, position }) => {
  return new google.maps.Marker({ map, position });
};

/**
 * Track the user location.
 * @param {Object} onSuccess
 * @param {Object} [onError]
 * @return {number}
 */
const trackLocation = ({ onSuccess, onError = () => { } }) => {
  if ('geolocation' in navigator === false) {
    return onError(new Error('Geolocation is not supported by your browser.'));
  }

  return navigator.geolocation.watchPosition(onSuccess, onError, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  });
};

/**
 * Get position error message from the given error code.
 * @param {number} code
 * @return {String}
 */
const getPositionErrorMessage = code => {
  switch (code) {
    case 1:
      return 'Permission denied.';
    case 2:
      return 'Position unavailable.';
    case 3:
      return 'Timeout reached.';
  }
}

/**
 * Send the user's current coordinates to the server to get nearby hospitals
 * @param {number} lat
 * @param {number} lng
 */
const getNearbyHospitals = (lat, lng) => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "api/coord_handler.php", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const hospitals = JSON.parse(xhr.responseText);
      hospitals.forEach(hospital => {
        new google.maps.Marker({
          position: { lat: hospital.lat, lng: hospital.lng },
          map: map
        });
      });
    }
  };
  xhr.send(JSON.stringify({ lat, lng }));
};

/**
 * Initialize the application.
 * Automatically called by the google maps API once it's loaded.
*/
function init() {
  let initialPosition;

  navigator.geolocation.getCurrentPosition(
    ({ coords: { latitude: lat, longitude: lng } }) => {
      initialPosition = { lat, lng };
      const map = createMap(initialPosition);
      const marker = createMarker({map, position: initialPosition });
const $info = document.getElementById('info');

  // call the getNearbyHospitals function with the user's current coordinates
  getNearbyHospitals(lat, lng);

  let watchId = trackLocation({
    onSuccess: ({ coords: { latitude: lat, longitude: lng } }) => {
      marker.setPosition({ lat, lng });
      map.panTo({ lat, lng });
      $info.textContent = `Lat: ${lat.toFixed(5)} Lng: ${lng.toFixed(5)}`;
      $info.classList.remove('error');

      // call the getNearbyHospitals function with the updated coordinates
      getNearbyHospitals(lat, lng);
    },
    onError: err => {
      $info.textContent = `Error: ${err.message || getPositionErrorMessage(err.code)}`;
      $info.classList.add('error');
    }
  });
},
err => {
  console.error("Error getting current position", err);
});
}

