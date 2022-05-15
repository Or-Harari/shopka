import React, { useState } from 'react'
import Items from '../Items'
import './RightSegment.css'

export default function RightSegment(props) {

    const [sortBy, SetSortBy] = useState('Cheapest');

    const SortByHandler = (event) => {
        SetSortBy(event.target.value);
     }

    const DisplayItems = () => {
        let items;
        if(props.filteredItems){items = props.filteredItems;}
        else{items=props.items}
        
        if(items){
        switch(sortBy) {
            case 'Cheapest':
               items.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
             return items.map((item) => {return(
                <Items item = {item}></Items>
                )})
            case 'Most expensive':
                items.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
                return items.map((item) => {return(
                   <Items item = {item}></Items>
                )})
            case 'Rate':
                items.sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate));
                return items.map((item) => {return(
                    <Items item = {item}></Items>
                )})
                default:;
          }
        }else{
                return (
                    <h2>Loading...</h2>
                ) 
            }
    }

  return (
    <div className='right-segment-main'>
        <div className='sort-by'>
            <span className='sort-by-span'>SORT BY</span>
            <select onChange={SortByHandler} name="Sort By" id="" className='sort-select'>Sort BY
                <option value="Cheapest">Cheapest</option>
                <option value="Most expensive">Most expensive</option>
                <option value="Rate">Rate</option>
            </select>
        </div>

        <div className='items-main'>
            {DisplayItems()}
        </div>
    </div>
  )
}
