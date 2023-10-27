import React from 'react'
import './NoSearchItems.scss'
import PropTypes from 'prop-types'

const NoSearchItems = ({ search }) => {
  return (
    <section className='nosearchitems_container'>
        <div>
            <p>Opps, No results for movie with title `{search}`</p>
        </div>
    </section>
  )
}

NoSearchItems.propTypes = {
  search: PropTypes.string
}

export default NoSearchItems
