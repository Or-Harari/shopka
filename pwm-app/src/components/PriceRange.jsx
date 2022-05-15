import React, { useState } from 'react'
import './PriceRange.css'

export default function PriceRange(props) {

    const [price, SetPrice] = useState('500');

    const FilterChange = () => {
        props.RangeHandler(price);
}

    const HandleRange = (event) => {
        SetPrice(event.target.value);
    }
  return (
      <div className='range-main'>
          <div className='range-title'>
          <h4>Choose Maximum Price</h4>
          </div>
        <div className='range-input'>
            <output class="price">{price}$</output>
            <input onMouseUp={FilterChange} onChange={HandleRange} type="range" id="vol" name="vol" min="0" max="500" value={price}/>
        </div>
    </div>  
    )
}
