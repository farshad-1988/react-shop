import react, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping, faX,
} from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";
import {
  getDocumentUser,
} from "../firebase.config";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

import homeLogo from "../svg/homeLogo"
import SearchComponent from "./layoutComponents/SearchComponent";
import SigningAndProfile from "./layoutComponents/SigningAndProfile";
import QueryResponsive from "../utilities/QueryResponsive";

const Navbar = () => {
  const { currentUser, setUserDoc } = useContext(UserContext);
  const { lg, md } = QueryResponsive()


  // const queryResponsive = ()=>(
  //     {
  //     xl:useMediaQuery({ query: '(min-width: 1000px)' }),
  //     sm:useMediaQuery({ query: '(min-width: 600px)' })
  // })






  const dayMessage = () => {
    const hours = new Date().getHours()
    let greet
    if (hours < 12)
      greet = "good morning";
    else if (hours >= 12 && hours <= 17)
      greet = "good afternoon";
    else if (hours >= 17 && hours <= 24)
      greet = "good evening"
    return greet + " " + currentUser?.displayName
  }


  useEffect(() => {

    const getUserInfo = async () => {
      if (!currentUser) return
      const userInfo = await getDocumentUser(currentUser.uid);
      setUserDoc(userInfo)
    };
    getUserInfo();
  }, [currentUser]);


  return (
    <react.Fragment>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        {lg && <Link to={"/"} className="align-self-start ms-3">
          {homeLogo}
        </Link>}
        <div className={`container-fluid dflex h-auto ${md && "flex-column"}`}>
          {(currentUser && lg) && <div className="ms-5 text-capitalize lead ff-font-14">{dayMessage()}</div>}
          {(lg || window.location.pathname === "/") && <SearchComponent />}
          <div className={`d-flex justify-content-between mt-2 ${md && "w-100"}`}>

            {(md && window.location.pathname !== "/") ? <Link to={"/"} className="align-self-center text-light">
              <FontAwesomeIcon className="text-center text-danger" icon={faX} />
            </Link> : <span> </span>}

            <div className="d-flex align-items-center ">
              <SigningAndProfile />
            </div>
            {/* </div> */}
          </div>

        </div>
      </nav>
    </react.Fragment>
  );
};

export default Navbar;
