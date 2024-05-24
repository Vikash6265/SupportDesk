import React from 'react'
import { Link } from 'react-router-dom'

const Backbutton = ({url}) => {
  return (
    <Link to={url} className='btn btn-outline-dark btn-sm my-2'>Back</Link>
  )
}

export default Backbutton
