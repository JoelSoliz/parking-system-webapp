import React from 'react'
import { Typography, Box } from '@mui/material'
import Layout from '../../components/Layout/Layout'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
    { id: 'ci', label: 'CI', minWidth: 100, },
    { id: 'nombre', label: 'Nombre', minWidth: 100 },
    { id: 'apellido', label: 'Apelllido', minWidth: 100 },
];

function createData(ci, nombre) {
    return { ci, nombre };
}

const rows = [
    createData('India', 'IN'),
    createData('China', 'CN'),
    createData('Italy', 'IT'),
    createData('United States', 'US'),
    createData('Canada', 'CA'),
    createData('Australia', 'AU'),
    createData('Germany', 'DE'),
    createData('Ireland', 'IE'),
    createData('Mexico', 'MX'),
    createData('Japan', 'JP'),
    createData('France', 'FR'),
    createData('United Kingdom'),
    createData('Russia', 'RU'),
    createData('Nigeria', 'NG'),
    createData('Brazil', 'BR'),
];

const UserList = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Layout title="UserList">

            <Box alignItems="center" justifyContent="center" marginY={5} backgroundColor='pink' width='100%' marginTop={3} marginLeft={3} >

                <Typography variant="body1" color={'black'} >
                    Welcome to Parking System frontend project.
                </Typography>

                <Paper sx={{ width: '85%', overflow: 'auto', backgroundColor: '#90b4ce', marginLeft: 5, marginY: 3, border: 2 }}
                    style={{ borderColor: '#094067' }}>

                    <TableContainer sx={{ maxHeight: 400 }}>
                        <Table stickyHeader aria-label="sticky table" style={{ backgroundColor: '#fffffe' }} >
                            <TableHead >
                                <TableRow >
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, backgroundColor: '#90b4ce', fontWeight: 'bold', fontSize: '15px' }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        labelRowsPerPage="Filas por pagina  "
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </Layout >
    )
}

export default UserList