import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import './DatePicker.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addMovie } from '../../redux/slices/moviesSlice'
// import dayjs from 'dayjs'

const DatePickerItem = ({ value }) => {
  const valueItem = value || null
  const dispatch = useDispatch()
  const { movie } = useSelector(state => state.movies)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        name="releaseDate"
        value={valueItem}
        onChange={(newValue) =>
          dispatch(addMovie({
            ...movie,
            releaseDate: newValue?.format('YYYY-MM-DD'),
          }))
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
