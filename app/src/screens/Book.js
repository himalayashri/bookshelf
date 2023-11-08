import React, { useCallback, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
const API_KEY = process.env.REACT_APP_API_KEY


export default function Book({ value, setValue }) {
    const navigate = useNavigate();
    const [book, setBook] = useState({});
    const authors = book.authors && book.authors.join(', ');
    const genres = book.categories && book.categories.join(" ").split("/");
    const id = window.location.pathname.slice(6);

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
        getBook()
    }, [getBook])

    const wantToReadHandler = async (e) => {

        const user = JSON.parse(localStorage.getItem("user"));

        const response = await fetch(`http://localhost:5000/api/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, email: user.email, value: e.target.value })

        })
        const json = await response.json();
        if (!json.success) {
            alert("failed")
        }
        if (json.success) {

            localStorage.setItem('user', JSON.stringify(json.userData));

        }

    }

    function formatDate(originalDate) {
        if (originalDate && typeof originalDate === 'string' && originalDate.length >= 10) {
            const dateParts = originalDate.split('-');
            const year = dateParts[0];
            const month = new Date(originalDate).toLocaleString('default', { month: 'long' });
            const day = dateParts[2];

            return `${month} ${day}, ${year}`;
        } else {
            return "Invalid Date";
        }
    }

    function limitWords(description, limit) {
        const words = description.split(' ');

        if (words.length <= limit) {
            return description;
        }

        const limitedWords = words.slice(0, limit);
        return limitedWords.join(' ') + '...';
    }


    function removeHtmlTags(input) {
        const regex = /(<([^>]+)>)/ig;
        return input.replace(regex, "");
    }
    const genreClick = (genre) => {
        navigate(`/shelf/${genre}`)
    }

    return (
        <div>
            <Navbar setVal={(val) => setValue(val)} />

            <div className='book-div'>

                <div className='book-div-outer-one'>
                    <img src={book.imageLinks && book.imageLinks.large ? book.imageLinks.large : book.imageLinks && book.imageLinks.smallThumbnail} alt="Book" />
                    <div className='book-div-inner-one'>


                        <select onChange={wantToReadHandler} className='dropdown-big'>
                            <option >Want to Read</option>

                            <option value="Want to Read">Want to Read</option>
                            <option value="Currently Reading">Currently Reading</option>

                            <option value="Read">Read</option>

                        </select>
                        <button>Rate this book</button>
                        <button>Review this book</button>

                    </div>

                </div >


                <div className='book-div-outer-two'>
                    <h1 >{book.title}</h1>
                    <h3>{authors}</h3>
                    <p>{book.description && removeHtmlTags(limitWords(book.description, 60))}</p>
                    {genres && <div className='genres-big'>
                        <h4>Genres:</h4>
                        <ul>
                            {genres && genres.map((genre, index) => {
                                return <li key={index} onClick={() => genreClick(genre)} >
                                    {genre},
                                </li>
                            })}
                        </ul>

                    </div>}
                    {book.pageCount && book.publisher && <h5>{book.pageCount} pages, {book.publisher}</h5>}
                    {book.publishedDate && <h4>First Published : {formatDate(book.publishedDate)}</h4>}

                </div>

            </div>

        </div>

    )
}
