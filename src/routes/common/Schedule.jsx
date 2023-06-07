import React from 'react';
import { Box, Typography } from '@mui/material'
import Layout from '../../components/Layout/Layout';
import Weekdays from '../../components/weekdays/Weekdays';


const Schedule = () => {

    return (
        <Layout title="schedule">
            <Box align="center" justifyContent="center" marginY={5} marginX={10}>
                <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    align="center"
                    sx={{ m: 0 }}
                >
                    Horarios de atención del Parqueo
                </Typography>
                <Weekdays />
            </Box>

        </Layout >
    )
}

export default Schedule
