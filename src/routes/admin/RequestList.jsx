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
    { id: 'cliente', label: 'Cliente', minWidth: 100 },
    { id: 'fecha', label: 'Fecha', minWidth: 100 },
    { id: 'hora', label: 'Hora', minWidth: 100 },
];

function createData(cliente, fecha, hora) {
    return { cliente, fecha, hora };
}

const rows = [
    createData('India', 'IN', '15:00'),
    createData('China', 'CN', '15:00'),
    createData('Italy', 'IT', '15:00'),
    createData('United States', 'US', '15:00'),
    createData('Canada', 'CA', '15:00'),
    createData('Australia', 'AU', '15:00'),
    createData('Germany', 'DE', '15:00'),
    createData('Ireland', 'IE', '15:00'),
    createData('Mexico', 'MX', '15:00'),
    createData('Japan', 'JP', '15:00'),
    createData('France', 'FR', '15:00'),
    createData('United Kingdom', '15:00'),
    createData('Russia', 'RU', '15:00'),
    createData('Nigeria', 'NG', '15:00'),
    createData('Brazil', 'BR', '15:00'),
];

const RequestList = () => {
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

            <Box alignItems="center" justifyContent="center" backgroundColor='#fffffe' width='100%' marginTop={3} marginLeft={3} >

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
                                            style={{ minWidth: column.minWidth, backgroundColor: '#90b4ce' }}
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

export default RequestList