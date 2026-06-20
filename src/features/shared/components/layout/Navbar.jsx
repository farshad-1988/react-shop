// // import react, { useContext, useEffect } from "react";
// // import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faX } from "@fortawesome/free-solid-svg-icons";
// // import { getDocumentUser } from "../../../../firebase.config";
// // import homeLogo from "../../../../assets/svg/homeLogo";
// // import SearchComponent from "./SearchComponent";
// // import SigningAndProfile from "./SigningAndProfile";
// // import QueryResponsive from "../../hooks/QueryResponsive";
// // import { UserContext } from "../../context/UserContext";
// // import { ShopContext } from "../../context/ShopContext";

// // const Navbar = () => {
// //   const { currentUser, setUserDoc } = useContext(UserContext);
// //   const { lg, md } = QueryResponsive();
// //   const navigate = useNavigate();
// //   const { category: selectedCategory } = useParams();
// //   const { categoriesTitle } = useContext(ShopContext);
// //   const location = useLocation();

// //   // const navigate = useNavigate()

// //   // const queryResponsive = ()=>(
// //   //     {
// //   //     xl:useMediaQuery({ query: '(min-width: 1000px)' }),
// //   //     sm:useMediaQuery({ query: '(min-width: 600px)' })
// //   // })

// //   const dayMessage = () => {
// //     const hours = new Date().getHours();
// //     let greet;
// //     if (hours < 12) greet = "good morning";
// //     else if (hours >= 12 && hours <= 17) greet = "good afternoon";
// //     else if (hours >= 17 && hours <= 24) greet = "good evening";
// //     return greet + " " + currentUser?.displayName;
// //   };

// //   useEffect(() => {
// //     const getUserInfo = async () => {
// //       if (!currentUser) return;
// //       const userInfo = await getDocumentUser(currentUser.uid);
// //       setUserDoc(userInfo);
// //     };
// //     getUserInfo();
// //   }, [currentUser, setUserDoc]);

// //   return (
// //     <react.Fragment>
// //       <nav className="navbar navbar-expand-lg bg-body-tertiary">
// //         {lg && (
// //           <Link to={"/"} className="align-self-start ms-3">
// //             {homeLogo}
// //           </Link>
// //         )}
// //         <div className={`container-fluid dflex h-auto ${md && "flex-column"}`}>
// //           {currentUser && lg && (
// //             <div className="ms-5 text-capitalize lead ff-font-14">
// //               {dayMessage()}
// //             </div>
// //           )}
// //           {(lg || window.location.pathname === "/") && <SearchComponent />}
// //           <div
// //             className={`d-flex justify-content-between mt-2 ${md && "w-100"}`}
// //           >
// //             {md && window.location.pathname !== "/" ? (
// //               <button
// //                 onClick={() => navigate("/")}
// //                 className="btn align-self-center text-light"
// //               >
// //                 <FontAwesomeIcon
// //                   className="text-center text-danger"
// //                   icon={faX}
// //                 />
// //               </button>
// //             ) : (
// //               <span> </span>
// //             )}

// //             <div className="d-flex align-items-center ">
// //               <SigningAndProfile />
// //             </div>
// //             {/* </div> */}
// //           </div>
// //         </div>
// //       </nav>
// //       <div>
// //         <div className="d-flex justify-content-between">
// //           <div>
// //             {categoriesTitle.map((category, index) => (
// //               <button
// //                 key={index}
// //                 onClick={() => navigate(`category/${category}`)}
// //                 className={`btn user-select-none text-capitalize ${
// //                   category === selectedCategory && "text-primary"
// //                 }`}
// //               >
// //                 {category}
// //               </button>
// //             ))}
// //           </div>
// //           <button
// //             onClick={() => navigate("/categories")}
// //             className={`btn ${
// //               location.pathname === "/categories" && "text-primary"
// //             }`}
// //           >
// //             All Categories
// //           </button>
// //         </div>
// //       </div>
// //     </react.Fragment>
// //   );
// // };

// // export default Navbar;
// import react, { useContext, useEffect } from "react";
// import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faX } from "@fortawesome/free-solid-svg-icons";
// import { getDocumentUser } from "../../../../firebase.config";
// import homeLogo from "../../../../assets/svg/homeLogo";
// import SearchComponent from "./SearchComponent";
// import SigningAndProfile from "./SigningAndProfile";
// import QueryResponsive from "../../hooks/QueryResponsive";
// import { UserContext } from "../../context/UserContext";
// import { ShopContext } from "../../context/ShopContext";

