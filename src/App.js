import {Home} from "./pages/Home";
import {Navigate, Route, Routes} from "react-router-dom";
import UserManager from "./pages/admin/UserManager";
import HouseManager from "./pages/admin/HouseManager";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import UserPage from "./pages/user/UserPage";
import ListHouse from "./pages/user/ListHouse";

import Profile from "./pages/user/profile/Profile";
import ChangePassword from "./pages/user/profile/ChangePassword";
import ProfileDetail from "./pages/user/profile/ProfileDetail";
import Bookmarks from "./pages/user/profile/BookMarks";
import ListHouseOfUser from "./pages/user/managerHouse/ListHouseOfUser";
import ImageUpload from "./firebase/ImageUpload";
import {useSelector} from "react-redux";
import {CreateConvenient} from "./pages/houses/convenient/AddConvenientToHouse";
import {UpdateHouse} from "./pages/houses/update/UpdateHouse";
import HouseDetail from "./pages/houses/HouseDetail";
import CreateHouse from "./pages/houses/create/CreateHouse";
import ShowFormImageUpdate from "./pages/houses/update/ShowUpdateImage";
import ManagerHouse from "./pages/user/managerHouse/ManagerHouse";
import HistoryBuy from "./pages/user/profile/HistoryBuy";
import {ToastContainer} from "react-toastify";
import SoldItem from "./pages/user/managerHouse/SoldItem";
// import MoneyDiagram from "./pages/user/managerHouse/MoneyDiagram";
import RegisterHost from "./pages/user/RegisterHost";


function App() {
    const currentUser = useSelector(({users}) => {
        return users.currentToken;
    })
    let isOwner;
    if (currentUser) {
        const decodedToken = JSON.parse(atob(currentUser.accessToken.split('.')[1]));
        isOwner = decodedToken.isOwner;
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ height: "40px" }}
            />
            {/* Same as */}
            <Routes>
                <Route path="/" element={<Login/>}/>
                {
                    currentUser ? (
                        <>
                            <Route element={<UserPage/>}>
                                <Route path={'house'} element={<ListHouse/>}/>
                                <Route path={'house/:id'} element={<HouseDetail/>}/>
                                <Route path={"register-host/:id"} element={<RegisterHost/>}/>
                                <Route path={'profile'} element={<Profile/>}>
                                    <Route path={"change-password"} element={<ChangePassword/>}/>
                                    <Route path={`profile-detail/:id`} element={<ProfileDetail/>}/>
                                    <Route path={"bookmarks/:id"} element={<Bookmarks/>}/>
                                    <Route path={"history/:id"} element={<HistoryBuy/>}/>
                                </Route>
                                {isOwner && isOwner === 2 ?
                                    <Route path={"manager-house"} element={<ManagerHouse/>}>
                                        <Route path={'create'} element={<CreateHouse/>}/>
                                        <Route path={'addImage'} element={<ImageUpload/>}/>
                                        <Route path={'convenient'} element={<CreateConvenient/>}/>
                                        <Route path={'houseupdate/:id'} element={<UpdateHouse/>}/>
                                        <Route path={'images/:id'} element={<ShowFormImageUpdate/>}/>
                                        <Route path={"list-house-user/:id"} element={<ListHouseOfUser/>}>
                                        </Route>
                                        <Route path={"sold-item/:id"} element={<SoldItem/>}/>
                                        {/* <Route path={"money/:id"} element={<MoneyDiagram/>}/> */}
                                    </Route>
                                    :
                                    <Route path='*' element={<Navigate to="house"/>}/>
                                }
                                {
                                    (currentUser?.roles && currentUser?.roles[0]?.authority === "ROLE_ADMIN") ?
                                        <Route path={'admin'} element={<Home/>}>
                                            <Route path={':id/users'} element={<UserManager/>}/>
                                            <Route path={'houses'} element={<HouseManager/>}/>
                                        </Route>
                                        :
                                        <Route path='*' element={<Navigate to="house"/>}/>
                                }
                            </Route>
                            {/*<Route path='*' element={<Navigate to="house"/>}/>*/}
                        </>
                    ) : (
                        <>
                            <Route path={"login"} element={<Login/>}/>
                            <Route path={"register"} element={<Register/>}/>
                        </>
                    )
                }
            </Routes>
        </>
    );
}

export default App;