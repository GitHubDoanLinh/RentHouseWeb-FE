import { Outlet } from "react-router-dom"
import HeaderUser from "../../components/componentsForUser/HeaderUser"
import NavbarUser from "../../components/componentsForUser/NavbarUser"
import Footer from "../../components/UI/Footer"

function UserPage() {
    return (
        <>
            <HeaderUser/>
            <NavbarUser/>
            <Outlet/>
            <Footer/>   
        </>
    )
}

export default UserPage
