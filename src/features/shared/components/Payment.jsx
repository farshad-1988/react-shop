// import React, { useContext, useState } from "react";
// import { UserContext } from "../context/UserContext";
// import { CartContext } from "../context/CartContext";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import axios from "axios";
// import {
//   decrementItemFromDbInPurchase,
//   registerPurchasedItem,
// } from "../../../firebase.config";
// import { format, sub } from "date-fns";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import QueryResponsive from "../hooks/QueryResponsive";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStripe } from "@fortawesome/free-brands-svg-icons";

// function Payment() {
//   const navigate = useNavigate();
//   const { userId } = useParams();
//   const { currentUser, userDoc } = useContext(UserContext);
//   const { totalCountAndPrice, cartItems, cartDispatch } =
//     useContext(CartContext);
//   const { totalCount, totalPrice } = totalCountAndPrice;
//   const [deliveryDay, setDeliveryDay] = useState("");
//   const [uploadingSpinner, setUploadingSpinner] = useState("");
//   const { lg } = QueryResponsive();

//   const stripe = useStripe();
//   const elements = useElements();

//   const registerItemsInDb = async () => {
//     try {
//       await decrementItemFromDbInPurchase(cartItems);
//       await registerPurchasedItem(
//         currentUser.uid,
//         cartItems,
//         { totalCountAndPrice },
//         deliveryDay
//       );
//       // await finalPay(currentUser ,cartItems)
//       cartDispatch({ type: "SET_CART_ITEMS", payload: [] });
//       // cartDispatch({ type: "CHANGING_IN_CART" })
//     } catch (error) {
//       console.log(error);
//       toast.error("there was an error in register items in doc");
//       return;
//     }
//   };

//   const pay = async (e) => {
//     e.preventDefault();
//     setUploadingSpinner("spinner-border");

//     if (!stripe || !elements) {
//       toast.error("problem in connection to stripe");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "/.netlify/functions/create-payment-intent",
//         { totalPrice }
//       );
//       const data = await response.data;
//       const clientSecret = data.paymentIntent.client_secret;

//       const paymentResult = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             name: "farshad farazdel",
//           },
//         },
//       });

//       if (paymentResult.error) {
//         toast.error("there is a problem in payment");
//         throw new Error("payment problem");
//       } else if (paymentResult.paymentIntent.status === "succeeded") {
//         await registerItemsInDb();
//         setUploadingSpinner("");
//         navigate(`/profile/${userId}`);
//         toast.success("payment was successful");
//       }
//     } catch (error) {
//       console.log(error);
//     }

//     setUploadingSpinner("");
//   };

//   if (!currentUser) return;

//   return (
//     <div
//       className={`col-12 col-lg-6 rounded text-center m-auto mb-5 r-1 mt-3 ${
//         lg && "position-fixed"
//       } ff-payment-box`}
//     >
//       <div className="text-light text-start">
//         <FontAwesomeIcon size="2xl" icon={faStripe} />
//       </div>
//       <div className="p-3">
//         <p>number of ordered item {totalCount}</p>
//         <p>total price {totalPrice}$</p>
//         {userDoc?.address ? (
//           <div>
//             <p>deliver to: {userDoc?.address.city}</p>
//             <p>{userDoc?.address.address1}</p>
//             <p>{userDoc?.address.address2}</p>
//           </div>
//         ) : (
//           <span className="text-danger text-nowrap">
//             please compelete your profile info before payment
//           </span>
//         )}
//         <button
//           type="button"
//           className=" mb-3 btn btn-primary dropdown-toggle mt-3"
//           data-bs-toggle="dropdown"
//         >
//           {deliveryDay || "select a day to deliver"}
//         </button>
//         <ul name="time" className="dropdown-menu">
//           {Array.from({ length: 5 }).map((item, index) => {
//             return (
//               <li key={`delivery_days_list${index}`}>
//                 <button
//                   onClick={() =>
//                     setDeliveryDay(
//                       format(sub(new Date(), { days: -index - 1 }), "PPPP")
//                     )
//                   }
//                   className="dropdown-item"
//                 >
//                   {format(sub(new Date(), { days: -index - 1 }), "PPPP")}
//                 </button>
//               </li>
//             );
//           })}
//         </ul>
//         <form onSubmit={pay}>
//           <div className="mt-3">
//             <CardElement
//               options={{
//                 style: {
//                   base: {
//                     fontSize: "16px",
//                     backgroundColor: "#eee",
//                     fontSmoothing: "always",
//                     fontStyle: "italic",
//                     iconColor: "green",
//                   },
//                 },
//               }}
//             />
//           </div>

