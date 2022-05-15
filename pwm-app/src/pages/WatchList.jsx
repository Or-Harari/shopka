import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import './WatchList.css'
import api from '../ServiceAPI'

export default function WatchList(props) {

    const [items, SetItems] = useState();

  useEffect(() => {
    CheckForItems();
  }
 ,[]);

    const CheckForItems = () => {
      let user = props.user; 
        let itemsList = props.items
        if(user){
        api.GetUserFavorites(user, itemsList, SetItems);
        }
      }

  const deleteItemFromWatch = (index) => {
    const storedData = JSON.parse(localStorage.getItem('UserData'));
    console.log(items[index]._id)
    fetch('/api/removeFromWatch',{
      method:'DELETE',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({favoriteId: items[index]._id, name: storedData.name})
    })
    .then(res => (res.json()
    .then(resData => {
      CheckForItems();
    })
    ))
    .catch(err => console.log(err.message))
  }

  return (
    
    <div className='items-watch-main'>
        {items? items.map((item, index) => {
            return(
            <div className='item-watch-div'>
              <button className='delete-button' onClick={() => {deleteItemFromWatch(index)}}>Remove</button>
            <h2 className='item-name'>{item.name}</h2>
            <img className='image' src={item.img} alt="" />
            <p>{item.description}</p>
            <h2>{item.price}$</h2>
            <div className='rate-div'>
            {[...Array(item.rate)].map((star, i) => {
            const ratingValue = i+1;
            return (    
                <FaStar color='rgb(236, 153, 0)' size={10}/>
            )
        })}
            <span className='span-watch'>{item.rate}</span>
            </div>
        </div>
         )})
         :'no items'}
        
    </div>
  )
}
