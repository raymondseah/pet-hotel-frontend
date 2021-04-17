/* eslint-disable no-unused-vars */
import React from 'react'
import qs from 'qs'
import axios from 'axios'
import jwt from 'jwt-decode'
import './CreatePet.css'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import UpdateIcon from '@material-ui/icons/Update';
import { Icon, IconButton } from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete';
import './BookingProfileById.css'
class GetBookingById extends React.Component {

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
            arrival_date: '',
            departure_date: '',
            employee_notes: '',
            client_notes: '',
            status: '',
            next_status: '',
            fee: '',
            formMsg: [],
            status_choices: ["awaiting confirmation", "awaiting arrival", "arrived", "departed", "booking cancelled"],
            pet_profile_url: '',
        }
    }

    componentDidMount() {
        const routeParams = this.props.match.params;
        console.log(routeParams)
        this.getCurrentBookingId(routeParams.id)
        this.getCurrentUserId()

    }

    handleChange(e, elemName) {
        switch (elemName) {
            case 'employee_notes':
                this.setState({
                    employee_notes: e.target.value
                })
                break;
            default:
        }
    }


    getPetImageById() {
        const id = this.state.pet_id
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

    getCurrentBookingId(id) {
        console.log(id);
        axios
            .get(`http://localhost:5000/api/v1/bookings/${id}`)
            .then((response) => {
                console.log(response.data.result)
                console.log(response.data.result.client_notes)
                this.setState({
                    pet_id: response.data.result.pet_id,
                    pet_name: response.data.result.pet_name,
                    arrival_date: response.data.result.arrival_date,
                    departure_date: response.data.result.departure_date,
                    client_notes: response.data.result.client_notes,
                    fee: response.data.result.fee,
                    status: response.data.result.status,
                    employee_notes: response.data.result.employee_notes
                },
                    this.getPetImageById
                );

            })
            .catch((err) => {
                console.log(err);
            });

    }

    handleDelete(e) {
        e.preventDefault()
        const routeParams = this.props.match.params;
        const id = routeParams.id
        axios
            .delete(`http://localhost:5000/api/v1/bookings/${id}`)
            .then((response) => {
                console.log(response)
                this.props.history.push('/users/allbookings')
            })
            // this.props.history.push('/users/allbookings')
            .catch((err) => {
                console.log(err);
            });

    }




    handleStatusChange(e) {
        e.preventDefault();

        const routeParams = this.props.match.params;
        const id = routeParams.id;
        console.log(id)
        axios.patch(`http://localhost:5000/api/v1/bookings/${id}/update`, qs.stringify({
            next_status: this.state.next_status
        }))
            .then(response => {
                console.log(response)


                console.log('ok')
            })
            .catch(err => {
                console.log(err)
            })

        window.location.reload();

    }

    onStatusChange = (event, values) => {
        this.setState({
            next_status: values
        }, () => {
            // This will output an array of objects
            // given by Autocompelte options property.
            console.log(this.state.next_status);
        });
    }


    employeNotesUpdate(e) {
        e.preventDefault()
        const routeParams = this.props.match.params;
        const id = routeParams.id;
        console.log(id)
        axios.patch(`http://localhost:5000/api/v1/bookings/${id}/notes/update`, qs.stringify({
            employee_notes: this.state.employee_notes
        }))
            .then(response => {
                console.log(response)


                console.log('ok')
            })
            .catch(err => {
                console.log(err)
            })

        window.location.reload();

    }

    render() {
        return (
            <div id="booking-by-id-page">


                <form className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src={this.state.pet_profile_url} alt="profile-pic" className="profile-pic rounded-circle" width="300" height="300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Pet Name:</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {this.state.pet_name}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Arrival Date & Time:</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {this.state.arrival_date}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Departure Date & Time:</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {this.state.departure_date}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Client Notes:</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {this.state.client_notes}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Fees:</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {this.state.fee}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Booking Status:</h6>
                                        </div>
                                        <div className="col-sm-3 text-secondary">
                                            {this.state.status}
                                        </div>
                                        <div className="col-sm-3 text-secondary">
                                            <Autocomplete
                                                id="pet-name"
                                                options={this.state.status_choices}
                                                getOptionLabel={(status_choices) => status_choices}
                                                onChange={this.onStatusChange}
                                                renderInput={(params) => <TextField {...params} label="update booking status" variant="outlined" />}
                                            />
                                        </div>
                                        <button className="col-3 btn" onClick={e => { this.handleStatusChange(e) }}>
                                            <IconButton>
                                                <UpdateIcon style={{ fontSize: '30px' }} />
                                                <h6> Update status</h6>
                                            </IconButton>
                                        </button>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Employee Notes:</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {this.state.employee_notes}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-10">
                                            <textarea className="col-10" row="4" id="employee-notes" placeholder={this.state.employee_notes} onChange={e => { this.handleChange(e, 'employee_notes') }} ></textarea>
                                        </div>
                                        <div className="col-sm-2">
                                            <button className="col-2 btn" onClick={e => { this.employeNotesUpdate(e) }}>
                                                <IconButton>
                                                    <UpdateIcon style={{ fontSize: '30px' }} />
                                                    <h6> Update status</h6>
                                                </IconButton></button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <button className="col-2 btn" onClick={e => { this.handleDelete(e) }}>
                                                <IconButton>
                                                    <DeleteIcon style={{ fontSize: '30px' }} />
                                                    <h6> Delete Bookings</h6>
                                                </IconButton></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}

export default withRouter(withCookies(GetBookingById))