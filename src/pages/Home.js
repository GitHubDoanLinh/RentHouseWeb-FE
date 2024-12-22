import Header from "../components/forAdmin/Header";
import {Outlet} from "react-router-dom";
import Footer from "../components/Footer";

import Navbar from "../components/forAdmin/Navbar";
import HeaderUser from "../components/componentsForUser/HeaderUser";

export const Home = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
}