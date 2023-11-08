import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Login({ onClose }) {

    const [credentials, setCredentials] = useState({
        email: "", password: ""
    });
    ;


    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/loginuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        })
        const json = await response.json();
        if (!json.success) {
            alert("Invalid Credentials")
        }
        if (json.success) {
            localStorage.setItem('authToken', json.authToken);
            localStorage.setItem('user', JSON.stringify(json.userData));
            onClose();
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='login-com-div'>


            <form onSubmit={submitHandler} className="login-outer">
                <input type="text" name='email' value={credentials.email} placeholder='put your email' onChange={onChange} />
                <input type="password" name='password' value={credentials.password} placeholder='put your password' onChange={onChange} />
                <button type='submit'>Log In</button>
                <Link to='/signup'>I'm a new User!</Link>
            </form>
            <p className='cross' onClick={() => onClose()}>
                X
            </p>
        </div>

    )
}
