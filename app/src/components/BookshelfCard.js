import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const API_KEY = process.env.REACT_APP_API_KEY

export default function BookshelfCard({ id, shelve }) {
    const [book, setBook] = useState({});
        const navigate = useNavigate();


    const getBook = useCallback(async () => {
        try {
            let response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}?&key=${API_KEY}`);
            if (response.status === 200) {
                let resJson = await response.json();
                setBook(resJson.volumeInfo);
            }
        } catch (error) {
            console.error("Error occured during the API request", error)
        }

    }, [id])
    useEffect(() => {

        getBook();

    }, [getBook])

    const removeHandler = async (id) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const val = window.location.pathname.slice(11);

        const response = await fetch(`http://localhost:5000/api/remove`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, val: val, email: user.email })

        })
        const json = await response.json();
        if (!json.success) {
            alert("failed")
        }
        if (json.success) {

            localStorage.setItem('user', JSON.stringify(json.userData));

          navigate(`/bookshelf/${val}`);
        }

    }
    return (
        <div className='bookshelfcard-div'>

            <img src={book.imageLinks && book.imageLinks.smallThumbnail} alt="book-data" />
            <div>
                <h4>{book.title}</h4>
                <h5>Authors: {book.authors && book.authors.join(", ")}</h5>
                <h5>Shelve: <Link to="/bookshelf/cr">{shelve}</Link> </h5>
                <button onClick={() => removeHandler(id)}>remove</button>

            </div>

        </div>


    )
}
