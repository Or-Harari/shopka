import React, { useState } from 'react'
import './StarRating.css'
import {FaStar} from 'react-icons/fa'

export default function StarRating({item, Render}) {

    const [hover, SetHover] = useState(null);
    
    const storedData = JSON.parse(localStorage.getItem('UserData'));
    const UpdateRate = () => {
        let rate = hover;
        if(hover != null && storedData){
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + storedData.token },
            body: JSON.stringify({rate: rate, _id:item._id})
        };
            item.rate = rate;
            Render();
          fetch('/api/updateUserRating', requestOptions);
        }
        else{
            return alert('Please login to rate an item');
        }
    }

  return (
    <div className='start-main'>
        {[...Array(5)].map((star, i) => {
            const ratingValue = i+1;
            return (

            <label>
                <input onClick={UpdateRate} className='radio' type="radio" name="star" value={ratingValue} />
                <FaStar color={ratingValue <= (hover || item.rate) ? 'rgb(236, 153, 0)':'gray'} size={10}
                onMouseEnter={() => {SetHover(ratingValue)}}
                onMouseLeave={()=>{SetHover(null)}} 
                />
            </label>

            )
        })}
    </div>
  )
}
