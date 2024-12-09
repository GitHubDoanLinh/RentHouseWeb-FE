import Navbar from "../forAdmin/Navbar";
import NavbarUser from "./NavbarUser";
import {Link} from "react-router-dom";
import * as React from "react";
import HouseDetail from "./pages/user/HouseDetail";

function HeaderUser() {
    const logoutScreen = () => {
        localStorage.clear()
    }
    return (
        <>
            <header className="hero">
                <div className="hero-wrapper">
                    <div className="secondary-navigation">
                        <div className="container">
                            <ul className="left">
                                <li>
                            <span>
                                <i className="fa fa-phone"></i> +1 123 456 789
                            </span>
                                </li>
                            </ul>
                            <ul className="right">
                                <li>
                                    <a href="sign-in.html">
                                    <Link to={"/login"}><i className="fa fa-sign-in"></i>Log In</Link>
                                    </a>
                                </li>
                                <li>
                                    <a href="register.html">
                                        <Link to={"/register"}><i className="fa fa-pencil-square-o"></i>Register</Link>
                                    </a>
                                </li>
                                <li>
                                    <a href="register.html">
                                        <Link to={"/login"} onClick={logoutScreen}><i
                                            className="fa fa-pencil-square-o"></i>Logout</Link>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <NavbarUser/>
                    <div className="background">
                        <div className="background-image original-size">
                            <img src="assets/img/hero-background-icons.jpg" alt=""/>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default HeaderUser
