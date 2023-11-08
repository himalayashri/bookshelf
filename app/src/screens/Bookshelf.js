import React from 'react';
import BookshelfCard from '../components/BookshelfCard';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';


export default function Bookshelf({ value, setValue }) {
    const navigate = useNavigate();
    const val = window.location.pathname.slice(11);
    const user = JSON.parse(localStorage.getItem('user'));

    let content;
    let links;

    if (val === "cr") {
        content = (
            <div className='bookshelf-inner-content'>
                <h2>MY BOOKS: Currently Reading</h2>
                <div className='bookshelf-inner-content-div'>
                    {user.crId.map((id, index) => { return <BookshelfCard key={index} id={id} shelve={"Currently Reading"} /> }
                    )}
                </div>
            </div>
        )
        links = (
            <div className='bookshelf-inner-links'>
                <h4 onClick={() => navigate("/bookshelf/wtr")}>Wants to Read</h4>
                <h4 onClick={() => navigate("/bookshelf/r")}>Read</h4>
            </div>
        );
    } else if (val === "wtr") {
        content = (
            <div className='bookshelf-inner-content'>
                <h2>MY BOOKS: Want To Read</h2>
                <div className='bookshelf-inner-content-div'>
                    {user.wtrId.map((id, index) => {
                        return <BookshelfCard key={index} id={id} shelve={"Wants to Read"} />
                    })
                    }
                </div>
            </div>

        );
        links = (
            <div className='bookshelf-inner-links'>
                <h4 onClick={() => navigate("/bookshelf/cr")}>Currently Reading</h4>
                <h4 onClick={() => navigate("/bookshelf/r")}>Read</h4>
            </div>
        );
    } else if (val === "r") {
        content = (
            <div className='bookshelf-inner-content'>
                <h2>MY BOOKS: Read</h2>
                <div className='bookshelf-inner-content-div'>
                    {user.rId.map((id, index) => {
                        return <BookshelfCard key={index} id={id} shelve={"Read"} />
                    })
                    }
                </div>
            </div>
        );
        links = (
            <div className='bookshelf-inner-links'>
                <h4 onClick={() => navigate("/bookshelf/cr")}>Currently Reading</h4>
                <h4 onClick={() => navigate("/bookshelf/wtr")}>Wants to Read</h4>
            </div>
        );
    }

    return (
        <div className='div'>
            <Navbar setVal={(val) => setValue(val)} />
            <div className='bookshelf-main-div'>

                {content}
                {links}

            </div>

        </div>
    );
}