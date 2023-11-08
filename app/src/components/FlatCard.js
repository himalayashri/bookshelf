import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FlatCard(props) {
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(true);
    const { title } = props.data.volumeInfo;
    const authors = props.data.volumeInfo.authors && props.data.volumeInfo.authors.join(', ');
    const img = props.data.volumeInfo.imageLinks && props.data.volumeInfo.imageLinks.smallThumbnail;
    const id = props.data.id;

    const wantToReadHandler = async (e) => {

        if (localStorage.getItem('authToken')) {
            const user = JSON.parse(localStorage.getItem("user"));

            const response = await fetch(`http://localhost:5000/api/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id, email: user.email, value: e.target.value })

            })
            const json = await response.json();
            // console.log(json);
            if (!json.success) {
                alert("failed")
            }
            if (json.success) {

                localStorage.setItem('user', JSON.stringify(json.userData));

            }
        } else {
            navigate("/login")
        }
    }

    const toggleLoginFormFlatCard = () => {

        if (localStorage.getItem("authToken")) {
            navigate(`/book/${id}`);
        } else {
            return null
        }
    }
    useEffect(() => {
        toggleClass();
    }, [])

    const toggleClass = () => {
        if (localStorage.getItem("authToken")) {
            setDisabled(false);
        }
    }

    return (
        <div className='flatcard'>
            <div onClick={toggleLoginFormFlatCard}>
                <img src={img} alt="" className='image' />
            </div>
            <div className='details'>
                <p className='details-title' onClick={toggleLoginFormFlatCard}>{title}</p>
                <p className='details-author' onClick={toggleLoginFormFlatCard}>by {authors}</p>

                <select onChange={wantToReadHandler} disabled={disabled}>
                    <option >Want to Read</option>

                    <option value="Want to Read">Want to Read</option>
                    <option value="Currently Reading">Currently Reading</option>

                    <option value="Read">Read</option>

                </select>

            </div>

        </div>
    )
}