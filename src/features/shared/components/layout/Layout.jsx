import React, { useContext } from "react";
import NavbarAdmin from "../../../admin/components/NavbarAdmin";
import NavTips from "./NavTips";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { UserContext } from "../../context/UserContext";

const Layout = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <header>
        {currentUser && currentUser?.uid === process.env.REACT_APP_ADMIN_UID ? (
          <NavbarAdmin />
        ) : (
          <>
            {/* <NavTips /> */}
            <Navbar />
          </>
        )}
      </header>
      <div style={{ minHeight: "100vh" }}>{<Outlet />}</div>
      <Footer />
    </div>
  );
};

export default Layout;
