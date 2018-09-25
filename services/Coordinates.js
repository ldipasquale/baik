import axios from 'axios'

import googleConfig from 'config/google'

function geolocate() {
  return axios
    .post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${googleConfig.key}`)
    .then(response => ({
      latitude: response.data.location.lat,
      longitude: response.data.location.lng,
    }))
}

export default {
  geolocate,
}
