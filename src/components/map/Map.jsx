import React, { useState } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Box } from '@mui/material'
import { useGetSpotsQuery } from '../../api/parking'
import Spot from './Spot'
import SelectedSpot from './SelectedSpot'

const Map = () => {
  const { data } = useGetSpotsQuery()
  const [selected, setSelected] = useState(null)
  const entrance = [-17.393026872868276, -66.14659755100136]

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap="30px"
      flexWrap="wrap"
    >
      <MapContainer
        center={[-17.3930013842986, -66.14623643675405]}
        zoom={20}
        minZoom={19}
        maxZoom={21}
        scrollWheelZoom={false}
        style={{
          height: '550px',
          width: '900px',
          border: 'solid rgb(9, 64, 103)',
          borderRadius: '20px',
        }}
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
        {data?.map((spot) => (
          <Spot
            value={spot}
            key={spot.id_spot}
            onSelect={() => setSelected(spot.id_spot)}
          />
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
      {!!selected && (
        <SelectedSpot id={selected} onClose={() => setSelected(null)} />
      )}
    </Box>
  )
}

export default Map
