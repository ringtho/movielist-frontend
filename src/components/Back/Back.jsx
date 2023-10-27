import React from 'react'
import './Back.scss'
import { useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

const Back = () => {
  const navigate = useNavigate()
  return (
    <div className="back_controls" onClick={() => navigate(-1)}>
      <ArrowBackIosIcon className="back_icon" />
      Back
    </div>
  )
}

export default Back
