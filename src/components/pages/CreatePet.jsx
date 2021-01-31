/* eslint-disable no-unused-vars */
import React from 'react'
import qs from 'qs'
import Axios from 'axios'
import './CreatePet.css'

class CreatePet extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            client_id:'',
            pet_name: '',
            pet_type:'',
            pet_breed: '',
            formMsg: [],
        }
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

        Axios.post('http://localhost:5000/api/v1/pets/create', qs.stringify({
            pet_name: this.state.pet_name,
            pet_type: this.state.pet_type,
            pet_breed: this.state.pet_breed,
        }))
            .then(response => {
                console.log(response.data)
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
                                <img src="https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg" alt="Profile" />
                            </div>
                        </div>
                    </div>
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

export default CreatePet;