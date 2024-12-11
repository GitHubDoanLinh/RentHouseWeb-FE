import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserManager from "./pages/admin/UserManager";
import HouseManager from "./pages/admin/HouseManager";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import ChangePassword from "./pages/user/profile/ChangePassword";
import Profile from "./pages/user/profile/Profile";
import ProfileDetail from "./pages/user/profile/ProfileDetail";
import Bookmarks from "./pages/user/profile/BookMarks";
import ListHouseOfUser from "./pages/user/profile/ListHouseOfUser";
import UserPage from "./pages/user/UserPage";
import ListHouse from "./pages/user/ListHouse";
import CreateHouse from "./pages/houses/create/CreateHouse";
import HouseDetail from "./pages/houses/HouseDetail";
import ImageUpload from "./firebase/ImageUpload";
import { CreateConvenient } from "./pages/houses/convenient/AddConvenientToHouse";
import { useSelector } from "react-redux";
import { UpdateHouse } from "./pages/houses/update/UpdateHouse";
function App() {
  const currentUser = useSelector(({users}) => {
      return users.currentToken;
  })
  const id = useSelector(({users}) => {
    return users.userId;
})
  return (
      <>
          <Routes>
              <Route path={"login"} element={<Login/>}/>
              <Route path={"register"} element={<Register/>}/>
              {
                  currentUser ? (
                      <>
                          <Route path={'user'} element={<UserPage/>}>
                              <Route path={'house'} element={<ListHouse/>}/>
                              <Route path={'house/:id'} element={<HouseDetail/>}/>
                              <Route path={'profile'} element={<Profile/>}>
                                  <Route path={`profile-detail/:id`} element={<ProfileDetail/>}/>
                                  <Route path={"change-password"} element={<ChangePassword/>}/>
                                  <Route path={"bookmarks"} element={<Bookmarks/>}/>
                                  <Route path={'create'} element={<CreateHouse/>}>
                                        <Route path={'convenient'} element={<CreateConvenient/>}/>
                                        <Route path={'image'} element={<ImageUpload/>}/>
                                    </Route>
                                    <Route path={"list-house-user/:id"} element={<ListHouseOfUser/>}>
                                        <Route path={'update/:id'} element={<UpdateHouse/>}/>
                                    </Route>
                              </Route>
                          </Route>
                          <Route path={'admin'} element={<Home/>}>
                              <Route path={'users'} element={<UserManager/>}/>
                              <Route path={'houses'} element={<HouseManager/>}/>
                          </Route>
                        

                      </>
                  ) : (
                      <>
                          <Route path='*' element={<Navigate to="login"/>}/>
                      </>
                  )
              }
          </Routes>
      </>
  );
}

export default App;
