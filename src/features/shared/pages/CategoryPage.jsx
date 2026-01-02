// import { useParams } from "react-router-dom";
// import { getSingleCategoryItem } from "../../../firebase.config";
// import { useContext, useEffect } from "react";
// import { ShopContext } from "../context/ShopContext";
// import Item from "../components/Item";
// import LoadingPageComponent from "../components/LoadingPageComponent";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { useState } from "react";

// const CategoryPage = () => {
//   const { category } = useParams();
//   const { singleCategoryToShow, dispatch, loadingPage } =
//     useContext(ShopContext);
//   const [lastItem, setLastItem] = useState("");
//   const [ifThereIsMoreItems, setIfThereIsMoreItems] = useState(true);
//   const [sortType, setSortType] = useState(["dateAdded", "desc"]);
//   // const loadMoreContent = ()=>{
//   //     console.log(1111)

//   // }
//   // window.onscroll = ()=>{

//   //     // if (categoryListRef.current) {
//   //         const { scrollTop, scrollHeight, clientHeight } = window;
//   //         console.log( scrollTop, scrollHeight, clientHeight )
//   //         if (scrollTop + clientHeight === scrollHeight) {
//   //             console.log("Fire")
//   //         }
//   //         // }
//   // }

//   const nextLoading = async () => {
//     const tenItemsDocs = await getSingleCategoryItem(
//       category,
//       lastItem,
//       sortType
//     );
//     if (tenItemsDocs.length === 0) setIfThereIsMoreItems(false);
//     setLastItem(tenItemsDocs[tenItemsDocs.length - 1]);
//     const tenItems = tenItemsDocs.map((item) => item.data());
//     dispatch({ type: "UPDATE_SINGLE_CATEGORY", payload: tenItems });
//   };

//   useEffect(() => {
//     const getItems = async (category) => {
//       dispatch({ type: "LOADING_PAGE_ON" });
//       const tenItemsDocs = await getSingleCategoryItem(category, 0, sortType);
//       setLastItem(tenItemsDocs[tenItemsDocs.length - 1]);
//       const tenItems = tenItemsDocs.map((item) => item.data());
//       dispatch({ type: "SET_SINGLE_CATEGORY", payload: tenItems });
//       tenItems.length <= 4
//         ? setIfThereIsMoreItems(false)
//         : setIfThereIsMoreItems(true);
//     };
//     getItems(category);
//     return () => dispatch({ type: "RESET_SINGLE_CATEGORY" });
//   }, [category, dispatch, sortType]);

//   // useEffect(()=>{
//   //     const getItems = async (category)=>{
//   //         dispatch({type:"LOADING_PAGE_ON"})
//   //         const tenItemsDocs= await getSingleCategoryItem(category , 0 , sortType)
//   //         setLastItem(tenItemsDocs[tenItemsDocs.length-1])
//   //         const tenItems = tenItemsDocs.map((item) => item.data())
//   //         dispatch({type:"SET_SINGLE_CATEGORY" , payload:tenItems})
//   //         tenItems.length <= 4 ? setIfThereIsMoreItems(false) : setIfThereIsMoreItems(true)
//   //     }
//   //     getItems(category)
//   //     return () => dispatch({type:"RESET_SINGLE_CATEGORY"})
//   // },[category, dispatch, sortType])

//   //sort by best seller , price , name , date added
//   // <RemoveScrollBar />
//   const categorySort = [
//     ["newest", "dateAdded", "desc"],
//     ["name", "name", "asc"],
//     ["best seller", "purchasedCount", "desc"],
//     ["cheapest", "price", "asc"],
//     ["the most expensive", "price", "desc"],
//   ];
//   const selectSortType = (e) => {
//     setSortType(e.target.value.split(","));
//   };

