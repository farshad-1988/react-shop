import react, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faCartShopping,
  faMagnifyingGlass,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";
import { signOutUser } from "../firebase.config";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  // const { totalItemSelected, userInfo,dispatch} = useContext(ShopContext)
  const navigate = useNavigate()
  const {totalCountAndPrice} = useContext(CartContext)
  const {currentUser} = useContext(UserContext)
  const {setCartItems ,setTotalCountAndPrice} = useContext(CartContext)
 

  const logOut =async ()=>{
    await signOutUser()
    setCartItems([])
    setTotalCountAndPrice({price:0,count:0})
  }
  


  return (
    <react.Fragment>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button className="navbar-brand">
            <Link to={"/"} className="navbar-brand">
              Brand
            </Link>
          </button>

          <div className="col-4 m-auto">
            <div class="input-group">
              <button className="input-group-text">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
              <input
                type="text"
                className="form-control"
                placeholder="Search anything..."
              />
              <button className="input-group-text">
                <FontAwesomeIcon icon={faMicrophone} />
              </button>
            </div>
          </div>

            {currentUser ? <div><span>{currentUser.displayName}</span> <button onClick={logOut}>signout</button></div> : 
            <div className="d-flex flex-column me-4">
              <Link to={"/signin"} className="text-end signinFont">sign in</Link>
              <Link to={"/signup"} className="createFont">create an account</Link>
            </div>
            }

            <div className="float-right me-3">
              <Link to={"/cart"}>
                <FontAwesomeIcon icon={faCartShopping} />
              </Link>
              <span className="badge rounded-pill bg-secondary numberOfItems">
              {totalCountAndPrice?.count || 0}
              </span>
            </div>
        </div>
      </nav>
    </react.Fragment>
  );
};

export default Navbar;
