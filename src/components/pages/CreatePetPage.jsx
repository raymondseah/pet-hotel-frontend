/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Axios from 'axios'

function createPetPage() {
  
  const [imageSelected, setImageSelected] = useState(""); 
  const [imgURL, setImageURL] = useState('')

  const uploadImage = (files) => {
    // console.log(files)
    // console.log(files[0])
    const formData = new FormData()
    formData.append("file",imageSelected)
    formData.append("upload_preset", "evwsdnzn")


    Axios.post("https://api.cloudinary.com/v1_1/dyrzeqduc/image/upload" , formData)
      .then((response) => {
        console.log(response)
      })
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

export default createPetPage;