//   return (
//     <div>
//       <div className="nav-pills d-flex align-items-center" role="tablist">
//         <span>sort by:</span>
//         {categorySort.map((typeOfSort, index) => {
//           return (
//             <button
//               disabled={loadingPage}
//               data-bs-toggle="pill"
//               type="button"
//               onClick={selectSortType}
//               value={typeOfSort.slice(1, 3)}
//               key={`sort-type${index}`}
//               className={`btn text-primary p-1  ${
//                 typeOfSort[0] === "newest" && "active"
//               } ff-sort-type`}
//             >
//               {typeOfSort[0]}
//             </button>
//           );
//         })}
//       </div>
//       {loadingPage ? (
//         <LoadingPageComponent />
//       ) : (
//         <InfiniteScroll
//           className="overflow-hidden"
//           endMessage={
//             <p className="text-center text-success">you've seen all items</p>
//           }
//           dataLength={singleCategoryToShow.length}
//           hasMore={ifThereIsMoreItems}
//           next={nextLoading}
//           loader={
//             <p className="text-center">
//               loading<span className="spinner-border spinner-border-sm"></span>
//             </p>
//           }
//         >
//           <div className="col-12 col-md-6 col-lg-4">
//             {singleCategoryToShow?.map((item) => {
//               return <Item key={`singleCat${item.id}`} itemInfo={item} />;
//             })}
//           </div>
//         </InfiniteScroll>
//       )}
//     </div>
//   );
// };

// export default CategoryPage;
import { useParams } from "react-router-dom";
import { getSingleCategoryItem } from "../../../firebase.config";
import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Item from "../components/Item";
import LoadingPageComponent from "../components/LoadingPageComponent";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

