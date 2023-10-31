import profileSvg from "../../svg/profileSvg"
import GoogleIcon from "../../svg/GoogleIcon";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { signInWithGoogle, signOutUser } from "../../firebase.config";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHomeUser, faHouseCrack, faUser, faUserAlt, faUserAltSlash, faUserCircle, faUserCog, faUserLarge } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";

const SigningAndProfile = () => {
  const { currentUser } = useContext(UserContext);
  const { cartDispatch, totalCountAndPrice ,cartItems} = useContext(CartContext);
  const [beatUserIcon,setBeatUserIcon]=useState(false)

  const navigate= useNavigate()

  const logOut = async () => {
    if(window.confirm("confirm to signout ?")===true){
      await signOutUser();
      cartDispatch({ type: "SET_CART_ITEMS", payload: [] });
      cartDispatch({ type: "CHANGING_IN_CART" });
      navigate("/")
    }
  };

  const googleSignIn = async ()=>{
    const user = await signInWithGoogle(cartItems)
      user && toast.success(`welcome ${user.user.displayName}! ${!user.hasAddress ? "you are successfully logged in but we need more info for complete your registeration" : ""}`)
      user.newCart && cartDispatch({type:"SET_CART_ITEMS" , payload:user.newCart})
      user.newCart && cartDispatch({ type: "CHANGING_IN_CART" });
      !user.hasAddress && navigate(`/edituserdata/${user.user.uid}`)
  }

  const goToProfile = () => {
    setBeatUserIcon(false) 
    navigate(`/profile/${currentUser.uid}`);
  };



  return (
    currentUser ? (
        <div className="me-3">
          {window.location.pathname.includes("profile") ? (
            <button className="btn btn-danger" onClick={logOut}>
              signout
            </button>
          ) : (
            <button className="btn btn-success d-flex justify-content-center"   onClick={goToProfile} style={{width:"50px"}} onMouseLeave={()=>setBeatUserIcon(false)} onMouseEnter={()=>setBeatUserIcon(true)}>
                {beatUserIcon ? <FontAwesomeIcon icon={faHomeUser} beat/> : <FontAwesomeIcon icon={faHomeUser}/>}
            </button>
          )}
        </div>
      ) : (
        <div className="d-flex">
          <button onClick={googleSignIn} className="btn"><GoogleIcon/></button>
        <div className="d-flex flex-column me-4">
          <Link to={"/signin"} className="text-end signinFont">
            sign in
          </Link>
          <Link to={"/signup"} className="createFont">
            create an account
          </Link>
        </div>
        </div>
      )

  )
}

export default SigningAndProfile