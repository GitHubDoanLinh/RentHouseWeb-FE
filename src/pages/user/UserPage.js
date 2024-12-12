import { Outlet } from "react-router-dom"
import HeaderUser from "../../components/componentsForUser/HeaderUser"
import Footer from "../../components/UI/Footer"

function UserPage() {
    return (
        <>
            <HeaderUser/>
            <Outlet/>
            <Footer/>   
        </>
    )
}

export default UserPage
