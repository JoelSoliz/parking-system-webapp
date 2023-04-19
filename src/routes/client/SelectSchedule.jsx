import * as React from 'react'
import dayjs from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
const SelectSchedule = () => {
  const [value, setValue] = React.useState(dayjs('2022-04-18T15:30'))
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker', 'TimePicker']}>
        <TimePicker
          label="Uncontrolled picker"
          defaultValue={dayjs('2022-04-18T15:30')}
        />
        <TimePicker
          label="Controlled picker"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default SelectSchedule
