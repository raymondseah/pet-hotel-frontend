/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from 'axios'
import createPetPage from './components/pages/CreatePetPage'


function App() {

  const uploadImage = (files) => {
    console.log(files)
  }

  return (
    <div className="App">
      <Router>
        <Route path="/" component={createPetPage}></Route>

      </Router>
    </div>
  );
}

export default App;
