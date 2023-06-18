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
  customersSelector,
  getCustomer,
  getCustomers,
} from '../../store/slices/customers'
import UserDetailsModal from './components/UserDetailsModal'

const columns = [
  { id: 'ci', label: 'CI', minWidth: 100 },
  { id: 'name', label: 'Nombre', minWidth: 100 },
  { id: 'last_name', label: 'Apellido', minWidth: 100 },
]


const UserList = () => {
  const { customers, total, loading } = useSelector(customersSelector)
  const dispatch = useDispatch()
  const [page, setPage] = React.useState(0)
  const [openModal, setOpenModal] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(7)

  useEffect(() => {
    dispatch(getCustomers(page + 1))
  }, [page])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  return (
    <Layout title="Lista de Usuarios">
      <UserDetailsModal open={openModal} onClose={() => setOpenModal(false)} />
      <Box
        alignItems="center"
        justifyContent="center"
        marginY={5}
        width="100%"
        marginTop={3}
        marginLeft={3}
      >
        <Box
          sx={{
            display: 'flex',
            paddingLeft: '39px',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" color={'black'}>
            Lista de Clientes
          </Typography>
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
          {loading !== 'pending' && customers?.length === 0 ? (
            <Typography padding="10px">
              No existen usuarios registrados en este momento.
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
                    {customers.map((customer) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={customer.id_customer}
                          onClick={() => {
                            dispatch(getCustomer(customer.id_customer))
                            setOpenModal(true)
                          }}
                        >
                          {columns.map((column) => {
                            const value = customer[column.id]
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            )
                          })}
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                labelRowsPerPage="Filas por pagina  "
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

export default UserList