// const Navbar = () => {
//   const { currentUser, setUserDoc } = useContext(UserContext);
//   const { lg, md } = QueryResponsive();
//   const navigate = useNavigate();
//   const { category: selectedCategory } = useParams();
//   const { categoriesTitle } = useContext(ShopContext);
//   const location = useLocation();

//   const dayMessage = () => {
//     const hours = new Date().getHours();
//     let greet;
//     if (hours < 12) greet = "good morning";
//     else if (hours >= 12 && hours <= 17) greet = "good afternoon";
//     else if (hours >= 17 && hours <= 24) greet = "good evening";
//     return greet + " " + currentUser?.displayName;
//   };

//   useEffect(() => {
//     const getUserInfo = async () => {
//       if (!currentUser) return;
//       const userInfo = await getDocumentUser(currentUser.uid);
//       setUserDoc(userInfo);
//     };
//     getUserInfo();
//   }, [currentUser, setUserDoc]);

//   return (
//     <react.Fragment>
//       {/* Main Navbar */}
//       <nav
//         className="navbar navbar-expand-lg shadow-sm sticky-top"
//         style={{
//           background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
//           borderBottom: "1px solid #e9ecef",
//         }}
//       >
//         <div className="container-fluid px-2 px-md-4 py-2">
//           <div className="d-flex align-items-center justify-content-between w-100 flex-wrap ">
//             {/* Logo Section */}
//             {lg && (
//               <Link
//                 to={"/"}
//                 className="navbar-brand d-flex align-items-center"
//                 style={{ transition: "transform 0.2s ease" }}
//                 onMouseOver={(e) =>
//                   (e.currentTarget.style.transform = "scale(1.05)")
//                 }
//                 onMouseOut={(e) =>
//                   (e.currentTarget.style.transform = "scale(1)")
//                 }
//               >
//                 {homeLogo}
//               </Link>
//             )}

//             {/* Greeting and Search Section */}
//             <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-2 flex-grow-1">
//               {currentUser && lg && (
//                 <div
//                   className="text-capitalize fw-semibold px-3 py-1 rounded-pill"
//                   style={{
//                     fontSize: "0.9rem",
//                     color: "#555",
//                     // background: "#f8f9fa",
//                     // border: "1px solid #e9ecef",
//                   }}
//                 >
//                   {dayMessage()}
//                 </div>
//               )}

//               {(lg || window.location.pathname === "/") && (
//                 <div
//                   className="flex-grow-1"
//                   style={{ maxWidth: lg ? "500px" : "100%" }}
//                 >
//                   <SearchComponent />
//                 </div>
//               )}
//             </div>

//             {/* Right Section - Close/Menu & Profile */}
//             <div
//               className={`d-flex align-items-center justify-content-between gap-2 ${
//                 md && window.location.pathname !== "/" && "w-100"
//               }`}
//             >
//               {md && window.location.pathname !== "/" && (
//                 <button
//                   onClick={() => navigate("/")}
//                   className="btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center"
//                   style={{
//                     width: "40px",
//                     height: "40px",
//                     transition: "all 0.2s ease",
//                   }}
//                   onMouseOver={(e) => {
//                     e.currentTarget.style.transform = "rotate(90deg)";
//                     e.currentTarget.style.background = "#fff0f0";
//                   }}
//                   onMouseOut={(e) => {
//                     e.currentTarget.style.transform = "rotate(0deg)";
//                     e.currentTarget.style.background = "";
//                   }}
//                 >
//                   <FontAwesomeIcon className="text-danger" icon={faX} />
//                 </button>
//               )}

