/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import axios from 'axios'
import qs from 'qs'
import { withCookies } from 'react-cookie'
import { withRouter, Link } from 'react-router-dom'

import { DataGrid } from '@material-ui/data-grid';

class ShowAllPetByUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            user_id: '',
            all_pets: [],
            columns: [

                { field: 'pet_name', headerName: 'pet_name', width: 200 },
                { field: 'pet_type', headerName: 'pet_type', width: 200 },
                { field: 'pet_breed', headerName: 'pet_breed', width: 200 },
                {
                    field: 'id', headerName: "View", width: 200,
                    renderCell: (params) => (
                        <strong>
                            <Link to={{
                                pathname: `/pet/${params.value}`,
                            }}><p className="host-by text-1xl font-medium text-indigo-500" >Click to see profile</p>
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
                this.getAllPetsByUser()
            })
            .catch((err) => {
                console.log(err);
            });

    }


    getAllPetsByUser() {

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
                    all_pets: response.data
                })
            })
            .catch((err) => {
                console.log(err);
            });

    }

    render() {
        return (
            <div id="all-pet-by-user-page" style={{ height: 900, width: '100%' }}>
                <DataGrid rows={this.state.all_pets} columns={this.state.columns} pageSize={5} checkboxSelection />
            </div>
        )
    }
}



export default withRouter(withCookies(ShowAllPetByUser))