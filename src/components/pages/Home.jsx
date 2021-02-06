import React, { Component } from 'react'
import './Home.css'
class Home extends Component {
    render() {
        return (
            <div className="home-page">
                <div class="row container">
                    <div class="col-md-8 mb-5">
                        <h2>What We Do</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A deserunt neque tempore recusandae animi soluta quasi? Asperiores rem dolore eaque vel, porro, soluta unde debitis aliquam laboriosam. Repellat explicabo, maiores!</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis optio neque consectetur consequatur magni in nisi, natus beatae quidem quam odit commodi ducimus totam eum, alias, adipisci nesciunt voluptate. Voluptatum.</p>
                        <a class="btn btn-primary btn-lg" href="/users/register">Sign Up Now &raquo;</a>
                    </div>

                    <div class="col-md-4 mb-5">
                        <h2>Contact Us</h2>
                        <hr />
                        <address>
                            <strong>Start Bootstrap</strong>
                            <br />3481 Melrose Place
                            <br />Beverly Hills, CA 90210
                        </address>
                        <address>
                            <abbr title="Phone">Phone:</abbr>
                            <br />(123) 456-7890
                            <br /><abbr title="Email">Email:</abbr>
                            <br /><a href="mailto:#">name@example.com</a>
                        </address>
                    </div>
                </div>


            </div>
        )
    }
}

export default (Home)