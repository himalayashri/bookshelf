import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function AllShelves({ value, setValue }) {
    const [genres, setGenres] = useState(["fiction", "fantasy", "romance"])


    const genreHandler = async () => {
        try {

            const response = await fetch(`http://localhost:5000/genre/`);
            if (response.status === 200) {
                const jsonRes = await response.json();
                setGenres(jsonRes.data[0].genre)
            } else {
                console.error("API request failed with status:", response.status);
            }
        } catch (error) {
            console.error("Error occurred during the API request:", error);
        }

    }
    useEffect(() => {
        genreHandler()
    }, [])
    return (
        <div className='allshelves'>
            <Navbar setVal={(val) => setValue(val)} />
            <h6>ALL SHELVES</h6>
            <hr />

            <ul>
                {
                    genres.map((genre, index) => (
                        <li key={index}>
                            <Link to={`/shelf/${genre}`} >{genre}</Link>
                        </li>
                    ))
                }
            </ul>


        </div>
    )
}
