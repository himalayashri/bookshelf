import React from 'react'
import Navbar from '../components/Navbar'

export default function Profile() {
    const user = JSON.parse(localStorage.getItem('user'))
    return (
        <div className='profile-main-div'>
            <Navbar />
            <div className='profile-page-outer'>
                <div className='profile-page-inner'>
                    <div>Name: {user.name} </div>
                    <div>Email: {user.email}</div>
                    <div>Address : {user.location}</div>
                </div>

            </div>

        </div>
    )
}
