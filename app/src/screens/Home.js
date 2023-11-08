import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SignUp from "../components/SignUp";
import { useNavigate, Link } from 'react-router-dom';
import WtrCard from '../components/WtrCard';
import CrCard from '../components/CrCard';
import RCard from '../components/RCard';


export default function Home({ val, setValue }) {
    const [genres, setGenres] = useState(["fiction", "fantasy", "romance"]);
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        genreHandler();
    }, [])

    const navigate = useNavigate()

    const valHandler = async () => {

        navigate("/search")
    }
    const handleKeyUp = (e) => {
        if (e.key === "Enter") {
            valHandler()
        }
    }
    const genreHandler = async () => {
        try {

            const response = await fetch(`http://localhost:5000/genre/`);
            if (response.status === 200) {
                const jsonRes = await response.json();
                setGenres(jsonRes.data[0].genre.slice(0, 20))
            } else {
                console.error("API request failed with status:", response.status);
            }
        } catch (error) {
            console.error("Error occurred during the API request:", error);
        }

    }

    return (
        <div className='home'>
            <Navbar setVal={(val) => setValue(val)} />
            {
                (localStorage.getItem("authToken")) ?
                    <div className='home-div-main'>
                        <div className='home-bg-img'></div>
                        <div className='search-bar-3'>
                            <input type="search" value={val} onChange={(e) => setValue(e.target.value)} onKeyUp={handleKeyUp} placeholder="Find any Book..." />
                            <i className="fas fa-search fa-xs" onClick={() => valHandler()}></i>
                        </div>
                        <div className='home-div'>
                            {
                                user.crId.length > 0 ?
                                    <div className='wtr-div-outer'>
                                        <h2>CURRENTLY READING</h2>
                                        <div className='wtr-div-inner'>
                                            <CrCard id={user.crId[0]} />
                                        </div>
                                        <Link to="/bookshelf/cr">See all books</Link>

                                    </div>
                                    :
                                    <div className='wtr-div-outer'><h2>No Book is Currently Reading</h2></div>
                            }
                            {
                                user.wtrId.length > 0 ?
                                    <div className='wtr-div-outer'>
                                        <h2>WANT TO READ</h2>
                                        <div className='wtr-div-inner'>
                                            <WtrCard id={user.wtrId[0]} />
                                        </div>
                                        <Link to="/bookshelf/wtr">See all books</Link>

                                    </div>
                                    :
                                    <div className='wtr-div-outer'><h2>No Book you wants to Read</h2></div>
                            }
                            {
                                user.rId.length > 0 ?
                                    <div className='wtr-div-outer'>
                                        <h2>READ</h2>
                                        <div className='wtr-div-inner'>
                                            <RCard id={user.rId[0]} />
                                        </div>
                                        <Link to="/bookshelf/r">See all books</Link>

                                    </div>
                                    :
                                    <div className='wtr-div-outer'><h2>No Books you Read Yet</h2></div>
                            }

                        </div>


                    </div>
                    :
                    <div className='container'>
                        <div className='background-image'></div>
                        <div className='box2'>
                            <h1 className='text-content'>Meet your Next Favourite Book</h1>
                            <div className='search-bar'>
                                <input type="search" value={val} onChange={(e) => setValue(e.target.value)} onKeyUp={handleKeyUp} placeholder="Find any Book and press Enter..." />
                                <span><i className="fas fa-search fa-xs" onClick={() => valHandler()}></i></span>
                            </div>

                        </div>
                        <div className="signup-div"><SignUp /></div>

                        <div className='links-div'>
                            <ul>
                                {
                                    genres.map((genre, index) => (
                                        <li key={index} >
                                            <Link to={`/shelf/${genre}`} >{genre}</Link>
                                        </li>
                                    ))
                                }
                            </ul>

                        </div>


                    </div>
            }

        </div >

    )
}
