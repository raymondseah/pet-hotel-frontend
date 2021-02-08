/* eslint-disable no-unused-vars */
import React from 'react'
import qs from 'qs'
import axios from 'axios'
import jwt from 'jwt-decode'
import './CreatePet.css'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
class GetBookingById extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            //create state to help control the loading of image
            pet_id:'',
            first_name: '',
            last_name: '',
            email: '',
            client_id: '',
            pet_name: '',
            pet_type: '',
            pet_breed: '',
            pet_profile_url:'',
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
                pet_id:response.data.result.id,
                pet_name:response.data.result.pet_name,
                pet_type:response.data.result.pet_type,
                pet_breed:response.data.result.pet_breed,


            });

          })
          .catch((err) => {
            console.log(err);
          });

    }

    getPetImageById(id) {

        return axios
            .get(`http://localhost:5000/api/v1/pet/${id}/profileimage`)
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
           <div>

            </div>
        )
    }
}

export default withRouter(withCookies(GetBookingById))