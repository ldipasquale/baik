import axios from 'axios'

function geolocate() {
  return axios
    .post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.GOOGLE_KEY}`)
    .then(response => ({
      latitude: response.data.location.lat,
      longitude: response.data.location.lng,
    }))
}

export default {
  geolocate,
}
