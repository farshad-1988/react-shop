import { Route, Routes } from "react-router-dom"
import AdminAddProduct from "./pages/AdminAddProduct"
import AdminEditProduct from "./pages/AdminEditProduct"
import AdminHome from "./pages/AdminHome"
import AdminEditProductBySearch from "./pages/AdminEditProductBySearch"


const AdminApp = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminHome/>}/>
      <Route path="/addnewproduct" element={<AdminAddProduct/>}/>
      <Route path="/editproduct" element={<AdminEditProduct/>}/>
      <Route path="/admineditproductbysearch/:searchedWord" element={<AdminEditProductBySearch/>}/>
    </Routes>
  )
}

export default AdminApp


//when item with 4pic delted at first item with 2 will not show pic
//limiting item for search