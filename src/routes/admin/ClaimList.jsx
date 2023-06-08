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
import { useGetClaimsQuery } from '../../api/claim'
import ClaimDetail from './components/ClaimDetail'

const columns = [
  { id: 'cliente', label: 'Cliente', minWidth: 100 },
  { id: 'subject', label: 'Asunto', minWidth: 100 },
  { id: 'date', label: 'Fecha de registro', minWidth: 100 },
]

const RequestList = () => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(20)
  const { data, refetch } = useGetClaimsQuery({ page: page + 1 })
  const [openModal, setOpenModal] = React.useState(false)

  useEffect(() => {
    refetch()
  }, [page])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  return (
    <Layout title="Lista de reclamos">
      <ClaimDetail open={openModal} onClose={() => setOpenModal(false)} />
      <Box
        alignItems="center"
        justifyContent="center"
        backgroundColor="#fffffe"
        width="100%"
        marginTop={3}
        marginLeft={3}
      >
        <Typography variant="h3" color={'black'}>
          Reclamos
        </Typography>

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
          {!data?.result ? (
            <Typography padding="10px">
              No existen reclamos recibidos en este momento.
            </Typography>
          ) : (
            <>
              <TableContainer sx={{ maxHeight: 400 }}>
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
                    {data.result.map((claim, i) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={i}
                          onClick={() => {
                            setOpenModal(true)
                          }}
                        >
                          <TableCell>
                            {`${claim.customer.name} ${claim.customer.last_name}`}
                          </TableCell>
                          <TableCell>{claim.claim.subject}</TableCell>
                          <TableCell>
                            {new Date(
                              claim.claim.registration_date,
                            ).toLocaleDateString('es-ES')}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[20]}
                component="div"
                count={data?.total_elements || 0}
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
