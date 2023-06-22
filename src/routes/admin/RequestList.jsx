import React, { useEffect } from 'react'
import { Typography, Box } from '@mui/material'
import Layout from '../../components/Layout/Layout'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { useDispatch, useSelector } from 'react-redux'
import {
  getReservation,
  getReservations,
  reservationsSelector,
} from '../../store/slices/reservations'
import RequestDetail from './components/RequestDetail'
import { StringParam, useQueryParam } from 'use-query-params'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const columns = [
  { id: 'id', label: 'Reservación', minWidth: 100 },
  { id: 'cliente', label: 'Usuario', minWidth: 100 },
  { id: 'start_date', label: 'Fecha de Inicio', minWidth: 100 },
  { id: 'end_date', label: 'Fecha de Fin', minWidth: 100 },
]

const RequestList = () => {
  const { reservations, total, loading } = useSelector(reservationsSelector)
  const dispatch = useDispatch()
  const [modal] = useQueryParam('modal', StringParam)
  const [reservationId] = useQueryParam('reservation-id', StringParam)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(7)
  const [openModal, setOpenModal] = React.useState(false)
  const [filter, setFilter] = React.useState('')

  useEffect(() => {
    if (reservationId) {
      dispatch(getReservation(reservationId))
      setOpenModal(modal === 'open')
    }
  }, [])

  useEffect(() => {
    dispatch(getReservations({ page: page + 1, filter }))
  }, [page, filter])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleChange = (event) => {
    setFilter(event.target.value)
    setPage(0)
  }

  return (
    <Layout title="Lista de Solicitudes">
      <RequestDetail
        open={openModal}
        onClose={() => {
          setOpenModal(false)
        }}
      />
      <Box
        alignItems="center"
        justifyContent="center"
        backgroundColor="#fffffe"
        width="100%"
        marginTop={3}
        marginX={3}
      >
        <Box
          sx={{
            display: 'flex',
            paddingLeft: '39px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h3" color={'black'}>
            Lista de Solicitudes
          </Typography>
          <Box sx={{ paddingRight: '140px' }}>
            <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <InputLabel
                id="demo-simple-select-standard-label"
                style={{ color: 'black' }}
              >
                Mostrar
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={filter}
                onChange={handleChange}
                label="Estado"
              >
                <MenuItem value={''}>Todos</MenuItem>
                <MenuItem value={'Reserved'}>Pendientes</MenuItem>
                <MenuItem value={'Occupied'}>Aceptados</MenuItem>
                <MenuItem value={'Available'}>Rechazados</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Paper
          sx={{
            width: '85%',
            overflow: 'auto',
            backgroundColor: '#90b4ce',
            marginLeft: 5,
            marginY: 3,
            border: 2,
          }}
          style={{ borderColor: '#094067' }}
        >
          {loading !== 'pending' && reservations?.length === 0 ? (
            <Typography padding="10px">
              No existen solicitudes registradas en este momento.
            </Typography>
          ) : (
            <>
              <TableContainer sx={{ maxHeight: 500 }}>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  style={{ backgroundColor: '#fffffe' }}
                >
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            backgroundColor: '#90b4ce',
                            fontWeight: 'bold',
                            fontSize: '15px',
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reservations.map(({ reservation, status }) => {
                      const rowStyle =
                        status === 'Occupied'
                          ? { backgroundColor: '#D0FFFF' }
                          : status === 'Available'
                            ? { backgroundColor: '#D98880' }
                            : {}
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={reservation.id_reservation}
                          onClick={() => {
                            dispatch(getReservation(reservation.id_reservation))
                            setOpenModal(true)
                          }}
                          style={rowStyle}
                        >
                          <TableCell>{reservation.id_reservation}</TableCell>
                          <TableCell>
                            {`${reservation.customer.name} ${reservation.customer.last_name}`}
                          </TableCell>
                          <TableCell>
                            {new Date(
                              reservation.start_date + ' EST',
                            ).toLocaleDateString('es-ES')}
                          </TableCell>
                          <TableCell>
                            {new Date(
                              reservation.end_date + ' EST',
                            ).toLocaleDateString('es-ES')}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[7]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Paper>
      </Box>
    </Layout>
  )
}

export default RequestList
