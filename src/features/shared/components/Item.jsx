// import ItemCounter from "../components/ItemCounter";
// import { useNavigate } from "react-router-dom";

// const Item = ({ itemInfo }) => {
//   const { imagesUrl, price, countInStock, category, id, firstPicture } = {
//     ...itemInfo,
//   };
//   const navigate = useNavigate();

//   const goToSingleItem = () => {
//     navigate(`/${category}/${id}`);
//   };

//   //just enter items in cart
//   return (
//     // <div className="row">
//     <div className="m-2 rounded-2 ff-size-item-category">
//       <div className="container mt-3">
//         <img
//           className="w-100 img-thumbnail"
//           src={imagesUrl[firstPicture]}
//           alt="anotherPic"
//           onClick={goToSingleItem}
//         />
//         <div className="container d-flex w-100 justify-content-between mt-2 h-auto">
//           <div className="d-flex flex-column w-50 h-100">
//             <h2>{price}$</h2>
//             <p className="text-danger text-nowrap ff-font-12">
//               number in stock {countInStock}
//             </p>
//           </div>
//           <div>
//             <ItemCounter itemInfo={itemInfo} />
//           </div>
//         </div>
//       </div>
//     </div>
//     // </div>
//   );
// };
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import ItemCounter from "../components/ItemCounter";

const Item = ({ itemInfo }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(
    itemInfo.firstPicture
  );
  const [isHovered, setIsHovered] = useState(false);

  const openItemInNewTab = () => {
    const url = `/${itemInfo.category}/${itemInfo.id}`; // 🔴 change route if needed
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === itemInfo.imagesUrl.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? itemInfo.imagesUrl.length - 1 : prev - 1
    );
  };

  const rating = Math.min(
    5,
    Math.max(3.5, 3.5 + itemInfo.purchasedCount / 100)
  );

  return (
    <div
      className="card border-0 shadow-sm h-100"
      style={{ transition: "all 0.3s ease", cursor: "pointer" }}
      onClick={openItemInNewTab}
      onMouseEnter={(e) => {
        setIsHovered(true);
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <div
        className="position-relative"
        style={{
          paddingTop: "100%",
          overflow: "hidden",
          borderRadius: "0.375rem 0.375rem 0 0",
        }}
      >
        <img
          src={itemInfo.imagesUrl[currentImageIndex]}
          alt={itemInfo.name}
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        />

        {itemInfo.imagesUrl.length > 1 && isHovered && (
          <>
            <button
              onClick={prevImage}
              className="btn btn-light position-absolute top-50 start-0 translate-middle-y ms-2 rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: 40, height: 40, opacity: 0.9 }}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={nextImage}
              className="btn btn-light position-absolute top-50 end-0 translate-middle-y me-2 rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: 40, height: 40, opacity: 0.9 }}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      <div className="card-body">
        <div className="d-flex align-items-center gap-2 mb-2">
          <span
            className="badge text-uppercase"
            style={{
              backgroundColor: "#e0e7ff",
              color: "#4f46e5",
              fontSize: "0.7rem",
            }}
          >
            {itemInfo.category}
          </span>

          <div className="d-flex align-items-center gap-1">
            <Star size={16} fill="#fbbf24" color="#fbbf24" />
            <span className="small fw-medium">{rating.toFixed(1)}</span>
          </div>
        </div>

        <h5
          className="card-title fw-semibold mb-3"
          style={{
            minHeight: "3rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {itemInfo.name}
        </h5>

        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h4 className="mb-0 fw-bold">${itemInfo.price.toFixed(2)}</h4>
            <small className="text-muted">{itemInfo.purchasedCount} sold</small>
          </div>

          {/* 🚫 prevent card click here */}
          <div onClick={(e) => e.stopPropagation()}>
            <ItemCounter itemInfo={itemInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
