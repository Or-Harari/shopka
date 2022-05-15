import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation'
import WatchNav from './WatchNav';
import './NavigationController.css'

export default function NavigationController(props) {

    const location = useLocation();

  return (
      <div className='nav-controller'>
      {location.pathname === '/'? <Navigation LogOutUser={props.LogOutUser} user={props.user} GetUser={props.GetUser} SearchHandler={props.SearchHandler} items = {props.items}/> : location.pathname === '/watchList'?<WatchNav/>:'no location'}
      </div>
  )
}
