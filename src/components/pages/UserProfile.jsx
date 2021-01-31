/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import qs from 'qs'
import jwt from 'jwt-decode'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'

class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            user_id: '',
            profile_pic_url: 'https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg',
            image_selected:'',
            set_image_selected:'',
        }
    }

    componentDidMount() {

        this.getSingleUserProfile()
        this.confirmUser();
        this.confirmLogin();
        // this.checkImageURL();
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
                console.log(response)
                this.setState({
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    email: response.data.email,
                })
            })
            .catch((err) => {
                console.log(err);
            });

    }

    checkImageURL() {
        if (this.state.profile_pic_url !== 'https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg') {
            return false
        }
        return true;
    }


    confirmUser() {
        // get token
        const token = this.props.cookies.get("token");
        try {
            const decodedToken = jwt(token);
            if (decodedToken.username === this.state.event.hosted_by) {
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    confirmLogin() {
        const token = this.props.cookies.get("token");

        try {
            const decodedToken = jwt(token);
            if (!decodedToken) {
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    }



    handleFormSubmission(e) {
        e.preventDefault()



    }

    render() {
        return (
            <div id="page-userProfile" className="container">
                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="image_outer_container">
                            <div className="green_icon"></div>
                            <div className="image_inner_container">
                                <img src={this.state.profile_pic_url} alt="Profile" />
                            </div>
                            <button href="/users/profile/imageupload"> Upload Profile Picture </button>
                        </div>

                    </div>
                </div>


                <div>
                    <div className="row">
                        <div className="col-sm-6 col-md-4">
                            First Name :
                    </div>
                        <div className="col-sm-6 col-md-4">
                            {this.state.first_name}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6 col-md-4">
                            Last Name :
                    </div>
                        <div className="col-sm-6 col-md-4">
                            {this.state.last_name}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6 col-md-4">
                            Email :
                    </div>
                        <div className="col-sm-6 col-md-4">
                            {this.state.email}
                        </div>
                    </div>
                </div>
                <input className="btn btn-lg btn-success btn-block" type="submit" value="Edit Profile" />


            </div>
        )
    }
}

export default withRouter(withCookies(UserProfile))
