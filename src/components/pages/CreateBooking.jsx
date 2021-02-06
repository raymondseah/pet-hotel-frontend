/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import axios from 'axios'
import qs from 'qs'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class CreateBooking extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user_email: '',
            user_id: '',
            pet_id:'5',
            pet_name: '5',
            client_notes: '',
            fee: '5',
            arrival_date: '',
            departure_date:'',
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
            pet_id:this.state.pet_id,
            pet_name: this.state.pet_name,
            client_notes: this.state.client_notes,
            fee: this.state.fee,
            arrival_date: this.state.arrival_date,
            departure_date:this.state.departure_date,
        }))
            .then(response => {
                console.log(response)
                this.setState({
                    user_email: '',
                    user_id: '',
                    pet_id:'',
                    pet_name: '',
                    client_notes: '',
                    fee: '',
                    arrival_date: '',
                    departure_date:'',

                })
            })
            .catch(error => {
                console.log(error)
            })

    }

    render() {
        return (
            <div className="container">

                <div className="row">
                    <div className="container">
                        <h2>Enter your booking details</h2>
                    </div>
                </div>

                <form className="container" onSubmit={e => { this.handleFormSubmission(e) }}>
                    <div className="mb-3">
                        <label htmlFor="pet-name" className="form-label">Pet Name</label>
                        <input type="text" value={this.state.pet_name} onChange={e => { this.handleChange(e, 'pet_name') }} className="form-control" id="pet-name" />
                    </div>

                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-6">
                            <div className="form-group">
                                <input type="datetime-local" name="arrival_date" id="arrival_date" value={this.state.arrival_date} onChange={e => { this.handleChange(e, 'arrival_date') }} className="form-control input-lg"/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6">
                            <div className="form-group">
                                <input type="datetime-local" name="departure_date" id="departure_date" value={this.state.departure_date} onChange={e => { this.handleChange(e, 'departure_date') }} className="form-control input-lg"/>
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