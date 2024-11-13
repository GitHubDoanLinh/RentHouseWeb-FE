import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
function App() {
  return (
    <>
      <Routes>
        <Route path={"house"} element={<Home />}>
          {/*<Route path={'add'} element={<AddProduct/>}/>*/}
          {/*<Route path={'edit/:id'} element={<UpdateProduct/>}/>*/}
          {/*<Route path={':id'} element={<ProductDetail/>}/>*/}
        </Route>
        <Route path="*" element={<Navigate to="houses/list" />} />
        {/*dieu huong trang khi nhap sai*/}
      </Routes>
    </>
  );
}

export default App;
