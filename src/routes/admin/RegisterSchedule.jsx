import React from 'react';
import { Box } from '@mui/material';
import Typography from '@material-ui/core/Typography';
import Layout from '../../components/Layout/Layout';
import Weekdays from '../../components/weekdays/Weekdays';


const RegisterSchedule = () => {

    return (
        <Layout title="Registrar horario">
            <Box align="center" justifyContent="center" marginY={3} marginX={10}
                marginLeft={3} width="100%">
                <Typography
                    variant="h3"
                    color='black'
                    align="left"
                >
                    Registro de horario
                </Typography>
                <Weekdays isEditable={true} />
            </Box>

        </Layout >
    )
}

export default RegisterSchedule
