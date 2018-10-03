import React from 'react'
import GoogleMapReact from 'google-map-react';

import Station from 'components/Station'

import Stations from 'services/Stations'
import Coordinates from 'services/Coordinates'

import 'stylesheets/index.sass'

class Map extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isFetching: true,
      stations: [],
      nearestStation: {},
      centerCoordinates: {
        lat: -34.604722,
        lng: -58.398592,
      },
      zoom: 13,
    }
  }

  componentDidMount() {
    Stations.fetchAll().then((stations) => {
      const stationsDetailsPromises = []

      this.setState({
        stations,
        isFetching: false,
      }, () => {
        stations.forEach((station, stationIndex) => stationsDetailsPromises.push(Stations.fetch(station.id)
          .then((stationDetails) => {
            const newStations = [...this.state.stations]

            newStations[stationIndex] = {
              ...station,
              ...stationDetails,
            }

            this.setState({ stations: newStations })
          })))

        Promise.all(stationsDetailsPromises).then(() => Coordinates.geolocate().then((currentPosition) => {
          const nearestStation = Stations.findNearest(currentPosition, this.state.stations)

          this.setState({ nearestStation })
        }))
      })
    })
  }

  render() {
    return (
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        {this.state.isFetching ? (
          <span>...</span>
        ) : (
          <GoogleMapReact
            defaultCenter={this.state.centerCoordinates}
            defaultZoom={this.state.zoom}
            bootstrapURLKeys={{
              key: process.env.GOOGLE_KEY,
            }}
          >
            {this.state.stations.map((station, stationIndex) => (
              <Station
                key={station.id}
                id={`station${stationIndex}`}
                lat={station.coordinates.latitude}
                lng={station.coordinates.longitude}
                name={station.name}
                availableBikes={station.availableBikes}
                slots={station.slots}
                status={station.status}
                highlighted={station.id === this.state.nearestStation.id}
              />
            ))}
          </GoogleMapReact>
        )}
      </div>
    )
  }
}

export default Map
