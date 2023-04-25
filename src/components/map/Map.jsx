import React from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import map from '../../data/mapa.json'
import Spot from './Spot'

const Map = () => {
  const entrance = [-17.393026872868276, -66.14659755100136]

  return (
    <MapContainer
      center={[-17.3930013842986, -66.14623643675405]}
      zoom={20}
      minZoom={19}
      maxZoom={21}
      scrollWheelZoom={false}
      style={{ height: '600px', width: '1000px' }}
    >
      <TileLayer
        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        accessToken="pk.eyJ1Ijoiam9lbHNvbGl6IiwiYSI6ImNsZ3Rpb3BlMTIzZHUzZW50bzg3OTJmY28ifQ.1Ci87mtjNKtbTJNrNoRyJw"
        id="mapbox/streets-v12"
        tileSize={512}
        zoomOffset={-1}
        minZoom={19}
        maxZoom={21}
      />
      {map.features.map((feature) => (
        <Spot value={feature} key={feature.properties.id} />
      ))}
      <Marker
        position={entrance}
        icon={L.icon({
          iconUrl: '/icon-entrada.png',
          iconSize: [40, 40],
        })}
      >
        <Popup>Entrada y Salida</Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map
