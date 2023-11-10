import profileSvg from "../../svg/profileSvg"
import GoogleIcon from "../../svg/GoogleIcon";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { signInWithGoogle, signOutUser } from "../../firebase.config";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHomeUser, faHouseCrack, faUser, faUserAlt, faUserAltSlash, faUserCircle, faUserCog, faUserLarge } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";

const SigningAndProfile = () => {
  const { currentUser } = useContext(UserContext);
  const { cartDispatch, totalCountAndPrice, cartItems } = useContext(CartContext);
  const [beatUserIcon, setBeatUserIcon] = useState(false)
  const [shopIconBeat, setShopIconBeat] = useState("")

  const navigate = useNavigate()




  const goToCart = () => {
    if (currentUser) {
      navigate(`/cart/${currentUser?.uid}`);
    } else {
      navigate("/signin");
      toast.error("please signin/signup before proceed to cart");
    }
  };
  const logOut = async () => {
    if (window.confirm("confirm to signout ?") === true) {
      await signOutUser();
      cartDispatch({ type: "SET_CART_ITEMS", payload: [] });
      cartDispatch({ type: "CHANGING_IN_CART" });
      navigate("/")
    }
  };

  const googleSignIn = async () => {
    const user = await signInWithGoogle(cartItems)
    user && toast.success(`welcome ${user.user.displayName}! ${!user.hasAddress ? "you are successfully logged in but we need more info for complete your registeration" : ""}`)
    user.newCart && cartDispatch({ type: "SET_CART_ITEMS", payload: user.newCart })
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
        {window.location.pathname.includes("profile") ? (<div className="d-flex align-items-center">
          <button className="btn btn-danger" onClick={logOut}>
            signout
          </button>
          <div className="me-1 ff-cart-icon-container ms-3" >
            <button
              className="btn btn-success d-flex flex-column-reverse"
              onClick={goToCart}
              onMouseLeave={() => setShopIconBeat("")} onMouseEnter={() => setShopIconBeat("beat")}
            >
              {/* onMouseEnter={(e)=>{e.target.setAttribute("class", "svg-inline--fa fa-house-user fa-beat-fade")}} onMouseLeave={(e)=>{e.target.setAttribute("className", "svg-inline--fa fa-house-user")}} */}
              {shopIconBeat ? <FontAwesomeIcon icon={faCartShopping} beat /> : <FontAwesomeIcon icon={faCartShopping} />}
            </button>
            <span className="badge rounded-pill bg-danger ff-badge">
              {totalCountAndPrice?.totalCount || 0}
            </span>
          </div>
          </div>
        ) : (<div className="d-flex">
          <button className="btn btn-success d-flex" onClick={goToProfile} onMouseLeave={() => setBeatUserIcon(false)} onMouseEnter={() => setBeatUserIcon(true)}>
            {beatUserIcon ? <FontAwesomeIcon icon={faHomeUser} beat /> : <FontAwesomeIcon icon={faHomeUser} />}
          </button>
          <div className="me-1 ff-cart-icon-container ms-3" >
            <button
              className="btn btn-success d-flex flex-column-reverse"
              onClick={goToCart}
              onMouseLeave={() => setShopIconBeat("")} onMouseEnter={() => setShopIconBeat("beat")}
            >
              {/* onMouseEnter={(e)=>{e.target.setAttribute("class", "svg-inline--fa fa-house-user fa-beat-fade")}} onMouseLeave={(e)=>{e.target.setAttribute("className", "svg-inline--fa fa-house-user")}} */}
              {shopIconBeat ? <FontAwesomeIcon icon={faCartShopping} beat /> : <FontAwesomeIcon icon={faCartShopping} />}
            </button>
            <span className="badge rounded-pill bg-danger ff-badge">
              {totalCountAndPrice?.totalCount || 0}
            </span>
          </div>
        </div>
        )}
      </div>

    ) : (
      <div className="d-flex">
        <button onClick={googleSignIn} className="btn p-1"><GoogleIcon /></button>
        <div className="d-flex flex-column me-2">
          <Link to={"/signin"} className="text-end text-decoration-none ">
            sign in
          </Link>
          <Link to={"/signup"} className="text-decoration-none border-top border-primary ff-font-12">
            create an account
          </Link>
        </div>
      </div>
    )

  )
}

export default SigningAndProfile