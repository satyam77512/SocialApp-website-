import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Components/Signup.jsx';
import Login from './Components/Login.jsx';
import Logout from './Components/Logout.jsx';
import Profile from './Components/Profile.jsx';
import HomePage from './Components/HomePage.jsx';
import CreatePost from './Components/CreatePost.jsx';
import Update from './Components/Update.jsx';
import MyPosts from './Components/MyPost.jsx';
import SearchPage from './Components/SearchPage.jsx';
import ChangePassword from './Components/ChangePassword.jsx';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import {store, persistor} from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
    return(
        <>
        <Provider store = {store}>
          <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
              <Router>
                <Routes>
                  <Route path='/signup' element={<Signup/>}/>
                  <Route path='/' element={<Login/>}/>
                  <Route path='/create' element={<CreatePost/>}/>
                  <Route path='/home' element={<HomePage/>}/>
                  <Route path='/logout' element={<Logout/>}/>
                  <Route path='/profile' element={<Profile/>}/>
                  <Route path='/update' element={<Update/>}/>
                  <Route path='/myposts' element={<MyPosts/>}/>
                  <Route path='/search' element={<SearchPage/>}/>
                  <Route path='/changePassword/:token/:time' element={<ChangePassword/>}/>
                </Routes>
              </Router>
          </PersistGate>
        </Provider>
        </>
    )
}

export default App
