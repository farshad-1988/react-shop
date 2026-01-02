// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { singleItemFullInfo } from "../../../firebase.config";
// import ItemCounter from "../components/ItemCounter";

// function SingleItem() {
//   const { productId, category } = useParams();
//   const [itemFullInfo, setItemFullInfo] = useState([]);
//   const { imagesUrl, name, price, countInStock, firstPicture } = itemFullInfo;

//   useEffect(() => {
//     const CATEGORY = category.toLocaleUpperCase();

//     const getSingleItemData = async () => {
//       const itemInfo = await singleItemFullInfo(CATEGORY, productId);
//       setItemFullInfo(itemInfo);
//     };
//     getSingleItemData();
//   }, [category, productId]);

//   return (
//     <div className="row m-auto">
//       <div
//         id="demo"
//         className="carousel slide mt-3 col-lg-5 col-md-6 col-sm-11 col-11"
//         data-bs-ride="false"
//       >
//         <div className="carousel-indicators">
//           {imagesUrl?.map((image, index) => (
//             <button
//               key={`img-btn${index}`}
//               type="button"
//               data-bs-target="#demo"
//               data-bs-slide-to={index}
//               className={index === 0 && "active"}
//             ></button>
//           ))}
//         </div>

//         <div className="carousel-inner">
//           {imagesUrl?.map((image, index) => (
//             <div
//               key={`img-pic${index}`}
//               className={`carousel-item ${
//                 index === firstPicture && "active bg-image hover-zoom"
//               }`}
//             >
//               <img src={image} alt="" className="d-block w-100 rounded-3" />
//             </div>
//           ))}
//         </div>

//         <button
//           className="carousel-control-prev"
//           type="button"
//           data-bs-target="#demo"
//           data-bs-slide="prev"
//         >
//           <span className="carousel-control-prev-icon"></span>
//         </button>
//         <button
//           className="carousel-control-next"
//           type="button"
//           data-bs-target="#demo"
//           data-bs-slide="next"
//         >
//           <span className="carousel-control-next-icon"></span>
//         </button>
//       </div>

//       <div className="mt-4 m-auto col-lg-5 col-md-5 col-sm-11 col-11">
//         <p>name of product: {name}</p>
//         <p>category: {category}</p>
//         <p>price: {price}$</p>
//         <p>remain in stock: {countInStock}</p>
//         <div className="ms-5">
//           <ItemCounter itemInfo={itemFullInfo} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SingleItem;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { singleItemFullInfo } from "../../../firebase.config";
import ItemCounter from "../components/ItemCounter";

function SingleItem() {
  const { productId, category } = useParams();
  const [itemFullInfo, setItemFullInfo] = useState([]);
  const { imagesUrl, name, price, countInStock, firstPicture } = itemFullInfo;

  useEffect(() => {
    const CATEGORY = category.toLocaleUpperCase();

    const getSingleItemData = async () => {
      const itemInfo = await singleItemFullInfo(CATEGORY, productId);
      setItemFullInfo(itemInfo);
    };
    getSingleItemData();
  }, [category, productId]);

  return (
    <div className="container py-5">
      <div className="row g-4 align-items-start">
        {/* Image Carousel Section */}
        <div className="col-lg-6 col-md-6">
          <div
            id="demo"
            className="carousel slide shadow-lg rounded-4 overflow-hidden"
            data-bs-ride="false"
          >
            {/* Thumbnail Indicators */}
            <div
              className="carousel-indicators position-relative mt-3 mb-0"
              style={{ bottom: "-60px" }}
            >
              {imagesUrl?.map((image, index) => (
                <button
                  key={`img-btn${index}`}
                  type="button"
                  data-bs-target="#demo"
                  data-bs-slide-to={index}
                  className={`rounded-2 ${index === 0 ? "active" : ""}`}
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    border: "2px solid #fff",
                    opacity: 1,
                  }}
                ></button>
              ))}
            </div>

            {/* Carousel Images */}
            <div className="carousel-inner">
              {imagesUrl?.map((image, index) => (
                <div
                  key={`img-pic${index}`}
                  className={`carousel-item ${
                    index === firstPicture ? "active" : ""
                  }`}
                  style={{ height: "500px" }}
                >
                  <img
                    src={image}
                    alt={`${name} - view ${index + 1}`}
                    className="d-block w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#demo"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon bg-dark bg-opacity-50 rounded-circle p-3"></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#demo"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon bg-dark bg-opacity-50 rounded-circle p-3"></span>
            </button>
          </div>
          <div style={{ height: "70px" }}></div> {/* Spacer for indicators */}
        </div>

        {/* Product Details Section */}
        <div className="col-lg-6 col-md-6">
          <div className="bg-light rounded-4 p-4 shadow-sm h-100">
            {/* Category Badge */}
            <span className="badge bg-primary bg-gradient text-uppercase mb-3 px-3 py-2">
              {category}
            </span>

            {/* Product Name */}
            <h1 className="display-5 fw-bold mb-4 text-dark">{name}</h1>

            {/* Price Section */}
            <div className="mb-4">
              <div className="d-flex align-items-center gap-2">
                <span className="text-muted text-decoration-line-through fs-5">
                  ${(price * 1.2).toFixed(2)}
                </span>
                <span className="badge bg-danger">20% OFF</span>
              </div>
              <h2 className="display-4 fw-bold text-success mb-0">${price}</h2>
            </div>

            {/* Divider */}
            <hr className="my-4" />

            {/* Stock Status */}
            <div className="mb-4">
              <h5 className="text-secondary mb-2">Availability</h5>
              <div className="d-flex align-items-center gap-2">
                {countInStock > 0 ? (
                  <>
                    <span className="badge bg-success-subtle text-success border border-success px-3 py-2">
                      <i className="bi bi-check-circle-fill me-2"></i>
                      In Stock
                    </span>
                    <span className="text-muted">
                      ({countInStock} {countInStock === 1 ? "item" : "items"}{" "}
                      available)
                    </span>
                  </>
                ) : (
                  <span className="badge bg-danger-subtle text-danger border border-danger px-3 py-2">
                    <i className="bi bi-x-circle-fill me-2"></i>
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Divider */}
            <hr className="my-4" />

            {/* Product Features */}
            <div className="mb-4">
              <h5 className="text-secondary mb-3">Product Features</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Free shipping on orders over $50
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  30-day return policy
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Secure payment options
                </li>
              </ul>
            </div>

            {/* Item Counter */}
            <div className="bg-white rounded-3 p-4 shadow-sm">
              <ItemCounter itemInfo={itemFullInfo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleItem;
