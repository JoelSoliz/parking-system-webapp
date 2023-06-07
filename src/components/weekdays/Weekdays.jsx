import React, { useState } from 'react';
import Color from 'color';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Card, Box } from '@mui/material'
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Layout from '../../components/Layout/Layout';
import { useGetWeekdayQuery } from '../../api/schedule';
import RegisterDate from './RegisterDate';

const useGridStyles = makeStyles(({ breakpoints }) => ({
    root: {
        [breakpoints.up('md')]: {
            justifyContent: 'center',
            align: "center",
        },
    },
}));

const useStyles = makeStyles(() => ({
    actionArea: {
        borderRadius: '15px',
        transition: '0.2s',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
    card: ({ color }) => ({
        Width: '50%',
        boxShadow: 'none',
        '&:hover': {
            boxShadow: `0 6px 12px 0 ${Color(color)
                .rotate(-12)
                .darken(0.2)
                .fade(0.5)}`,
        },
    }),
    content: {
        padding: '1rem 1rem 1rem',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
        textTransform: 'uppercase',
        align: "center",
    },
    subtitle: {
        color: '#000',
        opacity: 0.87,
        fontWeight: 500,
        fontSize: 14,
        marginY: 2,
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
        <CardActionArea className={classes.actionArea} onClick={onSelect}>
            <Card className={classes.card} style={{ borderRadius: '15px' }}>
                <CardMedia style={{ backgroundColor: '#203f52', padding: '1rem 1rem 1rem' }}>
                    <Typography className={classes.title} variant={'h2'}>
                        {convertDayToSpanish(title)}
                    </Typography>
                </CardMedia>
                <CardContent className={classes.content} style={{ backgroundColor: '#EBF2F5' }}>
                    <Typography className={classes.subtitle}><b>Inicio:</b> {subtitle}</Typography>
                    <Typography className={classes.subtitle}><b>Cierre:</b> {subtitle2}</Typography>

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
                    <Grid classes={gridStyles} container spacing={3}>
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
