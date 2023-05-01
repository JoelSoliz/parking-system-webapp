import { Box, Typography } from '@mui/material'
import React from 'react'
import { FeatureGroup, Polygon, Popup } from 'react-leaflet'

const Spot = ({ value }) => {
  const getFeatureStyle = (feature) => {
    const { properties } = feature

    if (properties.status === 'free') {
      return { fillColor: '#00ff00', color: 'black' }
    } else if (properties.status === 'reserved') {
      return { fillColor: '#0000ff', color: 'black' }
    } else {
      return { fillColor: '#ff0000', color: 'black' }
    }
  }
  const getStatus = (status) => {
    switch (status) {
      case 'assigned':
        return 'Asignado'
      case 'reserved':
        return 'Reservado'
      case 'free':
      default:
        return 'Libre'
    }
  }

  return (
    <FeatureGroup>
      <Popup>
        <Box>
          <Typography>
            <strong>Espacio:</strong> {value.properties.name}
          </Typography>
          <Typography>
            <strong>Estado:</strong> {getStatus(value.properties.status)}
          </Typography>
        </Box>
      </Popup>
      <Polygon
        positions={value.geometry.coordinates}
        {...getFeatureStyle(value)}
      />
    </FeatureGroup>
  )
}

export default Spot