import React from 'react'
import axios from 'axios'
import qs from 'qs'
import moment from 'moment'
import Ajv from 'ajv'
import RegistrationValidationSchema from '../../validation-schemas/registration'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import './Register.css'

const ajv = new Ajv({ allErrors: true })
class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            formErr: [],
            formMsg: []
        }
    }

    handleChange(e, elemName) {
        switch (elemName) {
            case 'email':
                this.setState({
                    email: e.target.value
                })
                break
            case 'first_name':
                this.setState({
                    first_name: e.target.value
                })
                break
            case 'last_name':
                this.setState({
                    last_name: e.target.value
                })
                break
            case 'password':
                this.setState({
                    password: e.target.value
                })
                break
            default:
        }
    }

    handleFormSubmission(e) {
        e.preventDefault()

        this.setState({
            formErr: [],
            formMsg: []
        })

        // validate form
        const formValid = this.validateFormInputs()

        if (formValid) {

            const userObject = {
                email: this.state.email,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                password: this.state.password,
            }

            // make api call to register
            axios.post('http://localhost:5000/api/v1/users/register', qs.stringify(userObject))
                .then(response => {

                    console.log(response.data)

                    this.props.cookies.set('token', response.data.token, {
                        path: '/',
                        expires: moment.unix(response.data.expiresAt).toDate()
                    })

                    this.props.history.push('/users/login')

                })

                .catch(err => {
                    console.log(err)
                    this.setState({
                        formMsg: "Username or email is taken, please try again"
                    })
                })

        }

    }

    validateFormInputs() {
        const err = []

        const formValid = ajv.validate(RegistrationValidationSchema, this.state)

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
            <div id="page-register" className="container">
                <div className="row">
                    <div className="">
                        <form onSubmit={e => { this.handleFormSubmission(e) }}>
                            <h2>Please Sign Up <small>It's free and always will be.</small></h2>
                            <hr className="colorgraph" />
                            <div className="row">
                                <div className="col-xs-12 col-sm-6 col-md-6">
                                    <div className="form-group">
                                        <input type="text" name="first_name" id="first_name" value={this.state.first_name} onChange={e => { this.handleChange(e, 'first_name') }} className="form-control input-lg" placeholder="First Name" tabIndex="1" />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6 col-md-6">
                                    <div className="form-group">
                                        <input type="text" name="last_name" id="last_name" value={this.state.last_name} onChange={e => { this.handleChange(e, 'last_name') }} className="form-control input-lg" placeholder="Last Name" tabIndex="2" />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <input type="email" name="email" id="email" value={this.state.email} onChange={e => { this.handleChange(e, 'email') }} className="form-control input-lg" placeholder="Email Address" tabIndex="4" />
                            </div>

                            <div className="form-group">
                                <input type="password" name="password" id="password" value={this.state.password} onChange={e => { this.handleChange(e, 'password') }} className="form-control input-lg" placeholder="Password" tabIndex="5" />
                            </div>


                            <hr className="colorgraph" />

                            {
                                            this.state.formErr.length > 0 ?
                                                (
                                                    <div className="form-group">
                                                        {
                                                            this.state.formErr.map(msg => {
                                                                return (
                                                                    <p>{msg}</p>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                ) :
                                                ''
                                        }
                                        {
                                            this.state.formMsg !== '' ? (
                                                <div className="form-group">
                                                    <p>{this.state.formMsg}</p>
                                                </div>
                                            ) :
                                                ''
                                        }
                            <div className="row">
                                <div className="col-xs-12 col-md-6"><input type="submit" value="Register" className="btn btn-primary btn-block btn-lg" tabIndex="6" /></div>
                                <div className="col-xs-12 col-md-6"><a href="/users/login" className="btn btn-success btn-block btn-lg">Sign In</a></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >

        )
    }
}

export default withRouter(withCookies(Login))