const CategoryPage = () => {
  const { category } = useParams();
  const { singleCategoryToShow, dispatch, loadingPage } =
    useContext(ShopContext);
  const [lastItem, setLastItem] = useState("");
  const [ifThereIsMoreItems, setIfThereIsMoreItems] = useState(true);
  const [sortType, setSortType] = useState(["dateAdded", "desc"]);

  const nextLoading = async () => {
    const tenItemsDocs = await getSingleCategoryItem(
      category,
      lastItem,
      sortType
    );
    if (tenItemsDocs.length === 0) setIfThereIsMoreItems(false);
    setLastItem(tenItemsDocs[tenItemsDocs.length - 1]);
    const tenItems = tenItemsDocs.map((item) => item.data());
    dispatch({ type: "UPDATE_SINGLE_CATEGORY", payload: tenItems });
  };

  useEffect(() => {
    const getItems = async (category) => {
      dispatch({ type: "LOADING_PAGE_ON" });
      const tenItemsDocs = await getSingleCategoryItem(category, 0, sortType);
      setLastItem(tenItemsDocs[tenItemsDocs.length - 1]);
      const tenItems = tenItemsDocs.map((item) => item.data());
      dispatch({ type: "SET_SINGLE_CATEGORY", payload: tenItems });
      tenItems.length <= 4
        ? setIfThereIsMoreItems(false)
        : setIfThereIsMoreItems(true);
    };
    getItems(category);
    return () => dispatch({ type: "RESET_SINGLE_CATEGORY" });
  }, [category, dispatch, sortType]);

  const categorySort = [
    ["newest", "dateAdded", "desc", "🆕"],
    ["name", "name", "asc", "🔤"],
    ["best seller", "purchasedCount", "desc", "⭐"],
    ["cheapest", "price", "asc", "💰"],
    ["expensive", "price", "desc", "💎"],
  ];

  const selectSortType = (sortValue) => {
    setSortType(sortValue);
  };

  return (
    <div className="container-fluid px-2 px-sm-3 px-md-4 py-3 py-md-4">
      {/* Category Header */}
      <div className="mb-3 mb-md-4">
        {/* Modern Sort Section - Dropdown on Mobile, Pills on Desktop */}

        {/* Mobile Dropdown (visible on screens < 768px) */}
        <div className="d-md-none">
          <div className="d-flex align-items-center gap-2 mb-2">
            <label
              htmlFor="sortSelect"
              className="text-muted fw-semibold mb-0"
              style={{ fontSize: "0.9rem" }}
            >
              Sort by:
            </label>
            <select
              id="sortSelect"
              disabled={loadingPage}
              className="form-select form-select-sm shadow-sm"
              style={{
                maxWidth: "200px",
                border: "1px solid #dee2e6",
                borderRadius: "8px",
                fontSize: "0.85rem",
              }}
              value={`${sortType[0]},${sortType[1]}`}
              onChange={(e) => selectSortType(e.target.value.split(","))}
            >
              {categorySort.map((typeOfSort, index) => (
                <option
                  key={`sort-mobile-${index}`}
                  value={`${typeOfSort[1]},${typeOfSort[2]}`}
                >
                  {typeOfSort[3]} {typeOfSort[0]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Desktop Pills (visible on screens >= 768px) */}
        <div className="d-none d-md-block">
          <div className=" rounded-3  px-2">
            <div className="d-flex flex-wrap align-items-center gap-2">
              <span
                className="text-muted fw-semibold me-2"
                style={{ fontSize: "0.9rem" }}
              >
                Sort by:
              </span>
              <div className="d-flex flex-wrap gap-2">
                {categorySort.map((typeOfSort, index) => {
                  const isActive =
                    sortType[0] === typeOfSort[1] &&
                    sortType[1] === typeOfSort[2];
                  return (
                    <button
                      key={`sort-desktop-${index}`}
                      disabled={loadingPage}
                      type="button"
                      onClick={() => selectSortType(typeOfSort.slice(1, 3))}
                      className={`btn ${
                        isActive
                          ? "btn-danger shadow-sm"
                          : "btn-outline-secondary"
                      } rounded-pill px-3 py-2 fw-semibold`}
                      style={{
                        fontSize: "0.85rem",
                        transition: "all 0.2s ease",
                        border: isActive ? "none" : "1px solid #dee2e6",
                      }}
                      onMouseOver={(e) => {
                        if (!isActive && !loadingPage) {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow =
                            "0 2px 8px rgba(0,0,0,0.1)";
                        }
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        if (!isActive) {
                          e.currentTarget.style.boxShadow = "";
                        }
                      }}
                    >
                      <span className="me-1">{typeOfSort[3]}</span>
                      {typeOfSort[0]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loadingPage ? (
        <LoadingPageComponent />
      ) : (
        <InfiniteScroll
          className="overflow-hidden"
          endMessage={
            <div className="text-center py-4 py-md-5">
              <div className="d-inline-block px-3 px-sm-4 py-2 py-sm-3 bg-light rounded-3 shadow-sm">
                <span
                  className="text-success fw-semibold"
                  style={{ fontSize: "clamp(0.85rem, 2vw, 1rem)" }}
                >
                  ✓ You've seen all items
                </span>
              </div>
            </div>
          }
          dataLength={singleCategoryToShow.length}
          hasMore={ifThereIsMoreItems}
          next={nextLoading}
          loader={
            <div className="text-center py-3 py-md-4">
              <div className="d-inline-flex align-items-center gap-2 px-3 px-sm-4 py-2 py-sm-3 bg-light rounded-3 shadow-sm">
                <span className="spinner-border spinner-border-sm text-danger"></span>
                <span
                  className="text-muted fw-semibold"
                  style={{ fontSize: "clamp(0.85rem, 2vw, 1rem)" }}
                >
                  Loading...
                </span>
              </div>
            </div>
          }
        >
          <div className="row g-2 g-sm-3 g-md-4">
            {singleCategoryToShow?.map((item) => {
              return (
                <div
                  key={`singleCat${item.id}`}
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                >
                  <div
                    className="h-100"
                    style={{
                      transition: "transform 0.2s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <Item itemInfo={item} />
                  </div>
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default CategoryPage;
