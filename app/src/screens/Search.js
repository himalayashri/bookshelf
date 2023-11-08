import React, { useCallback, useContext, useEffect, useState } from 'react';
import FlatCard from '../components/FlatCard';
import ValContext from '../contexts/ValContext';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Login from '../components/Login';

export default function Search({ value, setValue }) {

    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [genres, setGenres] = useState(["fiction", "fantasy", "romance"]);

    const [showLoginForm, setShowLoginForm] = useState(false);


    const val = useContext(ValContext);

    if (val !== "") {
        localStorage.setItem('val', val);

    }

    const valHandler = useCallback(async (val) => {

        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${val}&startIndex=${startIndex}&maxResults=10`);

            if (response.status === 200) {
                const jsonRes = await response.json();
                setItems(jsonRes.items);

            } else {
                console.error("API request failed with status:", response.status);
            }
        } catch (error) {
            console.error("Error occurred during the API request:", error);
        }

    }, [startIndex]);

    useEffect(() => {

        let savedVal = localStorage.getItem('val');
        if (savedVal) {
            valHandler(savedVal)
        } else {
            valHandler(val)
        }
        genreHandler();

    }, [val, startIndex, valHandler])

    const previousHandler = () => {
        if (startIndex !== 0) {
            setStartIndex(startIndex - 10)
        }
    }

    const nextHandler = () => {
        if (startIndex !== 100) {
            setStartIndex(startIndex + 10)
        }
    }

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


    const handleKeyUp = (e) => {
        if (e.key === "Enter") {
            valHandler(val)
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
            return null

        }

    }

    return (
        <div>
            {showLoginForm &&
                ReactDOM.createPortal(
                    <Login onClose={toggleLoginForm} />,
                    document.getElementById('portal-root')
                )}
            <Navbar setVal={(val) => setValue(val)} />
            <div className='search-main-div'>
                <div className='search-div'>
                    <h3>Search</h3>
                    <div className='search-bar-2'>
                        <input type="search" value={value} onChange={(e) => setValue(e.target.value)} onKeyUp={handleKeyUp} placeholder="Find your Book..." />
                        <button onClick={() => valHandler(val)} >Search</button>
                    </div>
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
                    <div className='btn-div'>
                        <button onClick={() => previousHandler()} className="btn"> previous</button>
                        <button onClick={() => nextHandler()} className="btn">next</button>

                    </div>


                </div>

                <div className='shelves-div'>
                    <h6>RELATED SHELVES</h6>
                    <hr />
                    <ul>
                        {
                            genres.map((genre, index) => (
                                <li key={index} >
                                    <Link to={`/shelf/${genre}`} >{genre}</Link>
                                </li>
                            ))
                        }
                    </ul>
                    <p onClick={toggleLoginForm}>More shelves</p>

                </div>

            </div>

        </div >
    )
}
