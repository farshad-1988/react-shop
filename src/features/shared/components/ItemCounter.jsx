// import { useContext } from "react"
// import { CartContext } from "../context/CartContext"

// const ItemCounter = ({ itemInfo }) => {
//     const { cartItems, increment, decrement } = useContext(CartContext)

//     const isItemInCart = cartItems?.find((item) => item.id === itemInfo.id)

//     const addItem = () => increment(itemInfo, isItemInCart)
//     const removeItem = () => decrement(itemInfo, isItemInCart)

//     return (
//         // <div className="text-center w-50">
//         <div className="d-flex align-content-center justify-content-center ff-item-counter-size">
//             {cartItems?.find((item) => item.loading && itemInfo.id === item.id) ? <div className="spinner-border m-auto"></div>
//                 : !isItemInCart ? <button onClick={addItem} className="btn btn-danger text-nowrap">add to card</button> :
//                     <div className="d-flex align-content-center">
//                         <button className="btn" onClick={removeItem}> - </button>
//                         <span className="align-self-center">{isItemInCart?.countInCart}</span>
//                         <button disabled={isItemInCart.countInCart >= isItemInCart.countInStock} className="btn" onClick={addItem}> + </button>
//                     </div>}
//         </div>
//         // </div>
//     )
// }

// export default ItemCounter

import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ItemCounter = ({ itemInfo }) => {
  const { cartItems, increment, decrement } = useContext(CartContext);

  const isItemInCart = cartItems?.find((item) => item.id === itemInfo.id);
  const isLoading = cartItems?.find(
    (item) => item.loading && itemInfo.id === item.id
  );

  const addItem = () => increment(itemInfo, isItemInCart);
  const removeItem = () => decrement(itemInfo, isItemInCart);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minWidth: "140px" }}
    >
      {isLoading ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "40px" }}
        >
          <div
            className="spinner-border text-danger spinner-border-sm"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : !isItemInCart ? (
        <button
          onClick={addItem}
          className="btn btn-danger px-4 py-2 fw-semibold shadow-sm text-nowrap"
          style={{
            background: "linear-gradient(135deg, #dc3545 0%, #e91e63 100%)",
            border: "none",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 4px 12px rgba(220, 53, 69, 0.3)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "";
          }}
        >
          Add to Cart
        </button>
      ) : (
        <div className="d-flex align-items-center gap-2 bg-light rounded-3 p-2 shadow-sm">
          <button
            onClick={removeItem}
            className="btn btn-light border-0 shadow-sm d-flex align-items-center justify-content-center fw-bold text-danger"
            style={{
              width: "36px",
              height: "36px",
              fontSize: "1.25rem",
              transition: "all 0.15s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#fff0f0";
              e.currentTarget.style.transform = "scale(0.95)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            −
          </button>
          <span
            className="fw-semibold text-dark px-2"
            style={{ minWidth: "2rem", textAlign: "center" }}
          >
            {isItemInCart?.countInCart}
          </span>
          <button
            onClick={addItem}
            disabled={isItemInCart.countInCart >= isItemInCart.countInStock}
            className="btn btn-light border-0 shadow-sm d-flex align-items-center justify-content-center fw-bold text-danger"
            style={{
              width: "36px",
              height: "36px",
              fontSize: "1.25rem",
              transition: "all 0.15s ease",
            }}
            onMouseOver={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.backgroundColor = "#fff0f0";
                e.currentTarget.style.transform = "scale(0.95)";
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemCounter;
