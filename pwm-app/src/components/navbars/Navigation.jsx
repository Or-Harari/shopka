import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import SignUp from '../user-auth/SignUp';
import './Navigation.css'

export default function Navigation(props) {

    const [displaySignUp, SetDisplaySignUp] = useState(false);
    const [authMode, SetAuthMode] = useState('');

    const searchTyping = (event) => {
        props.SearchHandler(event.target.value);
    }
    const handleSignUp = (event) => {
        SetAuthMode(event.target.value)
        SetDisplaySignUp(true)
    }
    const handleClose = () => {
        SetDisplaySignUp(false);
    }

    const LogOutUser = () => {
        props.LogOutUser();
    }

    const DisplayCorrectLoginButton = () => {
        let user = props.user;
        if(user){
            return(
                <div className='logout'>
          <div>
                    <h4 className='userName'>Hi, {user.userName}</h4>
                    </div><div>
                <button className=' logout-butt' onClick={LogOutUser} value='Logout'>Logout</button>
                </div></div>
            )
        }
        else{
            return(
                <div className='div'>
            <button className='login-and-signup' value='login' onClick={handleSignUp}>Login</button>
            <button className='login-and-signup' value='signUp' onClick={handleSignUp}>Sign Up</button>
            </div>
            )
        }
    }

    const DisplaySignUpForm = () => {
        if(displaySignUp){
        return(
            <div className='cover'>
                <div className='a'>
                <SignUp GetUser = {props.GetUser} authMode={authMode} handleClose={handleClose}/>
                </div>
                <div className='cover-opacity'></div>
                </div>
        )
        }else{
            return null;
        }   
    }

    const ToggleDiplay = () => {
        let user = props.user;
        if(!user){
        return (
            <div className='menu'>  
            <Link className='burger-link' to='/watchList'>Watch</Link>
            <button onClick={handleSignUp} value='login' className='burgder-button'>Login</button>
            <button onClick={handleSignUp} value='signUp' className='burgder-button'>Sign Up</button>

        </div>
        )
        }else{
            return(
               
            <div className='menu'>
            <Link className='burger-link' to='/watchList'>Watch</Link>
            <button onClick={LogOutUser} className='burgder-button'>Logout</button>

        </div>
            )    
    }

    }
    
  return (
    <div className='main'>
         {DisplaySignUpForm()}
        <div className='logo'>
            <h4 className='title'>Shopka</h4>
        </div>
        <div className='search'>   
            &#128270;
            <input className="search-input" onChange={searchTyping} placeholder='Search' type="text" />
        </div>


<div className='main-main'>
   
        <div className='main-toggle'>
       
        <label className='tpggle-lablel' for='toggle'>&#9776;</label>
        <input type="checkbox"  id="toggle" />

            {ToggleDiplay()}

        </div>
        </div>
        <div className='watch-and-login'>
            {DisplayCorrectLoginButton()}
            <Link to='watchList' className='watch-button nav-watch-button'>Watch</Link>
        </div>

      
    </div>
  )
 }

