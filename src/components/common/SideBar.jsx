import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function SideBar({ children }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: '#094067', display: 'flex', height: '100vh', marginTop: 8 }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 2, borderColor: 'divider', width: '20%' }}
                style={{ fontWeight: 'bold', color: '#3da9fc' }}
            >
                <Tab label="Solicitudes" {...a11yProps(0)} sx={{
                    fontWeight: 'bold',
                    color: '#3da9fc',
                    '&:hover': {
                        backgroundColor: '#3da9fc', // Cambia el color de fondo al hacer hover
                        color: '#fff', // Cambia el color del texto al hacer hover
                        fontWeight: 'bold',
                    },
                }} />
                <Tab label="Usuarios" {...a11yProps(1)} sx={{
                    fontWeight: 'bold',
                    color: '#3da9fc',
                    '&:hover': {
                        backgroundColor: '#3da9fc', // Cambia el color de fondo al hacer hover
                        color: '#fff', // Cambia el color del texto al hacer hover
                        fontWeight: 'bold',
                    },
                }} />
            </Tabs>
            <Box sx={{ p: 1, bgcolor: '#fffffe', width: '100%' }}>
                {children}
            </Box>
        </Box>
    );
}