/* eslint-disable no-unused-vars */
import React from 'react'
import qs from 'qs'
import axios from 'axios'
import jwt from 'jwt-decode'
import './CreatePet.css'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import logo from '../../images/loading.gif'
import EditIcon from '@material-ui/icons/Edit';
import { Icon, IconButton } from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete';
import './PetProfileById.css'
import { Spring, animated } from 'react-spring/renderprops'

class GetPetById extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            //create state to help control the loading of image
            pet_id: '',
            first_name: '',
            last_name: '',
            email: '',
            client_id: '',
            pet_name: '',
            pet_type: '',
            pet_breed: '',
            pet_profile_url: '',
            imageUrl: '',
            imageAlt: '',
            formMsg: [],
        }
    }

    componentDidMount() {
        const routeParams = this.props.match.params;
        this.getCurrentPetId(routeParams.id)
        this.getPetImageById(routeParams.id)
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
            .get('https://pawllywood-hotel-server.herokuapp.com/api/v1/users/profile', config)
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
            .get(`https://pawllywood-hotel-server.herokuapp.com/api/v1/pets/${id}`)
            .then((response) => {
                console.log(response.data.result)
                this.setState({
                    pet_id: response.data.result.id,
                    pet_name: response.data.result.pet_name,
                    pet_type: response.data.result.pet_type,
                    pet_breed: response.data.result.pet_breed,


                });

            })
            .catch((err) => {
                console.log(err);
            });

    }

    getPetImageById(id) {

        return axios
            .get(`https://pawllywood-hotel-server.herokuapp.com/api/v1/pet/${id}/profileimage`)
            .then((response) => {
                console.log(response)
                this.setState({
                    pet_profile_url: response.data.profile_pic_url,
                })
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    pet_profile_url: 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg',
                })
            });
    }

    handleFormSubmission(e) {
        e.preventDefault() // prevent submit to another page

        this.setState({
            formMsg: []
        })

        axios.post('https://pawllywood-hotel-server.herokuapp.com/api/v1/pets/create', qs.stringify({
            pet_name: this.state.pet_name,
            pet_type: this.state.pet_type,
            pet_breed: this.state.pet_breed,
            client_id: this.state.client_id,
            email: this.state.email
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

    uploadPetImage(e) {
        e.preventDefault()
        const routeParams = this.props.match.params
        const id = routeParams.id

        axios.post(`https://pawllywood-hotel-server.herokuapp.com/api/v1/pet/${id}/profile/upload`, qs.stringify({
            pet_profile_url: this.state.imageUrl,
            user_id: this.state.client_id,
            email: this.state.email,
            pet_id: this.state.pet_id
        }))
            .then(response => {
                console.log("SENT")
                this.setState({
                    imageUrl: '',
                })
                this.props.history.push('/')
                this.props.history.push(`/pet/${id}`)

            })
            .catch(err => {
                console.log(err)
            })



    }

    deletePetImage(e) {
        e.preventDefault()
        const routeParams = this.props.match.params
        const id = routeParams.id

        axios.delete(`https://pawllywood-hotel-server.herokuapp.com/api/v1/pet/${id}/profile/delete`)
            .then((response) => {
                console.log(response);
                this.props.history.push('/')
                this.props.history.push(`/pet/${id}`)

            })
            .catch((err) => {
                console.log(err);
            });
    }
    handleImageUpload = () => {
        const { files } = document.querySelector('input[type="file"]');
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "evwsdnzn");
        axios.post("https://api.cloudinary.com/v1_1/dyrzeqduc/image/upload", formData)
            .then((response) => {
                console.log(response)
                console.log('ok')
                this.setState({
                    imageUrl: response.data.secure_url,
                    imageAlt: `An image of ${response.data.original_filename}`,
                });
            })
            .catch((err) => console.log(err));
    };

    handleDelete(e) {
        e.preventDefault()
        const routeParams = this.props.match.params;
        const id = routeParams.id
        axios
            .delete(`https://pawllywood-hotel-server.herokuapp.com/api/v1/pets/${id}`)
            .then((response) => {
                console.log(response)

            })
            // this.props.history.push('/users/allbookings')
            .catch((err) => {
                console.log(err);
            });
        this.props.history.push('/users/allpet')

        window.location.reload();
    }

    confirmImageLoading() {
        if (this.state.imageUrl !== '') {
            return true
        }

        return false
    }



    render() {
        return (
            <div id="pet-profile-page">
                <div className="container">
                    <div className="main-body">
                        <div className="row gutters-sm">
                            <div className="col-md-4 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <img src={this.state.pet_profile_url} alt="profile-pic" className="profile-pic rounded-circle" width="300" height="300" />



                                            {this.confirmImageLoading() ? (
                                                <div>

                                                    <button onClick={e => { this.uploadPetImage(e) }}>Upload Image</button>
                                                </div>

                                            ) : (
                                                    <div>
                                                        <input accept="image/*" type='file' onChange={this.handleImageUpload} />
                                                        <button onClick={e => { this.deletePetImage(e) }}>Delete Image</button>
                                                    </div>
                                                )}


                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Pet Name :</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {this.state.pet_name}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Pet Type :</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {this.state.pet_type}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Breed :</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {this.state.pet_breed}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <button type="submit" className="btn edit">
                                                <IconButton>
                                                    <EditIcon style={{ fontSize: '20px' }} />
                                                    Edit Pet Details
                                            </IconButton>
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <button type="submit" className="btn">
                                                <IconButton>
                                                    <DeleteIcon style={{ fontSize: '20px' }} />
                                                    Delete
                                            </IconButton>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>









            </div>
        )
    }
}

export default withRouter(withCookies(GetPetById))