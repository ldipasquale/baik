import axios from 'axios'
import geolib from 'geolib'

import statusValues from 'constants/status'

import { mapEstadoToStatus } from 'util/status'
import { gkbaToCoordinates } from 'util/coordinates'

function fetch(id) {
  return axios
    .get(`http://epok.buenosaires.gob.ar/getObjectContent/?id=${id}`)
    .then(response => response.data.contenido)
    .then(data => ({
      id,
      name: data[0].valor,
      address: data[2].valor,
      availableBikes: parseInt(data[3].valor, 10) || 0,
      slots: parseInt(data[4].valor, 10) || 0,
      pictureUrl: data[7].valor,
    }))
}

function fetchAll() {
  return axios
    .get('http://epok.buenosaires.gob.ar/getGeoLayer/?categoria=estaciones_de_bicicletas&estado=*&formato=geojson')
    .then(response => response.data.features.map(station => ({
      id: station.properties.Id,
      name: station.properties.Nombre,
      status: mapEstadoToStatus(station.properties.Estado),
      coordinates: gkbaToCoordinates(station.geometry.coordinates[0], station.geometry.coordinates[1]),
    })))
}

function findNearest(currentPosition, stations) {
  const availableStations = stations
    .filter(station => station.availableBikes > 0 && station.status === statusValues.AVAILABLE)

  const nearestStation = geolib.findNearest(currentPosition, availableStations.map(station => station.coordinates))

  if (nearestStation) {
    return availableStations[nearestStation.key]
  }

  return null
}

export default {
  fetchAll,
  fetch,
  findNearest,
}
