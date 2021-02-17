/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import qs from 'qs'
import jwt from 'jwt-decode'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import logo from '../../images/loading.gif'
import './UserProfile.css'
class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            user_id: '',
            profile_pic_url: '',
            imageUrl: '',
            imageAlt: '',
        }
    }

    componentDidMount() {

        this.getSingleUserProfile()
        this.getSingleUserImage()
    }

    getSingleUserProfile() {
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
                    user_id: response.data.id,
                })
            })
            .catch((err) => {
                console.log(err);
            });

    }

    getSingleUserImage() {
        const token = this.props.cookies.get('token')
        const config = {
            headers: {
                auth_token: token
            }
        }
        return axios
            .get('http://localhost:5000/api/v1/users/profileimage', config)
            .then((response) => {
                console.log(response)
                this.setState({
                    profile_pic_url: response.data.profile_pic_url,
                })
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    profile_pic_url: 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg',
                })
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

    uploadImage(e) {
        e.preventDefault()
        const token = this.props.cookies.get('token')
        const config = {
            headers: {
                auth_token: token
            }
        }
        axios.post('http://localhost:5000/api/v1/users/profile/upload', qs.stringify({
            imageUrl: this.state.imageUrl,
            user_id: this.state.user_id,
            email: this.state.email,
        }), config)
            .then(response => {
                console.log("SENT")
                this.setState({
                    imageUrl: '',
                })
                this.props.history.push('/')
                this.props.history.push('/users/profile')

            })
            .catch(err => {
                console.log(err)
            })



    }

    deleteImage(e) {
        e.preventDefault()
        const token = this.props.cookies.get('token')
        const config = {
            headers: {
                auth_token: token
            }
        }

        axios.delete('http://localhost:5000/api/v1/users/profileimagedelete', config)
            .then((response) => {
                console.log(response);
                this.props.history.push('/')
                this.props.history.push('/users/profile')
            })
            .catch((err) => {
                console.log(err);
            });
    }


    handleFormSubmission(e) {
        e.preventDefault()



    }

    render() {


        return (
            <div id="page-userProfile">
                <div className="container">
                    <div className="main-body">


                        <div className="row gutters-sm">
                            <div className="col-md-4 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <img src={this.state.profile_pic_url} alt="profile-pic" className="rounded-circle" width="300" height="300" />
                                            <img src={logo} alt="loading-pic" className="loading-pic rounded-circle" width="300" height="300" />
                                            <input accept="image/*" type='file' onChange={this.handleImageUpload} />
                                            <button onClick={e => { this.uploadImage(e) }}>Upload Image</button>
                                            <button onClick={e => { this.deleteImage(e) }}>Delete Image</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">First Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {this.state.first_name}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Last Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {this.state.last_name}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {this.state.email}
                                            </div>
                                        </div>
                                    </div>
                                    <input className="btn btn-lg btn-success btn-block" type="submit" value="Edit Profile" />
                                    <input className="btn btn-lg btn-success btn-danger" type="submit" value="Delete Profile" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


                {/* <div className="">
                    <hr />
                    <div className="profile-card-6"><img src={this.state.profile_pic_url} className="img img-responsive" alt="Profile Pic" />
                        <div className="profile-name">{this.state.first_name}
                            <br />{this.state.last_name}
                            <br />{this.state.email}</div>
                    </div>

                </div> */}





            </div>
        )
    }
}

export default withRouter(withCookies(UserProfile))