//           <button
//             disabled={
//               cartItems?.length === 0 || !deliveryDay || !userDoc?.address
//             }
//             type="submit"
//             className="btn btn-danger mt-3 ps-5 pe-5"
//           >
//             <span
//               style={{ width: "15px", height: "15px", fontSize: "10px" }}
//               className={`${uploadingSpinner}`}
//             ></span>{" "}
//             pay now
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Payment;
import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import {
  decrementItemFromDbInPurchase,
  registerPurchasedItem,
} from "../../../firebase.config";
import { format, sub } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import QueryResponsive from "../hooks/QueryResponsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStripe } from "@fortawesome/free-brands-svg-icons";

function Payment() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { currentUser, userDoc } = useContext(UserContext);
  const { totalCountAndPrice, cartItems, cartDispatch } =
    useContext(CartContext);
  const { totalCount, totalPrice } = totalCountAndPrice;
  const [deliveryDay, setDeliveryDay] = useState("");
  const [uploadingSpinner, setUploadingSpinner] = useState("");
  const [isSticky, setIsSticky] = useState(true);
  const paymentRef = useRef(null);
  const { lg } = QueryResponsive();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const handleScroll = () => {
      if (!paymentRef.current) return;

      const footer = document.querySelector("footer");
      if (!footer) {
        setIsSticky(true);
        return;
      }

      const paymentRect = paymentRef.current.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();

      // Check if payment component would overlap with footer
      if (footerRect.top <= paymentRect.bottom) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const registerItemsInDb = async () => {
    try {
      await decrementItemFromDbInPurchase(cartItems);
      await registerPurchasedItem(
        currentUser.uid,
        cartItems,
        { totalCountAndPrice },
        deliveryDay,
      );
      cartDispatch({ type: "SET_CART_ITEMS", payload: [] });
    } catch (error) {
      console.log(error);
      toast.error("there was an error in register items in doc");
      return;
    }
  };

  const pay = async (e) => {
    e.preventDefault();
    setUploadingSpinner("spinner-border");

    if (!stripe || !elements) {
      toast.error("problem in connection to stripe");
      return;
    }

    try {
      const response = await axios.post(
        "/.netlify/functions/create-payment-intent",
        { totalPrice },
      );
      const data = await response.data;
      const clientSecret = data.paymentIntent.client_secret;

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "farshad farazdel",
          },
        },
      });

      if (paymentResult.error) {
        toast.error("there is a problem in payment");
        throw new Error("payment problem");
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        await registerItemsInDb();
        setUploadingSpinner("");
        navigate(`/profile/${userId}`);
        toast.success("payment was successful");
      }
    } catch (error) {
      console.log(error);
    }

    setUploadingSpinner("");
  };

  if (!currentUser) return;

  return (
    <div className="col-12 col-lg-5">
      <div
        ref={paymentRef}
        className={isSticky ? "position-sticky" : ""}
        style={isSticky ? { top: "20px" } : {}}
      >
        <div className="card shadow border-0 rounded-3 overflow-hidden">
          {/* Header with Stripe branding */}
          <div
            className="card-header text-white py-2 px-3"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
            }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="mb-0 fw-bold">Checkout</h5>
              <FontAwesomeIcon
                size="lg"
                icon={faStripe}
                className="opacity-75"
              />
            </div>
          </div>

          <div className="card-body p-3">
            {/* Order Summary */}
            <div className="mb-3">
              <h6 className="fw-semibold mb-2" style={{ fontSize: "0.9rem" }}>
                Order Summary
              </h6>
              <div className="bg-light rounded-2 p-2">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="text-muted small">Items</span>
                  <span
                    className="badge bg-primary rounded-pill"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {totalCount}
                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center pt-1 border-top">
                  <span className="fw-semibold small">Total</span>
                  <span className="fs-5 fw-bold text-success">
                    ${totalPrice}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="mb-3">
              <h6 className="fw-semibold mb-2" style={{ fontSize: "0.9rem" }}>
                Delivery Address
              </h6>
              {userDoc?.address ? (
                <div className="bg-light rounded-2 p-2">
                  <div className="d-flex align-items-start">
                    <i
                      className="bi bi-geo-alt-fill text-primary me-2 mt-1"
                      style={{ fontSize: "0.85rem" }}
                    ></i>
                    <div>
                      <p className="mb-0 fw-semibold small">
                        {userDoc.address.city}
                      </p>
                      <p
                        className="mb-0 text-muted"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {userDoc.address.address1}
                        {userDoc.address.address2 &&
                          `, ${userDoc.address.address2}`}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="alert alert-warning border-0 rounded-2 py-2 px-2 mb-0"
                  role="alert"
                  style={{ fontSize: "0.8rem" }}
                >
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <span>Complete profile info before payment</span>
                </div>
              )}
            </div>

            {/* Delivery Date Selection */}
            <div className="mb-3">
              <h6 className="fw-semibold mb-2" style={{ fontSize: "0.9rem" }}>
                Delivery Date
              </h6>
              <div className="dropdown w-100">
                <button
                  type="button"
                  className="btn btn-outline-primary w-100 d-flex justify-content-between align-items-center py-2 rounded-2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ fontSize: "0.85rem" }}
                >
                  <span className={deliveryDay ? "text-dark" : "text-muted"}>
                    <i className="bi bi-calendar-event me-2"></i>
                    {deliveryDay || "Choose delivery date"}
                  </span>
                  <i className="bi bi-chevron-down"></i>
                </button>
                <ul className="dropdown-menu w-100 shadow-sm border-0 rounded-2 mt-1">
                  {Array.from({ length: 5 }).map((item, index) => {
                    const date = sub(new Date(), { days: -index - 1 });
                    return (
                      <li key={`delivery_days_list${index}`}>
                        <button
                          onClick={() => setDeliveryDay(format(date, "PPPP"))}
                          className="dropdown-item py-2 px-2"
                          style={{ fontSize: "0.85rem" }}
                        >
                          <i className="bi bi-truck me-2 text-primary"></i>
                          {format(date, "PPPP")}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={pay}>
              <div className="mb-3">
                <h6 className="fw-semibold mb-2" style={{ fontSize: "0.9rem" }}>
                  Payment Details
                </h6>
                <div className="border rounded-2 p-2 bg-white">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "15px",
                          color: "#424770",
                          fontFamily: '"Segoe UI", Roboto, sans-serif',
                          fontSmoothing: "antialiased",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                          iconColor: "#6366f1",
                        },
                        invalid: {
                          color: "#dc3545",
                          iconColor: "#dc3545",
                        },
                      },
                    }}
                  />
                </div>
                <div
                  className="d-flex align-items-center mt-1 text-muted"
                  style={{ fontSize: "0.75rem" }}
                >
                  <i className="bi bi-shield-lock-fill me-1 text-success"></i>
                  <span>Encrypted & secure</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="d-grid">
                <button
                  disabled={
                    cartItems?.length === 0 || !deliveryDay || !userDoc?.address
                  }
                  type="submit"
                  className="btn btn-primary py-2 rounded-2 fw-semibold"
                  style={{
                    background:
                      "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                    border: "none",
                    fontSize: "0.95rem",
                  }}
                >
                  {uploadingSpinner ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                        style={{ width: "1rem", height: "1rem" }}
                      ></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-lock-fill me-2"></i>
                      Pay ${totalPrice}
                    </>
                  )}
                </button>
              </div>

              {/* Security Badge */}
              <div className="text-center mt-2">
                <small className="text-muted" style={{ fontSize: "0.7rem" }}>
                  <i className="bi bi-shield-check me-1"></i>
                  SSL Encrypted
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
