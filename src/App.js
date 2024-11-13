import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserManager from "./pages/admin/UserManager";
import HouseManager from "./pages/admin/HouseManager";
function App() {
  return (
    <>
      <Routes>
        <Route path={"home"} element={<Home />}>
          <Route path={"users"} element={<UserManager />} />
          <Route path={"houses"} element={<HouseManager />} />
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
