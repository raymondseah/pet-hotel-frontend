/* eslint-disable no-unused-vars */
import React from 'react'
import qs from 'qs'
import axios from 'axios'
import jwt from 'jwt-decode'
import './CreatePet.css'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
class CreatePet extends React.Component {

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

    handleChange(e, elemName) {
        switch (elemName) {
            case 'pet_name':
                this.setState({
                    pet_name: e.target.value
                })
                break;
            case 'pet_type':
                this.setState({
                    pet_type: e.target.value
                })
                break;
            case 'pet_breed':
                this.setState({
                    pet_breed: e.target.value
                })
                break;
            default:
        }
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
        }))
            .then(response => {
                console.log(response)
                this.setState({
                    pet_name: '',
                    pet_type: '',
                    client_id: '',
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
                                <img src={this.state.pet_profile_url} alt="Profile" />
                            </div>
                        </div>

                    </div>

                    <input accept="image/*" type='file' onChange={this.handleImageUpload} />
                    <button onClick={e => { this.uploadImage(e) }}>Upload Image</button>
                    <button onClick={e => { this.deleteImage(e) }}>Delete Image</button>
                </div>


                <form className="container" onSubmit={e => { this.handleFormSubmission(e) }}>
                    <div className="mb-3">
                        <label htmlFor="pet-name" className="form-label">Pet Name</label>
                        <input type="text" value={this.state.pet_name} onChange={e => { this.handleChange(e, 'pet_name') }} className="form-control" id="pet-name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pet-type" className="form-label">Pet Type</label>
                        <select value={this.state.pet_type} onChange={e => { this.handleChange(e, 'pet_type') }} className="form-control" id="pet-type">
                            <option>---PLEASE SELECT---</option>
                            <option>Dog</option>
                            <option>Cat</option>
                            <option>Birds</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pet-breed" className="form-label">Pet Breed</label>
                        <input type="text" value={this.state.pet_breed} onChange={e => { this.handleChange(e, 'pet_breed') }} className="form-control" id="pet-breed" />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Pet</button>
                </form>






            </div>
        )
    }
}

export default withRouter(withCookies(CreatePet))