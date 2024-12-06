import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserManager from "./pages/admin/UserManager";
import HouseManager from "./pages/admin/HouseManager";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import ChangePassword from "./pages/users/profile/ChangePassword";
import Profile from "./pages/users/profile/Profile";
import ProfileDetail from "./pages/users/profile/ProfileDetail";
import Bookmarks from "./pages/users/profile/BookMarks";
import ListHouseOfUser from "./pages/users/profile/ListHouseOfUser";
import UserPage from "./pages/users/UserPage";
import ListHouse from "./pages/users/ListHouse";
import CreateHouse from "./pages/houses/CreateHouse";
import { useSelector } from "react-redux";
function App() {
  const currentUser = useSelector(({ users }) => {
    return users.currentToken;
  });
  return (
    <>
      <Routes>
        <Route path={"login"} element={<Login />} />
        <Route path={"register"} element={<Register />} />
        {currentUser ? (
          <>
            <Route path={"user"} element={<UserPage />}>
              <Route path={"house"} element={<ListHouse />} />
            </Route>
            <Route path={"home"} element={<Home />}>
              <Route path={"users"} element={<UserManager />} />
              <Route path={"houses"} element={<HouseManager />} />
              <Route path={"profile"} element={<Profile />}>
                <Route path={"change-password"} element={<ChangePassword />} />
                <Route path={"profile-detail"} element={<ProfileDetail />} />
                <Route path={"bookmarks"} element={<Bookmarks />} />
                <Route path={"list-house-user"} element={<ListHouseOfUser />} />
              </Route>
              <Route path={"create"} element={<CreateHouse />} />
              {/*<Route path={'edit/:id'} element={<UpdateProduct/>}/>*/}
              {/*<Route path={':id'} element={<ProductDetail/>}/>*/}
            </Route>
          </>
        ) : (
          <>
            <Route path="*" element={<Navigate to="login" />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
