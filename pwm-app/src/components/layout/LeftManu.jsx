import React, { useState } from 'react'
import CustomerReview from '../CustomerReview'
import PriceRange from '../PriceRange'
import './LeftMenu.css'

export default function LeftManu(props) {

  return (
    <div className='left-menu-main'>
       <PriceRange items={props.items} RangeHandler={props.RangeHandler}/>
       <CustomerReview CustomerFilterHandler={props.CustomerFilterHandler}/>
    </div>
  )
}
