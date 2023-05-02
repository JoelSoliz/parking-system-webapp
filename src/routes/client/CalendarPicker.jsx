import React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { isBefore, subDays } from 'date-fns'
import { FormControl } from '@mui/material'

const CalendarPicker = () => {
  const today = new Date()
  const yesterday = subDays(today, 1)
  const fechaMax = () => {
    if (today.getMonth() <= 5) {
      return new Date(today.getFullYear(), 5, 30)
    } else {
      return new Date(today.getFullYear(), 11, 31)
    }
  }
  const fechaMin = new Date(
    today.getFullYear(),
    today.getMonth(),
    yesterday.getDate(),
  )

  const [selectedDateStart, setSelectedDateStart] = React.useState(null)
  const handleStartDateChange = (date) => {
    setSelectedDateStart(date)
  }
  const [selectedDateEnd, setSelectedDateEnd] = React.useState(null)
  const handleEndtDateChange = (date) => {
    setSelectedDateEnd(date)
  }

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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormControl error={error}>
        <DemoContainer components={['DesktopDatePicker', 'DesktopDatePicker']}>
          <DesktopDatePicker
            label="Fecha de inicio"
            format="dd/MM/yyyy"
            value={selectedDateStart}
            onChange={handleStartDateChange}
            shouldDisableDate={(date) => isBefore(date, yesterday)}
            minDate={fechaMin}
            maxDate={fechaMax()}
            onError={(newError) => setErrorI(newError)}
            slotProps={{
              textField: {
                helperText: errorMessage(errorI),
              },
            }}
          />

          <DesktopDatePicker
            label="Fecha fin"
            format="dd/MM/yyyy"
            value={selectedDateEnd}
            onChange={handleEndtDateChange}
            shouldDisableDate={(date) => isBefore(date, yesterday)}
            minDate={fechaMin}
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
