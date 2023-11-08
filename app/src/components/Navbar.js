import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);


    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        localStorage.removeItem("val");


        navigate("/login")
    }
    const profileHandler = () => {
        navigate("/profile")
    }
    const toggleClass = () => {
        setIsActive(!isActive)
    }
    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className='navbar' >
            <ul className='nav-ul'>
                <li>
                    <p onClick={() => navigate("/")} className="logo">BOOKSHELF</p>

                </li>
                <li>
                    <p onClick={() => navigate("/")}>Home</p>

                </li>

                {
                    (localStorage.getItem('authToken')) ?
                        <div className='nav-div-inner'>
                            <p onClick={() => navigate('/allshelves')} style={{ "padding": "20px", "color": "white" }}>Shelves</p>

                            <div className={isActive ? 'profile-dash' : 'profile-dash-inactive'}>
                                <ul>
                                    <li style={{ "color": "var(--main-color)", "backgroundColor": "var(--bg-color)" }}>{capitalize(user.name)}</li>
                                    <li onClick={profileHandler}>Profile</li>
                                    <li onClick={logoutHandler}>Logout</li>

                                </ul>
                            </div>


                        </div>

                        : ""
                }

            </ul >

            {
                (!localStorage.getItem("authToken")) ?
                    <div className='navEl'>
                        <p onClick={() => navigate("/signup")} >SignUp</p>
                        <p onClick={() => navigate("/login")} >Login</p>

                    </div>

                    : <div className='logout-div'>
                        <div className='profile-div' onClick={toggleClass}>
                            <i className='fas fa-user'></i>
                        </div>



                    </div>
            }
        </div >
    )
}
