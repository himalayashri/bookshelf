import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './screens/Home';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Search from './screens/Search';
import Shelf from './screens/Shelf';
import { useState } from 'react';
import ValContext from './contexts/ValContext';
import Bookshelf from './screens/Bookshelf';
import Book from './screens/Book';
import AllShelves from './screens/AllShelves';
import Profile from './screens/Profile';
function App() {
  const [val, setVal] = useState("");

  return (
    <>
      <ValContext.Provider value={val}>
        <Routes>
          <Route path='/' element={<Home val={val} setValue={(val) => setVal(val)} />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/search' element={<Search val={val} setValue={(val) => setVal(val)} />} />
          <Route path='/shelf/:shelve' element={<Shelf val={val} setValue={(val) => setVal(val)} />} />
          <Route path='/bookshelf/:shelve' element={<Bookshelf val={val} setValue={(val) => setVal(val)} />} />
          <Route path='/book/:bookId' element={<Book val={val} setValue={(val) => setVal(val)} />} />
          <Route path='/allshelves' element={<AllShelves val={val} setValue={(val) => setVal(val)} />} />
          <Route path='/allshelves' element={<AllShelves val={val} setValue={(val) => setVal(val)} />} />
          <Route path='/profile' element={<Profile val={val} setValue={(val) => setVal(val)} />} />
        </Routes>
      </ValContext.Provider>
    </>
  );
}

export default App;
