import * as React from 'react';
import './headerStyle.css'
import {Link} from "react-router-dom";

const Header = () => {
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
                                    <a href="my-ads.html">
                                        <Link to={"/home"}><i className="fa fa-heart"></i>Wishlist</Link>
                                    </a>
                                </li>
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

                </div>

            </header>
        </>
    )
}

export default Header;