import React, { useState } from 'react';
import Color from 'color';
import { Card, Box, CardActionArea, CardContent, CardMedia, Typography, Grid, styled } from '@mui/material'
import Layout from '../../components/Layout/Layout';
import { useGetWeekdayQuery } from '../../api/schedule';
import RegisterDate from './RegisterDate';

const useGridStyles = styled(({ breakpoints }) => ({
    root: {
        [breakpoints.up('md')]: {
            justifyContent: 'center',
            align: "center",
        },
    },
}));

const useStyles = styled(() => ({
    content: {
        padding: '1rem 1rem 1rem',
    },
}));

function convertDayToSpanish(day) {
    switch (day.toLowerCase()) {
        case 'monday':
            return 'Lunes';
        case 'tuesday':
            return 'Martes';
        case 'wednesday':
            return 'Miércoles';
        case 'thursday':
            return 'Jueves';
        case 'friday':
            return 'Viernes';
        case 'saturday':
            return 'Sábado';
        default:
            return 'Invalid day';
    }
}

const CustomCard = ({ classes, title, subtitle, subtitle2, onSelect }) => {
    return (
        <CardActionArea onClick={onSelect} sx={{
            borderRadius: '15px',
            transition: '0.2s',
            '&:hover': {
                transform: 'scale(1.1)',
            },
        }}
        >
            <Card sx={{
                borderRadius: '10px', width: '100%',
                boxShadow: 'none',
                '&:hover': {
                    boxShadow: `0 6px 12px 0 ${Color()
                        .rotate(-12)
                        .darken(0.2)
                        .fade(0.5)}`,
                },
            }} >
                <CardMedia style={{ backgroundColor: '#203f52', padding: '1rem 1rem 1rem' }}>
                    <Typography style={{ color: '#fff' }} variant="h5" fontWeight="bold" >
                        {convertDayToSpanish(title)}
                    </Typography>
                </CardMedia>
                <CardContent className={classes.content} style={{ backgroundColor: '#EBF2F5' }}>
                    <Typography ><b>Inicio:</b> {subtitle}</Typography>
                    <Typography ><b>Cierre:</b> {subtitle2}</Typography>

                </CardContent>
            </Card>
        </CardActionArea>
    );
};

const Weekdays = ({ isEditable = false }) => {

    const { data, refetch } = useGetWeekdayQuery()
    const gridStyles = useGridStyles();
    const styles = useStyles({ color: '#203f52' });
    const [open, setOpen] = useState(null)


    return (
        <Layout title="registerSchedule">
            {isEditable && <RegisterDate open={!!open}
                onClose={() => setOpen(null)}
                inivalue={open}
                onChange={() => {
                    refetch()
                    setOpen(null)
                }}
            />}
            <Box align="center" alignItems="center" justifyContent="center" marginY={5} >
                <Card sx={{

                    width: '70%',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 4,
                    borderRadius: '15px',
                    border: 2,
                    paddingY: 3,
                    paddingX: 2,

                }}
                    style={{ borderColor: '#90b4ce' }}
                >
                    <Grid classes={gridStyles} container spacing={3} justifyContent='center'>
                        {data?.map((day, i) => (
                            <Grid item key={i}>
                                <CustomCard
                                    classes={styles}
                                    title={day.days}
                                    subtitle={day.openning_time}
                                    subtitle2={day.clousing_time}
                                    onSelect={() => setOpen(day)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Card>
            </Box>

        </Layout >
    )
}

export default Weekdays
