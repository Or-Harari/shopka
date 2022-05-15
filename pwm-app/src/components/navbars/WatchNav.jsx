import React from 'react'
import { useNavigate } from 'react-router-dom';
import './WatchNav.css'

export default function WatchNav(props) {

    const navigate = useNavigate();

    const backToHome = () => {
        navigate('/');
    }
  return (
    <div className='watch-main'>
    <div>
        <h4 className='title title-watch' onClick={backToHome}>Shopke</h4>
        </div>
        <div>
        <h1 className='page-name'>Watch List</h1>
        </div>
    </div>
  )
}
