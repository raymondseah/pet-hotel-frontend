/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import axios from 'axios'
import qs from 'qs'
import { withCookies } from 'react-cookie'
import { withRouter, Link } from 'react-router-dom'
import moment from 'moment'
import { DataGrid } from '@material-ui/data-grid';
import './ShowAllBookingsByUser.css'


class ShowAllBookingsByUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            user_id: '',
            all_bookings: [],
            columns: [

                { field: 'pet_name', headerName: 'Pet Name', width: 200 },
                { field: 'arrival_date', headerName: 'Arrival Date', width: 400 },
                { field: 'departure_date', headerName: 'Departure Date', width: 400 },
                { field: 'status', headerName: 'Booking Status', width: 300 },
                {
                    field: 'id', headerName: "View", width: 300,
                    renderCell: (params) => (
                        <strong>
                            <Link to={{
                                pathname: `/userbooking/${params.value}`,
                            }}><p className="host-by text-1xl font-medium text-indigo-500" >Click to see booking details</p>
                            </Link>
                        </strong>
                    ),
                }
            ]

        }
    }

    componentDidMount() {

        this.getSingleUserProfile()

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
                this.getAllBookingsByUser()
            })
            .catch((err) => {
                console.log(err);
            });

    }


    getAllBookingsByUser() {

        const token = this.props.cookies.get('token')
        const config = {
            headers: {
                auth_token: token
            }
        }
        return axios
            .get('http://localhost:5000/api/vi/allbooking', config)
            .then((response) => {
                console.log(response)
                this.setState({
                    all_bookings: response.data
                })
            })
            .catch((err) => {
                console.log(err);
            });

    }

    render() {
        return (
            
            <div id="all-bookings-by-user-page" style={{ height: 900, width: '100%' }}>
                <DataGrid rows={this.state.all_bookings} columns={this.state.columns} pageSize={5} checkboxSelection/>
                
            </div>
        )
    }
}



export default withRouter(withCookies(ShowAllBookingsByUser))