//               <SigningAndProfile />
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Categories Bar */}
//       <div
//         className="bg-light shadow-sm sticky-top"
//         style={{
//           top: "60px",
//           zIndex: 1020,
//           borderBottom: "1px solid #dee2e6",
//         }}
//       >
//         <div className="container-fluid px-2 px-md-4">
//           {/* Desktop Categories */}
//           <div className="d-none d-md-flex align-items-center justify-content-between py-2">
//             <div className="d-flex align-items-center gap-1 flex-wrap">
//               {categoriesTitle.map((category, index) => {
//                 const isActive = category === selectedCategory;
//                 return (
//                   <button
//                     key={index}
//                     onClick={() => navigate(`category/${category}`)}
//                     className={`btn ${
//                       isActive
//                         ? "btn-danger shadow-sm bg-primary"
//                         : "btn-light bg-light"
//                     } rounded-pill px-3 py-2 text-capitalize fw-semibold`}
//                     style={{
//                       fontSize: "0.85rem",
//                       transition: "all 0.2s ease",
//                       border: isActive ? "none" : "1px solid #dee2e6",
//                     }}
//                     onMouseOver={(e) => {
//                       if (!isActive) {
//                         e.currentTarget.style.transform = "translateY(-2px)";
//                         e.currentTarget.style.boxShadow =
//                           "0 2px 6px rgba(0,0,0,0.1)";
//                         e.currentTarget.style.background = "#ffffff";
//                       }
//                     }}
//                     onMouseOut={(e) => {
//                       e.currentTarget.style.transform = "translateY(0)";
//                       if (!isActive) {
//                         e.currentTarget.style.boxShadow = "";
//                         e.currentTarget.style.background = "";
//                       }
//                     }}
//                   >
//                     {category}
//                   </button>
//                 );
//               })}
//             </div>

//             <button
//               onClick={() => navigate("/categories")}
//               className={`btn ${
//                 location.pathname === "/categories"
//                   ? "btn-danger shadow-sm"
//                   : "btn-outline-danger"
//               } rounded-pill px-4 py-2 fw-semibold`}
//               style={{
//                 fontSize: "0.85rem",
//                 transition: "all 0.2s ease",
//               }}
//               onMouseOver={(e) => {
//                 if (location.pathname !== "/categories") {
//                   e.currentTarget.style.transform = "translateY(-2px)";
//                   e.currentTarget.style.boxShadow =
//                     "0 2px 6px rgba(220, 53, 69, 0.3)";
//                 }
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//                 if (location.pathname !== "/categories") {
//                   e.currentTarget.style.boxShadow = "";
//                 }
//               }}
//             >
//               All Categories
//             </button>
//           </div>

//           {/* Mobile Categories Dropdown */}
//           <div className="d-md-none py-2">
//             <div className="d-flex align-items-center justify-content-between gap-2">
//               <select
//                 className="form-select shadow-sm"
//                 style={{
//                   border: "1px solid #dee2e6",
//                   borderRadius: "8px",
//                   fontSize: "0.9rem",
//                   flex: 1,
//                 }}
//                 value={selectedCategory || ""}
//                 onChange={(e) => {
//                   if (e.target.value) {
//                     navigate(`category/${e.target.value}`);
//                   }
//                 }}
//               >
//                 <option value="">Select Category</option>
//                 {categoriesTitle.map((category, index) => (
//                   <option key={index} value={category}>
//                     {category}
//                   </option>
//                 ))}
//               </select>

//               <button
//                 onClick={() => navigate("/categories")}
//                 className={`btn ${
//                   location.pathname === "/categories"
//                     ? "btn-danger"
//                     : "btn-outline-danger"
//                 } shadow-sm px-3 py-2`}
//                 style={{
//                   fontSize: "0.85rem",
//                   borderRadius: "8px",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 All
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </react.Fragment>
//   );
// };

// export default Navbar;
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faX,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { getDocumentUser } from "../../../../firebase.config";
import homeLogo from "../../../../assets/homeLogo.png";
import SigningAndProfile from "./SigningAndProfile";
import QueryResponsive from "../../hooks/QueryResponsive";
import { UserContext } from "../../context/UserContext";
import { ShopContext } from "../../context/ShopContext";

