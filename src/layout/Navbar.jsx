import react, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
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
const Navbar = () => {
  const { currentUser  , setUserDoc } = useContext(UserContext);
  const {  totalCountAndPrice } = useContext(CartContext);
  const [shopIconBeat , setShopIconBeat] = useState("")

  const navigate = useNavigate();



  const goToCart = () => {
    if (currentUser) {
      navigate(`/cart/${currentUser?.uid}`);
    } else {
      navigate("/signin");
      toast.error("please signin/signup before proceed to cart");
    }
  };



  const dayMessage = () =>{
    const hours = new Date().getHours()
    let greet
    if (hours < 12)
        greet =  "good morning";
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


  //fas fa-user
  //far fa-user
  return (
    <react.Fragment>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid" style={{height:"50px"}}>
            <Link to={"/"} >
              {homeLogo}
            </Link>
            {currentUser && <div className="ms-5 text-capitalize">{dayMessage()}</div>}
              <SearchComponent/>

            <SigningAndProfile/>
          <div className="me-3" style={{width:"50px"}}>
            <button
              className="btn btn-success d-flex flex-column-reverse" 
              onClick={goToCart}
              onMouseLeave={()=>setShopIconBeat("")} onMouseEnter={()=>setShopIconBeat("beat")}
            >
              {/* onMouseEnter={(e)=>{e.target.setAttribute("class", "svg-inline--fa fa-house-user fa-beat-fade")}} onMouseLeave={(e)=>{e.target.setAttribute("class", "svg-inline--fa fa-house-user")}} */}
              {shopIconBeat ? <FontAwesomeIcon icon={faCartShopping} beat /> : <FontAwesomeIcon icon={faCartShopping} />}
            </button>
            <span
              className="badge rounded-pill bg-danger "
              style={{
                fontSize: "10px",
                position: "absolute",
                top: "7px",
                right: "25px",
              }}
            >
              {totalCountAndPrice?.totalCount || 0}
            </span>
          </div>
        </div>
      </nav>
    </react.Fragment>
  );
};

export default Navbar;
