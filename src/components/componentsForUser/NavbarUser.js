import {Link} from "react-router-dom";
import * as React from "react";
function NavbarUser() {
    return (
        <>
            <div className="main-navigation">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light justify-content-between">
                        <a className="navbar-brand" href="index.html">
                            <img src="../assets/img/logo.png" alt=""/>
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbar" aria-controls="navbar" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbar">
                            <ul className="navbar-nav">
                                <li>
                                    <Link to={"house"} href="#"
                                          className="nav-link">Home</Link>
                                </li>
                                <li>
                                    <Link to={""} href="#"
                                          className="nav-link">Wishlist</Link>
                                </li>
                                <li className="nav-item has-child">
                                    <Link to={"profile/profile-detail"} className="nav-link" href="#">Your
                                        Profile</Link>
                                    <ul className="child">
                                        <li className="nav-item has-child">
                                            <Link to={"profile/profile-detail"} href="#"
                                                  className="nav-link">Profile</Link>
                                        </li>
                                        <li className="nav-item has-child">
                                            <Link to={"manager-house"} href="#" className="nav-link">Manager House</Link>
                                        </li>
                                        <li className="nav-item has-child">
                                            <Link to={""} href="#" className="nav-link">Message</Link>
                                        </li>
                                        <li className="nav-item has-child">
                                            <Link to={""} href="#" className="nav-link">Trips</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                  </nav>
                </div>
            </div>
        </>
    )
}

export default NavbarUser
