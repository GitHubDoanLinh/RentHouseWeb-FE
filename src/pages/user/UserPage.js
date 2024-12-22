import {Outlet} from "react-router-dom";
import Footer from "../../components/Footer";
import HeaderUser from "../../components/componentsForUser/HeaderUser";
import NavbarUser from "../../components/componentsForUser/NavbarUser";


export default function UserPage() {
    return (
        <>
            <HeaderUser/>
            <Outlet/>
            <Footer/>
        </>
    )
}