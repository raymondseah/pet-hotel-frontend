/* eslint-disable no-unused-vars */
import React from 'react'
import qs from 'qs'
import axios from 'axios'
import jwt from 'jwt-decode'
import './CreatePet.css'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
class GetPetById extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            client_id: '',
            pet_name: '',
            pet_type: '',
            pet_breed: '',
            pet_profile_url:'',
            formMsg: [],
        }
    }

    componentDidMount() {
        const routeParams = this.props.match.params;
        this.getCurrentPetId(routeParams.id)
        this.getCurrentUserId()
    }

    getCurrentUserId() {
        const token = this.props.cookies.get('token')
        const config = {
            headers: {
                auth_token: token
            }
        }
        return axios
            .get('http://localhost:5000/api/v1/users/profile', config)
            .then((response) => {
                this.setState({
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    email: response.data.email,
                    client_id: response.data.id,
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getCurrentPetId(id) {
        console.log(id);
        axios
          .get(`http://localhost:5000/api/v1/pets/${id}`)
          .then((response) => {
              console.log(response.data.result)
            this.setState({
                pet_name:response.data.result.pet_name,
                pet_type:response.data.result.pet_type,
                pet_breed:response.data.result.pet_breed,


            });

          })
          .catch((err) => {
            console.log(err);
          });

    }

    handleFormSubmission(e) {
        e.preventDefault() // prevent submit to another page

        this.setState({
            formMsg: []
        })

        axios.post('http://localhost:5000/api/v1/pets/create', qs.stringify({
            pet_name: this.state.pet_name,
            pet_type: this.state.pet_type,
            pet_breed: this.state.pet_breed,
            client_id: this.state.client_id,
            email:this.state.email
        }))
            .then(response => {
                this.setState({
                    pet_name: '',
                    pet_type: '',
                    pet_breed: '',
                })
            })
            .catch(error => {
                console.log(error)
            })

    }
    render() {
        return (
            <div className="container">

                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="image_outer_container">
                            <div className="green_icon"></div>
                            <div className="image_inner_container">
                                <img src="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg" alt="Profile" />
                            </div>
                        </div>

                    </div>

                    <input accept="image/*" type='file' onChange={this.handleImageUpload} />
                    <button onClick={e => { this.uploadImage(e) }}>Upload Image</button>
                    <button onClick={e => { this.deleteImage(e) }}>Delete Image</button>
                </div>

                <div>
                    <div className="row">
                        <div className="col-sm-6 col-md-4">
                            Pet Name :
                    </div>
                        <div className="col-sm-6 col-md-4">
                            {this.state.pet_name}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6 col-md-4">
                            Pet Type :
                    </div>
                        <div className="col-sm-6 col-md-4">
                            {this.state.pet_type}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6 col-md-4">
                            Pet Breed :
                    </div>
                        <div className="col-sm-6 col-md-4">
                            {this.state.pet_breed}
                        </div>
                    </div>
                </div>
                <input className="btn btn-lg btn-success btn-block" type="submit" value="Edit Profile" />







            </div>
        )
    }
}

export default withRouter(withCookies(GetPetById))