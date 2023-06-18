import React from 'react'
import { Typography, Box, CardContent, Select, Grid, styled, CardMedia, Card } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Layout from '../../components/Layout/Layout'
import Color from 'color'

const useGridStyles = styled(({ breakpoints }) => ({
  root: {
    [breakpoints.up('md')]: {
      justifyContent: 'center',
      align: 'center',
    },
  },
}))

const useStyles = styled(() => ({
  content: {
    padding: '1rem 1rem 1rem',
  },
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
}
const Price = () => {
  const [type, setType] = React.useState('')
  const [hour, setHour] = React.useState('')
  const [day, setDay] = React.useState('')
  const [month, setMonth] = React.useState('')
  const handleHour = (event) => {
    setHour(event.target.value)
  }
  const handleType = (event) => {
    setType(event.target.value)
  }
  const handleDay = (event) => {
    setDay(event.target.value)
  }
  const handleMonth = (event) => {
    setMonth(event.target.value)
  }
  function total(hora, dia, mes, cost) {
    let costo
    if (hora != '' && dia == '' && mes == '') {
      costo = hora * cost
    } else {
      if (hora != '' && dia != '' && mes == '') {
        costo = hora * dia * cost
      } else {
        costo = hora * dia * mes * cost
      }
    }
    return costo
  }
  function precio(hour, day, month, type) {
    let costo
    if (type == 'privilegiado') {
      costo = total(hour, day, month, 6)
    }
    if (type == 'regular') {
      costo = total(hour, day, month, 4)
    }
    if (type == 'comun') {
      costo = total(hour, day, month, 2)
    }
    return costo
  }
  const gridStyles = useGridStyles()
  const styles = useStyles({ color: '#203f52' })

  const CustomCard = ({ classes, title, subtitle, subtitle2 }) => {
    return (
      <Card
        sx={{
          marginTop: '10%',
          borderRadius: '5px',
          width: '80%',
          height: '80%',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: `0 6px 5px 0 ${Color()
              .rotate(-12)
              .darken(0.2)
              .fade(0.2)}`,
          },
        }}
      >
        <CardMedia
          style={{ backgroundColor: '#203f52', padding: '0.5rem 1rem 0.5rem' }}
        >
          <Typography style={{ color: '#fff' }} variant="h6" fontWeight="bold">
            {title}
          </Typography>
        </CardMedia>
        <CardContent
          className={classes.content}
          style={{ backgroundColor: '#EBF2F5', padding: '1rem 0.8rem 1rem' }}
          sx={{ height: '80%' }}
        >
          <Typography>
            {subtitle}
          </Typography>
          <Typography paddingTop='5%' variant="h6">
            <b>Precio:</b> {subtitle2}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  //const total = precio() 
  return (
    <Layout title="price">
      <Box alignItems="center" justifyContent="center" marginY={8} width="90%">
        <Typography
          color="black"
          variant="h4"
          align="center"
          sx={{ marginY: -6, marginBottom: -1 }}
        >
          Precios de Estacionamiento
        </Typography>



        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            align="left"
            sx={{ m: 0, marginY: 2 }}
          >
            Los precios del estacionamiento varia según las
            siguientes categorias:
          </Typography>
          <Box align="center"
            display="flex"
            //alignItems="center"
            justifyContent="center"
            //marginY={5}
            width='100%'>
            <Grid
              classes={gridStyles}
              container
              spacing={3}
              justifyContent="center"
            >
              <Grid >
                <CustomCard
                  classes={styles}
                  title={'Privilegiada'}
                  subtitle={'Zona especial, ubicada cerca de la entrada/salida del estacionamiento.'}
                  subtitle2={'6 bs/hrs'}
                />
              </Grid>
            </Grid>
            <Grid
              classes={gridStyles}
              container
              spacing={3}
              justifyContent="center"
            >
              <Grid >
                <CustomCard
                  classes={styles}
                  title={'Regular'}
                  subtitle={'Zona disponible para todos los usuarios del estacionamiento de la institución.'}
                  subtitle2={'4bs/hrs'}
                />
              </Grid>
            </Grid>
            <Grid
              classes={gridStyles}
              container
              spacing={3}
              justifyContent="center"
            >
              <Grid >
                <CustomCard
                  classes={styles}
                  title={'Común'}
                  subtitle={'Zona diaponible para cualquier usuario, ubicada en la parte final del estacionamiento, sin ningun tipo de beneficio.'}
                  subtitle2={'3 bs/hrs'}
                />
              </Grid>
            </Grid>
          </Box>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            marginTop={6}
            align="center"
            justifyContent="center"
          >
            <div>
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Categoria
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={type}
                  label="Catregoria"
                  onChange={handleType}
                  MenuProps={MenuProps}
                >
                  <MenuItem value={'privilegiado'}>Privilegiado</MenuItem>
                  <MenuItem value={'regular'}>Regular</MenuItem>
                  <MenuItem value={'comun'}>Comun</MenuItem>
                </Select>
                <FormHelperText></FormHelperText>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Horas
                </InputLabel>
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
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Dias
                </InputLabel>
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
                <InputLabel id="demo-simple-select-helper-label">
                  Meses
                </InputLabel>
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
          <Box marginTop={4} align="center">
            <Typography
              sx={{
                display: 'inline',
                p: 1,
                m: 1,
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? '#101010' : '#fff',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.800' : '#000',
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
              }}
            >
              TOTAL Bs. {precio(hour, day, month, type)}
            </Typography>
          </Box>
        </CardContent>
      </Box>
    </Layout>
  )
}

export default Price
