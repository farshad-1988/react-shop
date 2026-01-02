import { Route, Routes, useNavigate } from "react-router-dom";
import AdminAddProduct from "./AdminAddProduct";
import AdminEditProduct from "./AdminEditProduct";
import AdminHome from "./AdminHome";
import AdminEditProductBySearch from "./AdminEditProductBySearch";
import { useContext } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../shared/context/UserContext";

const AdminApp = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.uid !== process.env.REACT_APP_ADMIN_UID) {
      return navigate("/");
    }
  }, [currentUser?.uid, navigate]);

  return currentUser?.uid === process.env.REACT_APP_ADMIN_UID ? (
    <Routes>
      <Route index element={<AdminHome />} />
      <Route path="addnewproduct" element={<AdminAddProduct />} />
      <Route path="editproduct" element={<AdminEditProduct />} />
      <Route
        path="admineditproductbysearch/:searchedWord"
        element={<AdminEditProductBySearch />}
      />
    </Routes>
  ) : (
    toast.error("you are not authorized to access this path...")
  );
};

export default AdminApp;

//when item with 4pic delted at first item with 2 will not show pic
//limiting item for search
