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
            status_choices: ["awaiting confirmation", "awaiting arrival", "arrived", "departed", "booking cancelled"]
        }
    }

    componentDidMount() {
        const routeParams = this.props.match.params;
        console.log(routeParams)
        this.getCurrentBookingId(routeParams.id)
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

    getCurrentBookingId(id) {
        console.log(id);
        axios
            .get(`http://localhost:5000/api/v1/bookings/${id}`)
            .then((response) => {
                console.log(response.data.result)
                console.log(response.data.result.client_notes)
                this.setState({
                    pet_id: response.data.result.id,
                    pet_name: response.data.result.pet_name,
                    arrival_date: response.data.result.arrival_date,
                    departure_date: response.data.result.departure_date,
                    client_notes: response.data.result.client_notes,
                    fee: response.data.result.fee,
                    status: response.data.result.status,
                    employee_notes: response.data.result.employee_notes
                });

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




    render() {
        return (
            <div id="booking-by-id-page">


                <form className="container">
                    <div className="row">
                        <div className="col-4">Pet Name : </div>
                        <div className="col-8" id="pet-name" >{this.state.pet_name}</div>
                    </div>
                    <div className="row">
                        <div className="col-4">Arrival Date & Time : </div>
                        <div className="col-8" id="arrival-date" >{this.state.arrival_date}</div>
                    </div>
                    <div className="row">
                        <div className="col-4">Departure Date & Time : </div>
                        <div className="col-8" id="departure-date" >{this.state.departure_date}</div>
                    </div>
                    <div className="row">
                        <div className="col-4">Client Notes :</div>
                        <textarea className="col-8" row="3" id="client-notes" placeholder={this.state.client_notes}></textarea>
                    </div>
                    <div className="row">
                        <div className="col-3">Booking Status :</div>
                        <div className="col-3">{this.state.status}</div>
                        <div className="col-3">
                            <Autocomplete
                                id="pet-name"
                                options={this.state.status_choices}
                                getOptionLabel={(status_choices) => status_choices}
                                onChange={this.onStatusChange}
                                renderInput={(params) => <TextField {...params} label="update booking status" variant="outlined" />}
                            /></div>
                        <button className="col-3 btn btn-primary" onClick={e => { this.handleStatusChange(e) }}>Update Status</button>
                    </div>
                    <div className="row">
                        <div className="col-4">Fees :</div>
                        <div className="col-8" id="fee" >{this.state.fee}</div>
                    </div>
                    <a type="edit" className="btn btn-primary" href="/">Edit</a>
                    <button type="delete" className="btn btn-danger" onClick={e => { this.handleDelete(e) }}>Delete</button>
                    <div className="row">
                        <div className="col-4">Employee Notes :</div>
                        <textarea className="col-4" row="3" id="employee-notes" placeholder={this.state.client_notes}></textarea>
                        <button className="col-4 btn btn-primary" onClick={e => { this.handleStatusChange(e) }}>Submit Employee Notes</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(withCookies(GetBookingById))