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
function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/users/register" component={UserRegister}></Route>
          <Route path="/users/login" component={UserLogin}></Route>
          <Route path="/users/profile" component={UserProfile}></Route>

          <Route path="/create/pet/:id/profile" component={UploadPetProfileImage}></Route>
          <Route path="/create/pet/" component={CreatePet}></Route>


        </Switch>
      </Router>
    </div>
  );
}

export default App;
