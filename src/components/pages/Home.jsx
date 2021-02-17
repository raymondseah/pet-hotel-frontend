import React, { Component } from 'react'
import './Home.css'
class Home extends Component {
    render() {
        return (
            <div className="home-page">
                <div class="row container">
                    <div class="col-md-8 mb-5">
                        <h2>What We Do</h2>
                        <p>we treat every pet like a baby because we know that is how much they mean to you. To us, your furbabies’ safety and comfort always come first. We make sure they are happy at our cosy home-like, family-oriented daycare, boarding and grooming.</p>
                        <a class="btn btn-primary btn-lg" href="/users/register">Sign Up Now &raquo;</a>
                    </div>

                    <div class="col-md-4 mb-5">
                        <h2>Contact Us</h2>
                        <hr />
                        <address>
                            <strong>Pawllywood</strong>
                            <br />79 Anson Road, #20-01
                        </address>
                        <address>
                            <abbr title="Phone">Phone:</abbr>
                            <br />(65) 456-7890
                            <br /><abbr title="Email">Email:</abbr>
                            <br /><a href="mailto:#">Pawllywood@example.com</a>
                        </address>
                    </div>
                </div>


            </div>
        )
    }
}

export default (Home)