import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserManager from "./pages/admin/UserManager";
import HouseManager from "./pages/admin/HouseManager";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import ChangePassword from "./pages/users/profile/ChangePassword";
import Profile from "./pages/users/profile/Profile";
import ProfileDetail from "./pages/users/profile/ProfileDetail";
import BookMarks from "./pages/users/profile/BookMarks";
import ListHouseOfUser from "./pages/users/profile/ListHouseOfUser";
function App() {
  return (
    <>
      <Routes>
        <Route path={"home"} element={<Home />}>
          <Route path={"login"} element={<Login />} />
          <Route path={"register"} element={<Register />} />
          <Route path={"users"} element={<UserManager />} />
          <Route path={"houses"} element={<HouseManager />} />
          <Route path={"profile"} element={<Profile />}>
            <Route path={"change-password"} element={<ChangePassword />} />
            <Route path={"profile-detail"} element={<ProfileDetail />} />
            <Route path={"bookmarks"} element={<BookMarks />} />
            <Route path={"list-house-user"} element={<ListHouseOfUser />} />
          </Route>
          {/*<Route path={'add'} element={<AddProduct/>}/>*/}
          {/*<Route path={'edit/:id'} element={<UpdateProduct/>}/>*/}
          {/*<Route path={':id'} element={<ProductDetail/>}/>*/}
        </Route>
        <Route path="*" element={<Navigate to="home" />} />
        {/*dieu huong trang khi nhap sai*/}
      </Routes>
    </>
  );
}

export default App;
