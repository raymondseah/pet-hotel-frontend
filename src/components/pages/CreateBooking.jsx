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
import AddIcon from '@material-ui/icons/Add';

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
            .get('https://pawllywood-hotel-server.herokuapp.com/api/v1/users/profile', config)
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
            .get('https://pawllywood-hotel-server.herokuapp.com/api/vi/allpet', config)
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


        axios.post('https://pawllywood-hotel-server.herokuapp.com/api/v1/bookings/create', qs.stringify({
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

    handleArrivalDateChange(e) {

        this.setState({
            arrival_date: e.target.value
        },
            this.calculateFee
        )

    }

    handleDepartureDateChange(e) {

        this.setState({
            departure_date: e.target.value
        },
            this.calculateFee
        )

    }

    calculateFee = () => {

        const totalUp = async () => {
            var start = moment(this.state.arrival_date);
            var end = moment(this.state.departure_date);
            var diff = end.diff(start, 'days')

            var feeTotal = (diff * 20)
            console.log(this.state.arrival_date)
            this.setState({
                duration: diff,
                fee: feeTotal
            })
        }
        totalUp()




        // if (this.state.arrival_date || this.state.departure_date !== '') {


        //     try {
        //         var diff = end.diff(start, 'days')
        //         console.log(diff)

        //         var feeTotal = (diff * 20)

        //         this.setState({
        //             duration: diff,
        //             fee: feeTotal
        //         })

        //     }
        //     catch (err) {
        //         console.log(err)

        //     }


        // } else {
        //     console.log(false)
        // }

    }


    render() {
        return (
            <div className="create-booking">
                <form className="container" onSubmit={e => { this.handleFormSubmission(e) }}>
                    <div className="row">
                        <div className="">
                            <h2>Enter your booking details</h2>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pet-name" className="form-label">Pet Name</label>
                        <Autocomplete
                        className="selector"
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
                                <label htmlFor="arrival_date" className="form-label">Arrival Date</label>
                                <input type="datetime-local" name="arrival_date" id="arrival_date" value={this.state.arrival_date} onChange={e => { this.handleArrivalDateChange(e) }} className="form-control input-lg" />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-5">
                            <div className="form-group">
                                <label htmlFor="departure_date" className="form-label">Departure Date</label>
                                <input type="datetime-local" name="departure_date" id="departure_date" value={this.state.departure_date} onChange={e => { this.handleDepartureDateChange(e) }} className="form-control input-lg" />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-2">
                            <div className="form-group">
                            <label htmlFor="fee" className="form-label">Calculated Fee</label>
                                <input type="text" name="fee" id="fee" defaultValue={this.state.fee} className="form-control input-lg" />
                            </div>
                        </div>
                    </div>



                    <div className="mb-3 client-notes">
                        <label htmlFor="client_notes" className="form-label">Client Notes</label>
                        <textarea type="text" value={this.state.client_notes} onChange={e => { this.handleChange(e, 'client_notes') }} className="form-control" id="client_notes" rows="3"></textarea>
                    </div>

                    <button type="submit" className="btn">
                        <IconButton>
                            <AddIcon style={{ fontSize: '20px' }} />
                        Submit Booking
                        </IconButton>
                    </button>
                </form>

            </div>
        )
    }
}


export default withRouter(withCookies(CreateBooking))