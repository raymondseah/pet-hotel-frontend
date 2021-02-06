/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import qs from 'qs'
import moment from 'moment'
import Ajv from 'ajv'
import LoginValidationSchema from '../../validation-schemas/login'
import { withCookies } from 'react-cookie'
import { withRouter, Link } from 'react-router-dom'
import './Login.css'
const ajv = new Ajv({ allErrors: true })

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            formErr: [],
        }
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleFormSubmission(e) {
        e.preventDefault()

        this.setState({
            formErr: []
        })

        // validate form
        const formValid = this.validateFormInputs()

        if (formValid) {

            // make api call to login
            axios.post('http://localhost:5000/api/v1/users/login', qs.stringify({
                email: this.state.email,
                password: this.state.password,
            }))
                .then(response => {
                    if (!response.data.success) {
                        this.setState({
                            formErr: "Email is incorrect, please try again"
                        })
                        return
                    }

                    this.props.cookies.set('token', response.data.token, {
                        path: '/',
                        expires: moment.unix(response.data.expiresAt).toDate()
                    })

                    this.props.history.push('/users/profile')
                })

                .catch(err => {
                    this.setState({
                        formErr: "Email or username is incorrect, please try again"
                    })
                })

        }

    }

    validateFormInputs() {
        const err = []

        const formValid = ajv.validate(LoginValidationSchema, this.state)

        if (!formValid) {
            ajv.errors.forEach(e => {
                let field = e.dataPath.toUpperCase()
                err.push(`${field} field ${e.message}`)
            })
        }

        if (err.length === 0) {
            return true
        }

        this.setState({
            formErr: err
        })

        return false
    }

    render() {
        return (
            <div id="page-login">

                <div className="row container">
                    <form onSubmit={e => { this.handleFormSubmission(e) }}>
                        <fieldset>
                            <h2>Already have an account? Please Login</h2>
                            <hr className="colorgraph" />
                            <div className="form-group">
                                <input className="form-control" type="email" onChange={e => { this.handleEmailChange(e) }} name="email" value={this.state.email} placeholder="Email Address" />
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="password" onChange={e => { this.handlePasswordChange(e) }}  name="password"  value={this.state.password}  placeholder="Password" />
                            </div>
                            <hr className="colorgraph" />
                            <div className="row">
                                <div className="col-xs-6 col-sm-6 col-md-6">
                                    <input type="submit" className="btn btn-lg btn-success btn-block" value="Sign In" />
                                </div>
                                <div className="col-xs-6 col-sm-6 col-md-6">
                                    <a href="/users/register" className="btn btn-lg btn-primary btn-block">Register</a>
                                </div>
                            </div>
                        </fieldset>
                    </form>



                </div>

            </div>
        )
    }
}

export default withRouter(withCookies(Login))
