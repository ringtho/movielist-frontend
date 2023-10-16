import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import './DatePicker.scss'

const DatePickerItem = ({ setMovie, movie }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        name="releaseDate"
        onChange={(newValue) =>
          setMovie({
            ...movie,
            releaseDate: newValue.format('YYYY-MM-DD'),
          })
        }
        isRequired
        className="date_picker"
        slotProps={{ textField: { variant: 'standard' } }}
        sx={{
          width: '100%',
          svg: { color: '#BB86Fc', mr: 2 },
          borderRadius: '0.5rem',
          input: {
            color: 'rgb(255,255,255)',
            p: '0.75rem 1rem',
            fontFamily: 'Montserrat, sans-serif',
            letterSpacing: '0.75px',
            label: { color: '#BB86Fc' },
          },
        }}
      />
    </LocalizationProvider>
  )
}

export default DatePickerItem
