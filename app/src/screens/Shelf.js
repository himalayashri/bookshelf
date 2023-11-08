import React, { useEffect, useState } from 'react';
import FlatCard from '../components/FlatCard';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';

import ReactDOM from 'react-dom';
import Login from '../components/Login';


export default function Shelf({ value, setValue }) {
    const navigate = useNavigate();
    const val = window.location.pathname.slice(7);
    const [showLoginForm, setShowLoginForm] = useState(false);


    const [items, setItems] = useState([]);
    // const [startIndex, setStartIndex] = useState(0);
    // const [maxResults, setMaxResults] = useState(10);
    const [genres, setGenres] = useState(["fiction", "fantasy", "romance"])

    // const val = useContext(ValContext);
    // if (val !== "") {
    //     localStorage.setItem('val', val);

    // }
    // console.log(window.location.pathname);

    useEffect(() => {
        valHandler(val)
        genreHandler();

        // let savedVal = localStorage.getItem('val');
        // if (savedVal) {
        //     valHandler(savedVal)
        // } else {
        //     valHandler(val)
        // }

    }, [val])



    const valHandler = async (val) => {

        try {
            // const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${val}`);
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${val}books&startIndex=0&maxResults=40`);

            // const response = await fetch(`https://openlibrary.org/search.json?q=${val}&per_page=10`);


            if (response.status === 200) {
                const jsonRes = await response.json();
                // console.log(jsonRes.items);
                setItems(jsonRes.items);

            } else {
                console.error("API request failed with status:", response.status);
            }
        } catch (error) {
            console.error("Error occurred during the API request:", error);
        }



    }

    // const previousHandler = () => {
    //     if (startIndex !== 0) {
    //         setStartIndex(startIndex - 10)
    //     }
    // }

    // const nextHandler = () => {
    //     if (startIndex !== 100) {
    //         setStartIndex(startIndex + 10)
    //     }
    // }

    // const genreHandler = async (genre) => {
    //     try {
    //         const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${genre}&startIndex=0&maxResults=40`);
    //         if (response.status === 200) {
    //             const jsonRes = await response.json();
    //             console.log(jsonRes.items);
    //         } else {
    //             console.error("API request failed with status:", response.status);

    //         }
    //     } catch (error) {
    //         console.error("Error occurred during the API request:", error);
    //     }

    // }

    const genreHandler = async () => {
        try {

            const response = await fetch(`http://localhost:5000/genre/`);
            if (response.status === 200) {
                const jsonRes = await response.json();
                setGenres(jsonRes.data[0].genre.slice(0, 13))
            } else {
                console.error("API request failed with status:", response.status);
            }
        } catch (error) {
            console.error("Error occurred during the API request:", error);
        }

    }
    const toggleLoginForm = () => {
        if (localStorage.getItem("authToken")) {

            navigate("/allshelves")

        } else {
            setShowLoginForm(!showLoginForm);
        }
    }
    const toggleLoginFormFlatCard = (item) => {
        if (!localStorage.getItem("authToken")) {
            setShowLoginForm(!showLoginForm);
        } else {
            return null;
        }

    }

    return (
        <div>
            {showLoginForm &&
                ReactDOM.createPortal(
                    <Login onClose={() => setShowLoginForm(!showLoginForm)} />,
                    document.getElementById('portal-root')
                )}
            <Navbar setVal={(val) => setValue(val)} />
            <div className='search-main-div'>
                <div className='search-div'>
                    <ul className='search-div-ul'>

                        {
                            items.map((item, index) => (
                                <li key={index} onClick={() => toggleLoginFormFlatCard(item)} className='pointer'>
                                    {item.volumeInfo.imageLinks && <FlatCard key={index} data={item} />}

                                </li>

                            )
                            )
                        }
                    </ul>
                </div>


                <div className="shelves-div">
                    <h6>RELATED SHELVES</h6>
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
                    <p onClick={toggleLoginForm}>More shelves</p>


                </div>

            </div>

        </div>
    )
}
