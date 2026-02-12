// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useContext, useState } from "react";
// import { ShopContext } from "../../context/ShopContext";
// import {
//   getCategoriesNameFromDB,
//   searchFirestore,
// } from "../../../../firebase.config";
// import { useNavigate } from "react-router-dom";

// const SearchComponent = () => {
//   const { dispatch } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const [searchText, setSearchText] = useState("");
//   const [isFocused, setIsFocused] = useState(false);

//   const setInputValue = (e) => setSearchText(e.target.value);

//   const searchDb = async (e) => {
//     e.preventDefault();
//     if (!searchText.trim()) return;

//     dispatch({ type: "LOADING_PAGE_ON" });
//     const categories = await getCategoriesNameFromDB();
//     const allFoundedItems = await searchFirestore(
//       categories.categories,
//       searchText
//     );
//     dispatch({ type: "SET_SEARCHED_ITEMS", payload: allFoundedItems });
//     navigate(`/searchedItems/${searchText}`);
//     setSearchText("");
//   };

//   return (
//     <div
//       className="m-auto col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4"
//       style={{ minWidth: "200px" }}
//     >
//       <form
//         className="position-relative"
//         style={{
//           transition: "all 0.3s ease",
//         }}
//       >
//         <div
//           className="d-flex align-items-center rounded-pill shadow-sm overflow-hidden"
//           style={{
//             background: "white",
//             border: `2px solid ${isFocused ? "#dc3545" : "#e9ecef"}`,
//             transition: "all 0.3s ease",
//           }}
//         >
//           <input
//             onChange={setInputValue}
//             onFocus={() => setIsFocused(true)}
//             onBlur={() => setIsFocused(false)}
//             type="text"
//             className="form-control border-0 shadow-none ps-4 py-2"
//             placeholder="Search products..."
//             value={searchText}
//             style={{
//               fontSize: "0.9rem",
//               outline: "none",
//             }}
//           />
//           <button
//             type="submit"
//             onClick={(e) => searchDb(e)}
//             className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center me-1 shadow-sm"
//             style={{
//               width: "35px",
//               height: "35px",
//               transition: "all 0.2s ease",
//             }}
//             onMouseOver={(e) => {
//               e.currentTarget.style.transform = "scale(1.1) rotate(15deg)";
//               e.currentTarget.style.boxShadow =
//                 "0 4px 12px rgba(220, 53, 69, 0.4)";
//             }}
//             onMouseOut={(e) => {
//               e.currentTarget.style.transform = "scale(1) rotate(0deg)";
//               e.currentTarget.style.boxShadow = "";
//             }}
//           >
//             <FontAwesomeIcon
//               icon={faMagnifyingGlass}
//               style={{ fontSize: "0.9rem" }}
//             />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SearchComponent;
