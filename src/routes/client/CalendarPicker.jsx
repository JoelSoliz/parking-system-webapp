import * as React from 'react'
import dayjs from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
const CalendarPicker = () => {
  const [value, setValue] = React.useState(dayjs('2022-04-17'))
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label="Fecha de inicio"
          defaultValue={dayjs('2022-04-17')}
        />
        <DatePicker
          label="Fecha fin"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default CalendarPicker