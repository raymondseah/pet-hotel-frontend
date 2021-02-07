/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Icon, IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { HashLink as HLink } from 'react-router-hash-link';
import { Home } from '@material-ui/icons';
import { Info } from '@material-ui/icons'
import { ContactMail } from '@material-ui/icons'
import { Dashboard, PersonSharp, AddCircleOutline, EventAvailable, ExitToApp } from '@material-ui/icons'
import AssignmentIcon from '@material-ui/icons/Assignment';
import './SiteHeader.css'
class SiteHeader extends Component {



    openNav() {
        console.log('clicked')
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }

    closeNav() {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    }


    render() {
        return (
            <div id="site-header">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">


                        <div id="main">
                            <IconButton onClick={this.openNav}>
                                <AssignmentIcon className="openbtn"/><div>☰Dashboard</div>
                            </IconButton>
                        </div>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav container-fluid justify-content-end">
                                <li className="nav-item">
                                    <IconButton>
                                        <Home style={{ fontSize: '20px' }} /><HLink to="/#page-home" className="nav-link">Home</HLink>
                                    </IconButton>
                                </li>
                                <li className="nav-item">
                                    <IconButton>
                                        <PersonSharp style={{ fontSize: '20px' }} /><Link to="/users/login" className="nav-link">Login</Link>
                                    </IconButton>
                                </li>
                                <li className="nav-item">
                                    <IconButton>
                                        <AddCircleOutline style={{ fontSize: '20px' }} /><Link to="/users/register" className="nav-link">Register</Link>
                                    </IconButton>
                                </li>
                                <IconButton fontSize="small">
                                    <ExitToApp style={{ fontSize: '20px' }} /><Link to="/" className="nav-link" >Logout</Link>
                                </IconButton>
                            </ul>
                        </div>
                    </div>

                </nav>

                <div id="mySidebar" className="sidebar">
                    <a href="#" className="closebtn" onClick={this.closeNav}>×</a>
                    <a href="/show/allpet">See All Pets</a>
                    <a href="/booking/create">Create Booking</a>
                    <a href="#">Clients</a>
                    <a href="#">Contact</a>
                    <a href="/users/profile">User Profile</a>
                </div>
            </div>
        )
    }
}


export default (SiteHeader)