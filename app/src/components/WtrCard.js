import React, { useCallback, useEffect, useState } from 'react'
const API_KEY = "AIzaSyC6UetIHrjWwC6KBKpw3M6g7axYsmy-QFo"

export default function WtrCard({ id }) {
    const [wtrBook, setWtrBook] = useState({})
    const getBook = useCallback(async () => {
        try {
            let response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}?&key=${API_KEY}`);
            if (response.status === 200) {
                let resJson = await response.json();
                setWtrBook(resJson.volumeInfo);
            }
        } catch (error) {
            console.error("Error occured during the API request", error)
        }

    }, [id])
    useEffect(() => {
        getBook()
    }, [getBook])

    return (
        <div className='card'>
            <img src={wtrBook.imageLinks && wtrBook.imageLinks.smallThumbnail} alt="Book" />
            <div>
                <h3>{wtrBook.title}</h3>
                <p> by {wtrBook.authors && wtrBook.authors.join(", ")}</p>

            </div>
        </div>
    )
}
