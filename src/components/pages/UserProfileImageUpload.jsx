/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Axios from 'axios'
import jwt from 'jwt-decode'
import qs from 'qs'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import {Image} from 'cloudinary-react'

function UserProfileImageUpload() {
  const storedJwt = localStorage.getItem('token');
  const [imageSelected, setImageSelected] = useState(""); 
  const [public_Id,setPublic_Id] = useState("");
  const [imgURL, setImageURL] = useState('');

  const uploadImage = (files) => {

    const config = {
        headers: {
            auth_token: storedJwt
        }
    }
    // console.log(files)
    // console.log(files[0])
    const formData = new FormData()
    formData.append("file",imageSelected)
    formData.append("upload_preset", "evwsdnzn")


    Axios.post("https://api.cloudinary.com/v1_1/dyrzeqduc/image/upload" , formData)
      .then((response) => {
        console.log(response.data)
        setPublic_Id(response.data.public_id)
        setImageURL(response.data.url)
        console.log(setImageURL)
      })
      .catch((error) => 
      console.log(error));
  }

  return (
    <div className="App">
      <input type='file' onChange={(event) => {
        setImageSelected(event.target.files[0])
      }} />
          <button onClick={(uploadImage)}> Upload Images </button>
    </div>

  );
}

export default withRouter(withCookies(UserProfileImageUpload))

