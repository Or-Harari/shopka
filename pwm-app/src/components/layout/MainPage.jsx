import React, { useEffect, useState } from 'react'
import './MainPage.css'
import LeftManu from './LeftManu';
import RightSegment from './RightSegment';

export default function MainPage(props) {

  const [rangeFilter, SetRangeFilter] = useState('500');
  const [customerFilter, SetCustomerFilter] = useState(1); 

  useEffect(() => {
    if(props.items){
        let items = props.items;
        if(props.searchInput){
            const filtered = items.filter((item) => item.title.toString().toLowerCase().startsWith(props.searchInput.toLowerCase()));
            const filtered1 = filtered.filter((item) => {return item.price < rangeFilter});
            const filtered2 = filtered1.filter((item) => {return item.rate >= customerFilter});
            return props.FilterItems(filtered2);
        }
        else{
        const filtered = items.filter((item) => {return item.price < rangeFilter});
        let filtered1 = filtered.filter((item) => {return item.rate >= customerFilter});
            return props.FilterItems(filtered1);        
        }
    }
 },[props.searchInput,rangeFilter,customerFilter])

 const RangeHandler = (filtered) =>{
   console.log('changed');
  SetRangeFilter(filtered);
}

const CustomerFilterHandler = (Rate) => {
  SetCustomerFilter(Rate);
}

  return (
    <div className='main-page'>
        <LeftManu items={props.items} RangeHandler={RangeHandler} CustomerFilterHandler={CustomerFilterHandler}/>
        <RightSegment loading={props.loading} filteredItems={props.filteredItems} items={props.items}/>
    </div>
  )
}