const Navbar = () => {
  const { currentUser, setUserDoc } = useContext(UserContext);
  const { lg, md } = QueryResponsive();
  const navigate = useNavigate();
  const { category: selectedCategory } = useParams();
  const { categoriesTitle } = useContext(ShopContext);
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const dayMessage = () => {
    const hours = new Date().getHours();
    let greet;
    if (hours < 12) greet = "Good morning";
    else if (hours >= 12 && hours <= 17) greet = "Good afternoon";
    else if (hours >= 17 && hours <= 24) greet = "Good evening";
    return greet + ", " + currentUser?.displayName;
  };

  useEffect(() => {
    const getUserInfo = async () => {
      if (!currentUser) return;
      const userInfo = await getDocumentUser(currentUser.uid);
      setUserDoc(userInfo);
    };
    getUserInfo();
  }, [currentUser, setUserDoc]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  // Reusable category dropdown JSX
  const CategoryDropdown = () => (
    <div
      className="position-relative"
      style={{ minWidth: lg ? "180px" : "120px" }}
    >
      <button
        className="btn d-flex align-items-center justify-content-between w-100 gap-2"
        onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
        style={{
          color: "#2C3E50",
          fontSize: lg ? "0.95rem" : "0.85rem",
          fontWeight: "600",
          background: "#F8F9FA",
          border: "1px solid #E8E8E8",
          borderRadius: "10px",
          padding: lg ? "0.6rem 1rem" : "0.5rem 0.75rem",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = "#E67E22";
          e.currentTarget.style.borderColor = "#E67E22";
          e.currentTarget.style.color = "#FFFFFF";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = "#F8F9FA";
          e.currentTarget.style.borderColor = "#E8E8E8";
          e.currentTarget.style.color = "#2C3E50";
        }}
      >
        <span className="text-truncate">
          {selectedCategory || "Categories"}
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          style={{
            fontSize: "0.75rem",
            transition: "transform 0.3s ease",
            transform: categoryDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {categoryDropdownOpen && (
        <>
          <div
            onClick={() => setCategoryDropdownOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1035,
            }}
          />
          <div
            className="position-absolute mt-2 shadow-lg"
            style={{
              background: "#FFFFFF",
              borderRadius: "12px",
              minWidth: lg ? "220px" : "180px",
              maxHeight: "400px",
              overflowY: "auto",
              zIndex: 1040,
              left: 0,
              border: "1px solid #E8E8E8",
            }}
          >
            {categoriesTitle.map((category, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(`category/${category}`);
                  setCategoryDropdownOpen(false);
                }}
                className="btn w-100 text-start text-capitalize"
                style={{
                  padding: lg ? "0.75rem 1rem" : "0.65rem 0.85rem",
                  borderRadius: "0",
                  background:
                    category === selectedCategory ? "#FFF5EE" : "transparent",
                  color: category === selectedCategory ? "#E67E22" : "#2C3E50",
                  borderBottom:
                    index < categoriesTitle.length - 1
                      ? "1px solid #F0F0F0"
                      : "none",
                  fontWeight: category === selectedCategory ? "600" : "500",
                  fontSize: lg ? "0.9rem" : "0.85rem",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  if (category !== selectedCategory) {
                    e.currentTarget.style.background = "#FFF5EE";
                    e.currentTarget.style.color = "#E67E22";
                  }
                }}
                onMouseOut={(e) => {
                  if (category !== selectedCategory) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#2C3E50";
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );

  // Reusable search JSX
  const SearchBar = () => (
    <div className="position-relative">
      {!searchOpen ? (
        <button
          onClick={() => setSearchOpen(true)}
          className="btn d-flex align-items-center justify-content-center"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#F8F9FA",
            border: "1px solid #E8E8E8",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#E67E22";
            e.currentTarget.style.borderColor = "#E67E22";
            e.currentTarget.querySelector("svg").style.color = "#FFFFFF";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#F8F9FA";
            e.currentTarget.style.borderColor = "#E8E8E8";
            e.currentTarget.querySelector("svg").style.color = "#2C3E50";
          }}
        >
          <FontAwesomeIcon
            icon={faSearch}
            style={{
              color: "#2C3E50",
              transition: "color 0.3s ease",
              fontSize: "0.95rem",
            }}
          />
        </button>
      ) : (
        <form
          onSubmit={handleSearch}
          className="btn d-flex align-items-center justify-content-center"
          style={{
            right: 0,
            top: 0,
            background: "#FFFFFF",
            borderRadius: "25px",
            border: "2px solid #E67E22",
            padding: "0.25rem 0.5rem",
            boxShadow: "0 4px 20px rgba(230, 126, 34, 0.2)",
            width: lg ? "300px" : md ? "250px" : "220px",
            animation: "slideIn 0.3s ease",
            zIndex: 1050,
          }}
        >
          <FontAwesomeIcon
            icon={faSearch}
            style={{
              color: "#E67E22",
              marginLeft: "0.5rem",
              fontSize: "0.9rem",
            }}
          />
          <input
            type="text"
            className="form-control border-0 shadow-none"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            style={{
              fontSize: "0.9rem",
              padding: "0.5rem",
              color: "#2C3E50",
            }}
          />
          <button
            type="button"
            onClick={() => {
              setSearchOpen(false);
              setSearchQuery("");
            }}
            className="btn p-0 d-flex align-items-center justify-content-center"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: "transparent",
              border: "none",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#FFF5EE";
              e.currentTarget.style.transform = "rotate(90deg)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "rotate(0deg)";
            }}
          >
            <FontAwesomeIcon
              icon={faX}
              style={{ color: "#E67E22", fontSize: "0.75rem" }}
            />
          </button>
        </form>
      )}
    </div>
  );

  return (
    <React.Fragment>
      <nav
        className="navbar navbar-expand sticky-top shadow-sm"
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #E8E8E8",
          zIndex: 1030,
        }}
      >
        <div className="container-fluid px-2 px-md-4 py-2">
          {/* ── DESKTOP layout (md and up) ── */}
          <div className="d-none d-md-flex align-items-center justify-content-between w-100 gap-2 gap-md-3">
            <div className="d-flex align-items-center justify-content-between gap-3">
              {/* Logo */}
              <Link
                to={"/"}
                className="navbar-brand d-flex align-items-center m-0 p-0"
                style={{ transition: "transform 0.2s ease" }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <img
                  src={homeLogo}
                  alt="Home Logo"
                  className="img-fluid bg-transparent"
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "contain",
                  }}
                />
              </Link>

              <CategoryDropdown />

              {/* All Categories Button */}
              <button
                onClick={() => navigate("/categories")}
                className="btn text-nowrap d-none d-sm-block"
                style={{
                  color:
                    location.pathname === "/categories" ? "#FFFFFF" : "#E67E22",
                  fontSize: lg ? "0.9rem" : "0.85rem",
                  fontWeight: "600",
                  background:
                    location.pathname === "/categories"
                      ? "#E67E22"
                      : "transparent",
                  border: "1px solid #E67E22",
                  borderRadius: "10px",
                  padding: lg ? "0.6rem 1.25rem" : "0.5rem 1rem",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#E67E22";
                  e.currentTarget.style.color = "#FFFFFF";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(230, 126, 34, 0.3)";
                }}
                onMouseOut={(e) => {
                  if (location.pathname !== "/categories") {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#E67E22";
                  }
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                All Categories
              </button>
            </div>

            {/* Greeting */}
            <div className="d-none d-xl-flex align-items-center flex-grow-1 justify-content-center">
              {currentUser && (
                <div
                  className="text-capitalize"
                  style={{
                    fontSize: "0.95rem",
                    color: "#5A6C7D",
                    fontWeight: "500",
                  }}
                >
                  {dayMessage()}
                </div>
              )}
            </div>

            <div className="flex-grow-1 d-xl-none" />

            {/* Right: Search + Profile */}
            <div className="d-flex align-items-center gap-2">
              <SearchBar />
              <SigningAndProfile />
            </div>
          </div>

          {/* ── MOBILE layout (below md) ── */}
          <div className="d-flex d-md-none flex-column w-100 gap-2">
            {/* Row 1: Logo + Profile */}
            <div className="d-flex align-items-center justify-content-between">
              <Link
                to={"/"}
                className="navbar-brand d-flex align-items-center m-0 p-0"
                style={{ transition: "transform 0.2s ease" }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <img
                  src={homeLogo}
                  alt="Home Logo"
                  className="img-fluid bg-transparent"
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "contain",
                  }}
                />
              </Link>
              <SigningAndProfile />
            </div>

            {/* Row 2: Category + Search */}
            <div className="d-flex align-items-center gap-2">
              <div className="flex-grow-1">
                <CategoryDropdown />
              </div>
              <SearchBar />
            </div>
          </div>
        </div>
      </nav>
      {/* 
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style> */}
    </React.Fragment>
  );
};

export default Navbar;
