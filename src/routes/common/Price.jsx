import React from 'react'
import { Typography, Box, CardContent, Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Layout from '../../components/Layout/Layout'
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 200
        },
    },
};
const Price = () => {
    const [hour, setHour] = React.useState('');
    const [day, setDay] = React.useState('');
    const [month, setMonth] = React.useState('');
    const handleHour = (event) => {
        setHour(event.target.value);
    };
    const handleDay = (event) => {
        setDay(event.target.value);
    };
    const handleMonth = (event) => {
        setMonth(event.target.value);
    };
    function precio(hora, dia, mes) {
        let costo
        if (hora != '' && dia == '' && mes == '') {
            costo = hora * 3
        } else {
            costo = hora * dia * mes * 3

        }


        return costo
    }
    const total = precio(hour, day, month)
    return (
        <Layout title="price">
            <Box alignItems="center"
                justifyContent="center"
                marginY={8} width="90%">

                <Typography color="black" variant="h4" align="center" sx={{ marginY: 2 }}>
                    Precios de Estacionamiento
                </Typography>

                <CardContent >
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        align='left'
                        sx={{ m: 0 }}
                    >
                        Averigue el costo de estacionamiento en los parqueos de San Simon
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        align='left'
                        sx={{ m: 0, marginTop: 1 }}
                    >
                        1 Hora: 3 bs.
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        marginTop={4}
                        align="center"
                        justifyContent="center"
                    >
                        <div>
                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <InputLabel id="demo-simple-select-helper-label">Horas</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={hour}
                                    label="Horas"
                                    onChange={handleHour}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem value={1}>1 hr</MenuItem>
                                    <MenuItem value={1.5}>1,5 hr</MenuItem>
                                    <MenuItem value={2}>2 hr</MenuItem>
                                    <MenuItem value={2.5}>2,5 hr</MenuItem>
                                    <MenuItem value={3}>3 hr</MenuItem>
                                    <MenuItem value={3.5}>3,5 hr</MenuItem>
                                    <MenuItem value={4}>4 hr</MenuItem>
                                    <MenuItem value={4.5}>4,5 hr</MenuItem>
                                    <MenuItem value={5}>5 hr</MenuItem>
                                    <MenuItem value={5.5}>5,5 hr</MenuItem>
                                    <MenuItem value={6}>6 hr</MenuItem>
                                    <MenuItem value={6.5}>6,5 hr</MenuItem>
                                    <MenuItem value={7}>7 hr</MenuItem>
                                    <MenuItem value={7.5}>7,5 hr</MenuItem>
                                    <MenuItem value={8}>8 hr</MenuItem>
                                    <MenuItem value={8.5}>8,5 hr</MenuItem>
                                    <MenuItem value={9}>9 hr</MenuItem>
                                    <MenuItem value={9.5}>9,5 hr</MenuItem>
                                    <MenuItem value={10}>10 hr</MenuItem>
                                </Select>
                                <FormHelperText></FormHelperText>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 200 }} >
                                <InputLabel id="demo-simple-select-helper-label">Dias</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={day}
                                    label="Dias"
                                    onChange={handleDay}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={9}>9</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={11}>11</MenuItem>
                                    <MenuItem value={12}>12</MenuItem>
                                    <MenuItem value={13}>13</MenuItem>
                                    <MenuItem value={14}>14</MenuItem>
                                    <MenuItem value={15}>15</MenuItem>
                                    <MenuItem value={16}>16</MenuItem>
                                    <MenuItem value={17}>17</MenuItem>
                                    <MenuItem value={18}>18</MenuItem>
                                    <MenuItem value={19}>19</MenuItem>
                                    <MenuItem value={20}>20</MenuItem>
                                    <MenuItem value={21}>21</MenuItem>
                                    <MenuItem value={22}>22</MenuItem>
                                    <MenuItem value={23}>23</MenuItem>
                                    <MenuItem value={24}>24</MenuItem>
                                    <MenuItem value={25}>25</MenuItem>
                                </Select>
                                <FormHelperText></FormHelperText>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <InputLabel id="demo-simple-select-helper-label">Meses</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={month}
                                    label="Meses"
                                    onChange={handleMonth}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                </Select>
                                <FormHelperText></FormHelperText>
                            </FormControl>
                        </div>
                    </Box>
                    <Box

                        marginTop={4}
                        align="center"
                    >
                        <Typography sx={{
                            display: 'inline',
                            p: 1,
                            m: 1,
                            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                            color: (theme) =>
                                theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                            border: '1px solid',
                            borderColor: (theme) =>
                                theme.palette.mode === 'dark' ? 'grey.800' : '#000',
                            borderRadius: 2,
                            fontSize: '0.875rem',
                            fontWeight: '700',
                        }} >
                            TOTAL Bs. {total}
                        </Typography>
                    </Box>
                </CardContent>

            </Box>

        </Layout>
    )
}

export default Price