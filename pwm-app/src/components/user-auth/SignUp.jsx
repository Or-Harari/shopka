import { useEffect, useRef, useState } from 'react';
import './SignUp.css'

export default function SignUp(props) {

    let formRef = useRef();

    useEffect(() => {
        let handler = (event) => {
            if(!formRef.current.contains(event.target)){
                handleClose();}
        }
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    },[])

const [name, setName] = useState('');
const [password, SetPassword] = useState('');
const [confirmPassword, SetConfirmPassword] = useState('');

const [error, setError] = useState(false);
const [errorDetaild, SetErrorDetails] = useState('');

const handleName = (event) => {
    setName(event.target.value);
};

const handlePassword = (event) => {
    SetPassword(event.target.value);
};
const handleConfirmPassword = (event) => {
    SetConfirmPassword(event.target.value)
}
const handleClose = () => {
    props.handleClose();
}

const displayConfirmPass = () => {
    let mode = props.authMode;
    if(mode === 'signUp'){
        return (
            <div>
            <label className="label">Confirm Password</label>
            <input className='form-input' onChange={handleConfirmPassword} 
            value={confirmPassword} type="password" />
       </div>
        )
    }
}

function SignUp(){
    let authMode = props.authMode;
    let fetchUrl = '/api/' + authMode;
    if (name === '' || password === '' ) {
        SetErrorDetails('Please enter all the fields')
    return setError(true);
}
    else if(authMode === 'signUp' && password != confirmPassword){
        SetErrorDetails('Passwords do not match')
        return setError(true);
    }
     else {
         let user = {
            name:name,
            password: password
        }
        setError(false);
        fetch(fetchUrl, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)})
            .then(response => response.json()
            .then(responseData => {
                console.log(response)
                if(!response.ok){
                    throw new Error(responseData)
                }
                else if(authMode === 'signUp'){
                     alert('You have succesfully Signed Up!')
                     return handleClose();
                }
                else{
                    props.GetUser(responseData);
                    return handleClose();
                }
            })
            .catch(err => {SetErrorDetails(err.message); setError(true)}))}    
             
}

const handleSubmit = async (e) => {
    e.preventDefault();
    SignUp();
}

const title = () => {
    if(props.authMode === 'signUp'){
    return(
        <h1 className='headline'>User Registration</h1>
    )
    }else{
        return (
            <h1 className='headline'>Login</h1>
        )
    }
}

const errorMessage = () => {
return (
<div
className="error"
style={{
display: error ? '' : 'none',
}}>
<h1>{errorDetaild}</h1>
</div>
)};

return (
    
<div ref={formRef} className="main-form">
    <button onClick={()=>{handleClose()}} className='esc-button'>X</button>
{title()}
<div className="messages">
{errorMessage()}
</div>

<form className='form'>

<label className="label">Name</label>
<input className='form-input' onChange={handleName} 
value={name} type="text" />

<label className="label">Password</label>
<input className='form-input' onChange={handlePassword} 
value={password} type="password" />


{displayConfirmPass()}


<button onClick={handleSubmit} className="btn" type="submit">
Submit
</button>
</form>
</div>
)
}