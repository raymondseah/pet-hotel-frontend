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

                    this.props.history.push('/')
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
            <div id="page-login" className="container">

                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Login via site</h3>
                            </div>
                            <div className="panel-body">
                                <form onSubmit={ e => { this.handleFormSubmission(e) } }>
                                    <fieldset>
                                        <div className="form-group">
                                            <input className="form-control" onChange={ e => { this.handleEmailChange(e) } }  placeholder="yourmail@example.com" name="email" type="text" value={this.state.email}/>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" onChange={ e => { this.handlePasswordChange(e) } } placeholder="Password" name="password" type="password" value={this.state.password} />
                                        </div>

                                        <input className="btn btn-lg btn-success btn-block" type="submit" value="Login" />
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(withCookies(Login))
