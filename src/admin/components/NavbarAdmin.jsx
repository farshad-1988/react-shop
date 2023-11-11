import React from 'react'
import homeLogo from '../../svg/homeLogo';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import SigningAndProfile from '../../layout/layoutComponents/SigningAndProfile';
import { getCategoriesNameFromDB, searchFirestore } from '../../firebase.config';
import { ShopContext } from '../../context/ShopContext';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useState } from 'react';
import QueryResponsive from "../../utilities/QueryResponsive"




const NavbarAdmin = () => {

    const { currentUser } = useContext(UserContext);
    const { lg, md } = QueryResponsive()

    const navigate = useNavigate();






    const dayMessage = () => {
        const hours = new Date().getHours()
        let greet
        if (hours < 12)
            greet = "good morning";
        else if (hours >= 12 && hours <= 17)
            greet = "good afternoon";
        else if (hours >= 17 && hours <= 24)
            greet = "good evening"
        return <div className='d-flex flex-column'><span>{greet}</span><span>{currentUser?.displayName || null}</span></div>
    }


    const { dispatch } = useContext(ShopContext);


    const [searchText, setSearchText] = useState("");
    const setInputValue = (e) => setSearchText(e.target.value);

    const searchDb = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOADING_PAGE_ON" });
        const categories = await getCategoriesNameFromDB();
        const allFoundedItems = await searchFirestore(categories.categories, searchText);
        dispatch({ type: "SET_SEARCHED_ITEMS", payload: allFoundedItems });
        navigate(`/admin/admineditproductbysearch/${searchText}`);
        setSearchText("")
    };


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">

                {lg && <Link to={"/"} className="align-self-start ms-3 d-flex align-items-center" >
                    {homeLogo}
                </Link>}


                <div className={`container-fluid d-flex h-auto ${md && "flex-column"}`}>
                    {(currentUser && lg) && <div className="ms-5 text-capitalize lead ff-font-14" >{dayMessage()}</div>}
                    <div className="m-auto col-12 col-sm-6 col-lg-4 align-self-center">
                        <form className="input-group">
                            <input
                                onChange={setInputValue}
                                type="text"
                                className="form-control"
                                placeholder="Search ..."
                                value={searchText}
                            />
                            <button
                                type="submit"
                                onClick={(e) => searchDb(e)}
                                className="input-group-text bg-success text-light"
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                            {/* <button type="button" className="input-group-text">
        <FontAwesomeIcon icon={faMicrophone} />
      </button> */}
                        </form>
                    </div>
                    <div className={`d-flex justify-content-between  ${md && "w-100 mt-2"}`}>

                        {md && <Link to={"/"}>
                            {homeLogo}
                        </Link>}

                        <div className="d-flex align-items-center">
                             <Link to={"/admin"} className=" ms-3 d-flex align-items-center text-decoration-none">
                                <button className='d-flex btn btn-success me-4'><span className='me-2'>Admin</span><span>{<FontAwesomeIcon icon={faUserEdit} style={{ fontSize: "16px" }} />}</span></button>
                            </Link>
                            <SigningAndProfile/>

                        </div>
                        {/* </div> */}
                    </div>

                </div>
            </nav>
        </>
    )
}

export default NavbarAdmin