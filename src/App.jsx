/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from 'axios'
import UploadPetProfileImage from './components/pages/UploadPetProfileImage'
import CreatePet from './components/pages/CreatePet'
import UserRegister from './components/pages/Register'
import UserLogin from './components/pages/Login'
import UserProfile from './components/pages/UserProfile'
import UserImageUpload from './components/pages/UserProfileImageUpload'
import PetProfileById from './components/pages/PetProfileById'
import CreateBookingPage from './components/pages/CreateBooking'
import Home from './components/pages/Home'
import SiteHeader from './components/SiteHeader'
import SideBar from './components/SideBar'
import SiteFooter from './components/SiteFooter';
import ShowAllPetByUser from './components/pages/ShowAllPetByUser'

function App() {

  return (
    <div className="App">
      <Router>
        <SiteHeader/>
        {/* <SideBar /> */}
        <Switch>
          <Route path="/users/register" component={UserRegister}></Route>
          <Route path="/users/login" component={UserLogin}></Route>



          <Route path="/users/profile/image/upload" component={UserImageUpload}></Route>
          <Route path="/users/profile" component={UserProfile}></Route>

          <Route path="/booking/create" component={CreateBookingPage}></Route>

          <Route path="/pet/:id" component={PetProfileById}></Route>
          <Route path="/show/allpet" component={ShowAllPetByUser}></Route>
          <Route path="/create/pet/" component={CreatePet}></Route>

          <Route path="/" component={Home}></Route>
        </Switch>
        <SiteFooter/>
      </Router>
    </div>
  );
}

export default App;
