import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { NoteAlt, Info } from '@mui/icons-material'
import { FeatureGroup, Polygon, Popup } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'

const Spot = ({ value, onSelect }) => {
  const navigate = useNavigate()

  return (
    <FeatureGroup>
      <Popup>
        <Box sx={{ '&>p': { margin: '0' } }}>
          <Typography>
            <strong>Espacio:</strong> {value.name}
          </Typography>
          {/* <Typography>
            <strong>Sección:</strong>{' '}
            {value.section.slice(0, 1).toUpperCase() + value.section.slice(1)}
          </Typography> */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<NoteAlt />}
              onClick={() => navigate(`/request/${value.id_spot}`)}
              style={{ textTransform: 'none' }}
            >
              Solicitar
            </Button>
            <Button
              variant="contained"
              color="info"
              startIcon={<Info />}
              onClick={() => onSelect()}
              style={{ textTransform: 'none' }}
            >
              Ver detalles
            </Button>
          </Box>
        </Box>
      </Popup>
      <Polygon
        positions={JSON.parse(value.coordinate)}
        fillColor="#5090ff"
        color="black"
      />
    </FeatureGroup>
  )
}

export default Spot
