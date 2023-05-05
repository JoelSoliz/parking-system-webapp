import React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { FormControl } from '@mui/material'

const CalendarPicker = () => {
  const today = dayjs()
  const fechaMax = () => {
    const gestion1 = dayjs('2023-06-30T00:00:00.000')
    const gestion2 = dayjs('2023-12-31T00:00:00.000')

    if (dayjs().month() < 6) {
      return gestion1
    } else {
      return gestion2
    }
  }
  const isWeekend = (date) => {
    const day = date.day()
    return day === 0
  }
  const [selectedDateStart, setSelectedDateStart] = React.useState(null)

  const [selectedDateEnd, setSelectedDateEnd] = React.useState(null)

  const handleSetError = (newError) => {
    if (newError) {
      setError(newError)
    } else if (
      (selectedDateEnd < selectedDateStart ||
        selectedDateEnd == selectedDateStart) &&
      !error?.includes('end-date-before-start-date')
    ) {
      setError('end-date-before-start-date')
    } else if (
      (selectedDateEnd == null || selectedDateStart == null) &&
      !error?.includes('required')
    ) {
      setError('required')
    } else {
      setError(null)
    }
  }

  const [errorI, setErrorI] = React.useState(null)
  const [error, setError] = React.useState(null)

  const errorMessage = React.useMemo(() => {
    function getError(error) {
      switch (error) {
        case 'maxDate':
        case 'minDate': {
          return 'Seleccione una fecha correspondiente a la gestion actual.'
        }

        case 'invalidDate': {
          return 'Ingrese una fecha válida'
        }

        case 'end-date-before-start-date': {
          return 'La fecha de fin no puede ser anterior a la fecha de inicio.'
        }

        case 'required': {
          return 'Esta campo es obligatorio.'
        }
        default: {
          return ''
        }
      }
    }
    return getError
  }, [error])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl error={error}>
        <DemoContainer components={['DesktopDatePicker', 'DesktopDatePicker']}>
          <DesktopDatePicker
            label="Fecha de inicio"
            format="DD/MM/YYYY"
            value={selectedDateStart}
            onChange={(newValue) => setSelectedDateStart(newValue)}
            shouldDisableDate={isWeekend}
            minDate={today}
            maxDate={fechaMax()}
            onError={(newError) => setErrorI(newError)}
            slotProps={{
              textField: {
                helperText: errorMessage(errorI),
              },
            }}
            required={true}
          />

          <DesktopDatePicker
            label="Fecha fin"
            format="DD/MM/YYYY"
            value={selectedDateEnd}
            onChange={(newValue) => setSelectedDateEnd(newValue)}
            shouldDisableDate={isWeekend}
            minDate={today}
            maxDate={fechaMax()}
            onError={(newError) => handleSetError(newError)}
            slotProps={{
              textField: {
                error: !!error,
                helperText: errorMessage(error),
              },
            }}
            required={true}
          />
        </DemoContainer>
      </FormControl>
    </LocalizationProvider>
  )
}

export default CalendarPicker
