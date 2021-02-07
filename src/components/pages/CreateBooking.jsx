/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import axios from 'axios'
import qs from 'qs'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { Icon, IconButton } from '@material-ui/core'
import './CreateBooking.css'
class CreateBooking extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user_email: '',
            user_id: '',
            pet_id: '5',
            pet_name: '',
            pets_details: [],
            client_notes: '',
            fee: '',
            arrival_date: '',
            departure_date: '',
            duration: '',
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
                    user_email: response.data.email,
                    user_id: response.data.id,
                })

                this.getAllPetsByUserId()
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getAllPetsByUserId() {
        const token = this.props.cookies.get('token')
        const config = {
            headers: {
                auth_token: token
            }
        }
        return axios
            .get('http://localhost:5000/api/vi/allpet', config)
            .then((response) => {
                console.log(response)
                this.setState({
                    pets_details: response.data,
                })

            })
            .catch((err) => {
                console.log(err);
            });

    }

    handleChange(e, elemName) {
        switch (elemName) {
            case 'arrival_date':
                this.setState({
                    arrival_date: e.target.value
                })
                break
            case 'departure_date':
                this.setState({
                    departure_date: e.target.value
                })
                break
            case 'pet_name':
                this.setState({
                    pet_name: e.target.value
                })
                break
            case 'client_notes':
                this.setState({
                    client_notes: e.target.value
                })
                break
            default:
        }

    }

    handleFormSubmission(e) {
        e.preventDefault() // prevent submit to another page

        this.setState({
            formMsg: []
        })

        axios.post('http://localhost:5000/api/v1/bookings/create', qs.stringify({
            user_email: this.state.user_email,
            user_id: this.state.user_id,
            pet_id: this.state.pet_id,
            pet_name: this.state.pet_name,
            client_notes: this.state.client_notes,
            fee: this.state.fee,
            arrival_date: this.state.arrival_date,
            departure_date: this.state.departure_date,
        }))
            .then(response => {
                console.log(response)
                this.setState({
                    user_email: '',
                    user_id: '',
                    pet_id: '',
                    pet_name: '',
                    client_notes: '',
                    fee: '',
                    arrival_date: '',
                    departure_date: '',

                })
            })
            .catch(error => {
                console.log(error)
            })

    }

    onPetNameChange = (event, values) => {
        this.setState({
            pet_name: values.pet_name
        }, () => {
            // This will output an array of objects
            // given by Autocompelte options property.
            console.log(this.state.pet_name);
        });
    }



    calculateFee() {
        console.log('clicked')
        if (this.state.arrival_date !== '') {
            if (this.state.departure_date !== '') {
                console.log(true)

                var start = moment(this.state.arrival_date);
                var end = moment(this.state.departure_date);
                var diff = end.diff(start, 'days') 

                console.log(diff)

                this.setState({
                    duration:diff
                })

            } else {
                console.log(false)
            }
            return
        } else {
            console.log(false)
        }

    }


    render() {
        return (
            <div className="create-booking">

                <div className="row">
                    <div className="container">
                        <h2>Enter your booking details</h2>
                    </div>
                </div>

                <form className="container" onSubmit={e => { this.handleFormSubmission(e) }}>
                    <div className="mb-3">
                        <label htmlFor="pet-name" className="form-label">Pet Name</label>
                        <Autocomplete
                            id="pet-name"
                            options={this.state.pets_details}
                            getOptionLabel={(pets_details) => pets_details.pet_name}
                            style={{ width: 1300 }}
                            onChange={this.onPetNameChange}
                            renderInput={(params) => <TextField {...params} label="Select Your Pet" variant="outlined" />}
                        />
                    </div>

                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-5">
                            <div className="form-group">
                                <input type="datetime-local" name="arrival_date" id="arrival_date" value={this.state.arrival_date} onChange={e => { this.handleChange(e, 'arrival_date'); this.calculateFee() }} className="form-control input-lg" />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-5">
                            <div className="form-group">
                                <input type="datetime-local" name="departure_date" id="departure_date" value={this.state.departure_date} onChange={e => { this.handleChange(e, 'departure_date'); this.calculateFee() }} className="form-control input-lg" />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-2">
                            <div className="form-group">
                                <input type="text" name="fee" id="fee" defaultValue={this.state.fee} className="form-control input-lg" />
                            </div>
                        </div>
                    </div>



                    <div className="mb-3">
                        <label htmlFor="client_notes" className="form-label">Client Notes</label>
                        <textarea type="text" value={this.state.client_notes} onChange={e => { this.handleChange(e, 'client_notes') }} className="form-control" id="client_notes" rows="3"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Booking</button>
                </form>

            </div>
        )
    }
}


export default withRouter(withCookies(CreateBooking))