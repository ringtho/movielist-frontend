import React from 'react'
import './NoSearchItems.scss'

const NoSearchItems = ({ search }) => {
  return (
    <section className='nosearchitems_container'>
        <div>
            <p>Opps, No results for movie with title `{search}`</p>
        </div>
    </section>
  )
}

export default NoSearchItems
