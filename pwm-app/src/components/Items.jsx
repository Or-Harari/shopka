import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Items.css'
import StarRating from './StarRating';

export default function Items({item}) {

    const [render, SetRender] = useState(true);

    const storedData = JSON.parse(localStorage.getItem('UserData'));
    const AddToWatchList = () => {
       if(storedData){
        let id = item._id;
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: id,
            name: storedData.name
        })
      };
        fetch('/api/addToWatchList', requestOptions)
    }else{
        alert('Please login in first');
    }
 }
      const Render = () => {
        if(render){
            SetRender(false)
        }else{
            SetRender(true);
        }
      }

  return (

            <div className='item-div'>
                <img className='image' src={item.img} alt="" />
                 <h2 className='item-name'>{item.title}</h2>
                 <p>{item.description}</p>
                 <h2>${item.price}</h2>
                 <div className='rate-div'>
                     <StarRating Render={Render} item = {item}/>
                 <span>{item.rate}</span>
                 <button onClick={AddToWatchList} className='watch-button item-watch-button'>&hearts;<span> </span>Watch</button>
                 </div>
 </div>
  )
}
