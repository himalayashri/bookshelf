import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';


export default function SignUp() {
    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        name: "", email: "", password: "", geolocation: ""
    });


    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })

        })
        const json = await response.json();
        if (!json.success) {
            alert("Invalid Credentials")
        }
        if (json.success) {
            navigate("/login")
        }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='home'>
            <Navbar />
            <form onSubmit={submitHandler} className='signup'>
                <input type="text" name='name' value={credentials.name} placeholder="put your name" onChange={onChange} />
                <input type="text" name='email' value={credentials.email} placeholder='put your email' onChange={onChange} />
                <input type="password" name='password' value={credentials.password} placeholder='put your password' onChange={onChange} />
                <input type="text" name='geolocation' value={credentials.geolocation} placeholder='put your Address' onChange={onChange} />
                <button type='submit'>Sign Up</button>
                <Link to='/login'>Already a User?</Link>
            </form>
        </div>
    )
}
