import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import { getCategoriesNameFromDB, searchFirestore } from "../../firebase.config";
import { useNavigate } from "react-router-dom";

const SearchComponent = () => {
    const { dispatch} = useContext(ShopContext);
    const navigate = useNavigate()

    const [searchText, setSearchText] = useState("");
    const setInputValue = (e) => setSearchText(e.target.value);

    const searchDb = async (e) => {
      e.preventDefault();
      dispatch({ type: "LOADING_PAGE_ON" });
      const categories = await getCategoriesNameFromDB();
      const allFoundedItems = await searchFirestore(categories.categories, searchText);
      dispatch({ type: "SET_SEARCHED_ITEMS", payload: allFoundedItems });
      navigate(`/searchedItems/${searchText}`);
      setSearchText("")
    };


  return (
    <div className="m-auto col-12 col-sm-6 col-lg-4">
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
  )
}

export default SearchComponent