import { Outlet } from "react-router-dom"
import Header from "../components/forAdmin/Header";
import Navbar from "../components/forAdmin/Navbar";
import Footer from "../components/UI/Footer"
import HeaderUser from "../components/componentsForUser/HeaderUser";

function Home() {
    return (
        <>
            <Header/>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Home;
