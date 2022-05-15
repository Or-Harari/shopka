import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa';
import './CustomerReview.css'

export default function CustomerReview(props) {

        const [color, SetColor] = useState('rgb(211, 211, 211)');
        const [clicked, SetClcked] = useState(0);

        const HandleClick = (i) => {
            SetClcked(i);
            let rate = i+1;
            props.CustomerFilterHandler(rate)
        }

  
  return (
    <div className='customer-review-main'>

        <h4 className='customer-review-title'>CUSTOMER REVIEW</h4>
             {[...Array(4)].map((star, i) => {
            const ratingValue = i+1;
            return (
                <div className='stars' onClick={() => HandleClick(i)} style={{backgroundColor: i === clicked? 'rgb(211, 211, 211)':'rgb(238, 238, 238)'}} >
            <label className='label'>
                <input className='radio' type="radio" name="star" value={ratingValue} />
               { [...Array(ratingValue)].map((star) => {
                    return(
                        <span className='the-star'>
                             <FaStar color='rgb(236, 153, 0)' size={10}/>          
                        </span> 
                        
    )})}  <p>& Up</p>
                </label>
                
     </div>
)})}
    </div>
  )
}
