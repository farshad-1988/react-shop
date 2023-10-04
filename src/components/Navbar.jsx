import react, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faCartShopping,
  faMagnifyingGlass,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";
import { getCategoriesNameFromDB, searchFirestore, signOutUser } from "../firebase.config";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  // const { totalItemSelected, userInfo,dispatch} = useContext(ShopContext)
  const {currentUser} = useContext(UserContext)
  // const {setHomePageItems , categoriesTitle} = useContext(ShopContext)
  const {setCartItems ,setTotalCountAndPrice , totalCountAndPrice} = useContext(CartContext)
  const [searchText,setSearchText]= useState("")
 

  const logOut =async ()=>{
    await signOutUser()
    setCartItems([])
    setTotalCountAndPrice({price:0,count:0})
  }
  
  
  const setInputValue = (e)=>setSearchText(e.target.value)

  const searchDb = async(e)=>{
    e.preventDefault()
    const categories = await getCategoriesNameFromDB()
    console.log(searchText)
    const allItems =  await searchFirestore(categories,searchText)
    console.log(allItems)
  }

  return (
    <react.Fragment>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <Link to={"/"} className="navbar-brand">
              Brand
            </Link>


          <div className="col-4 m-auto">
            <form class="input-group">
              <button type="submit" onClick={(e)=>searchDb(e)} className="input-group-text">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
              <input
                onChange={setInputValue}
                type="text"
                className="form-control"
                placeholder="Search anything..."
                value={searchText}
              />
              <button type="button" className="input-group-text">
                <FontAwesomeIcon icon={faMicrophone} />
              </button>
            </form>
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
