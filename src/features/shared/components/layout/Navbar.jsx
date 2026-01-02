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

//   // const navigate = useNavigate()

//   // const queryResponsive = ()=>(
//   //     {
//   //     xl:useMediaQuery({ query: '(min-width: 1000px)' }),
//   //     sm:useMediaQuery({ query: '(min-width: 600px)' })
//   // })

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
//       <nav className="navbar navbar-expand-lg bg-body-tertiary">
//         {lg && (
//           <Link to={"/"} className="align-self-start ms-3">
//             {homeLogo}
//           </Link>
//         )}
//         <div className={`container-fluid dflex h-auto ${md && "flex-column"}`}>
//           {currentUser && lg && (
//             <div className="ms-5 text-capitalize lead ff-font-14">
//               {dayMessage()}
//             </div>
//           )}
//           {(lg || window.location.pathname === "/") && <SearchComponent />}
//           <div
//             className={`d-flex justify-content-between mt-2 ${md && "w-100"}`}
//           >
//             {md && window.location.pathname !== "/" ? (
//               <button
//                 onClick={() => navigate("/")}
//                 className="btn align-self-center text-light"
//               >
//                 <FontAwesomeIcon
//                   className="text-center text-danger"
//                   icon={faX}
//                 />
//               </button>
//             ) : (
//               <span> </span>
//             )}

//             <div className="d-flex align-items-center ">
//               <SigningAndProfile />
//             </div>
//             {/* </div> */}
//           </div>
//         </div>
//       </nav>
//       <div>
//         <div className="d-flex justify-content-between">
//           <div>
//             {categoriesTitle.map((category, index) => (
//               <button
//                 key={index}
//                 onClick={() => navigate(`category/${category}`)}
//                 className={`btn user-select-none text-capitalize ${
//                   category === selectedCategory && "text-primary"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//           <button
//             onClick={() => navigate("/categories")}
//             className={`btn ${
//               location.pathname === "/categories" && "text-primary"
//             }`}
//           >
//             All Categories
//           </button>
//         </div>
//       </div>
//     </react.Fragment>
//   );
// };

// export default Navbar;
import react, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { getDocumentUser } from "../../../../firebase.config";
import homeLogo from "../../../../assets/svg/homeLogo";
import SearchComponent from "./SearchComponent";
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

  const dayMessage = () => {
    const hours = new Date().getHours();
    let greet;
    if (hours < 12) greet = "good morning";
    else if (hours >= 12 && hours <= 17) greet = "good afternoon";
    else if (hours >= 17 && hours <= 24) greet = "good evening";
    return greet + " " + currentUser?.displayName;
  };

  useEffect(() => {
    const getUserInfo = async () => {
      if (!currentUser) return;
      const userInfo = await getDocumentUser(currentUser.uid);
      setUserDoc(userInfo);
    };
    getUserInfo();
  }, [currentUser, setUserDoc]);

  return (
    <react.Fragment>
      {/* Main Navbar */}
      <nav
        className="navbar navbar-expand-lg shadow-sm sticky-top"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          borderBottom: "1px solid #e9ecef",
        }}
      >
        <div className="container-fluid px-2 px-md-4 py-2">
          <div className="d-flex align-items-center justify-content-between w-100 flex-wrap ">
            {/* Logo Section */}
            {lg && (
              <Link
                to={"/"}
                className="navbar-brand d-flex align-items-center"
                style={{ transition: "transform 0.2s ease" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                {homeLogo}
              </Link>
            )}

            {/* Greeting and Search Section */}
            <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-2 flex-grow-1">
              {currentUser && lg && (
                <div
                  className="text-capitalize fw-semibold px-3 py-1 rounded-pill"
                  style={{
                    fontSize: "0.9rem",
                    color: "#6c757d",
                    background: "#f8f9fa",
                    border: "1px solid #e9ecef",
                  }}
                >
                  {dayMessage()}
                </div>
              )}

              {(lg || window.location.pathname === "/") && (
                <div
                  className="flex-grow-1"
                  style={{ maxWidth: lg ? "500px" : "100%" }}
                >
                  <SearchComponent />
                </div>
              )}
            </div>

            {/* Right Section - Close/Menu & Profile */}
            <div
              className={`d-flex align-items-center justify-content-between gap-2 ${
                md && window.location.pathname !== "/" && "w-100"
              }`}
            >
              {md && window.location.pathname !== "/" && (
                <button
                  onClick={() => navigate("/")}
                  className="btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "rotate(90deg)";
                    e.currentTarget.style.background = "#fff0f0";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "rotate(0deg)";
                    e.currentTarget.style.background = "";
                  }}
                >
                  <FontAwesomeIcon className="text-danger" icon={faX} />
                </button>
              )}

              <SigningAndProfile />
            </div>
          </div>
        </div>
      </nav>

      {/* Categories Bar */}
      <div
        className="bg-light shadow-sm sticky-top"
        style={{
          top: "60px",
          zIndex: 1020,
          borderBottom: "1px solid #dee2e6",
        }}
      >
        <div className="container-fluid px-2 px-md-4">
          {/* Desktop Categories */}
          <div className="d-none d-md-flex align-items-center justify-content-between py-2">
            <div className="d-flex align-items-center gap-1 flex-wrap">
              {categoriesTitle.map((category, index) => {
                const isActive = category === selectedCategory;
                return (
                  <button
                    key={index}
                    onClick={() => navigate(`category/${category}`)}
                    className={`btn ${
                      isActive
                        ? "btn-danger shadow-sm bg-primary"
                        : "btn-light bg-light"
                    } rounded-pill px-3 py-2 text-capitalize fw-semibold`}
                    style={{
                      fontSize: "0.85rem",
                      transition: "all 0.2s ease",
                      border: isActive ? "none" : "1px solid #dee2e6",
                    }}
                    onMouseOver={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 2px 6px rgba(0,0,0,0.1)";
                        e.currentTarget.style.background = "#ffffff";
                      }
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      if (!isActive) {
                        e.currentTarget.style.boxShadow = "";
                        e.currentTarget.style.background = "";
                      }
                    }}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => navigate("/categories")}
              className={`btn ${
                location.pathname === "/categories"
                  ? "btn-danger shadow-sm"
                  : "btn-outline-danger"
              } rounded-pill px-4 py-2 fw-semibold`}
              style={{
                fontSize: "0.85rem",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                if (location.pathname !== "/categories") {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 6px rgba(220, 53, 69, 0.3)";
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                if (location.pathname !== "/categories") {
                  e.currentTarget.style.boxShadow = "";
                }
              }}
            >
              All Categories
            </button>
          </div>

          {/* Mobile Categories Dropdown */}
          <div className="d-md-none py-2">
            <div className="d-flex align-items-center justify-content-between gap-2">
              <select
                className="form-select shadow-sm"
                style={{
                  border: "1px solid #dee2e6",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  flex: 1,
                }}
                value={selectedCategory || ""}
                onChange={(e) => {
                  if (e.target.value) {
                    navigate(`category/${e.target.value}`);
                  }
                }}
              >
                <option value="">Select Category</option>
                {categoriesTitle.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <button
                onClick={() => navigate("/categories")}
                className={`btn ${
                  location.pathname === "/categories"
                    ? "btn-danger"
                    : "btn-outline-danger"
                } shadow-sm px-3 py-2`}
                style={{
                  fontSize: "0.85rem",
                  borderRadius: "8px",
                  whiteSpace: "nowrap",
                }}
              >
                All
              </button>
            </div>
          </div>
        </div>
      </div>
    </react.Fragment>
  );
};

export default Navbar;
