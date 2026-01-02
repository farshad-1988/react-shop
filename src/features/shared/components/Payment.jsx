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
        deliveryDay
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
        { totalPrice }
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
    <div className="col-12 col-lg-6">
      <div
        ref={paymentRef}
        className={isSticky ? "position-sticky" : ""}
        style={isSticky ? { top: "20px" } : {}}
      >
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
          {/* Header with Stripe branding */}
          <div
            className="card-header bg-gradient text-white "
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
            }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <h3 className="mb-0 fw-bold">Secure Checkout</h3>
              <FontAwesomeIcon
                size="2xl"
                icon={faStripe}
                className="opacity-75"
              />
            </div>
          </div>

          <div className="card-body p-4">
            {/* Order Summary */}
            <div className="mb-4">
              <h5 className="fw-semibold mb-3 text-secondary">Order Summary</h5>
              <div className="bg-light rounded-3 p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted">Items</span>
                  <span className="badge bg-primary rounded-pill">
                    {totalCount}
                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                  <span className="fw-bold">Total Amount</span>
                  <span className="fs-4 fw-bold text-success">
                    ${totalPrice}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="mb-4">
              <h5 className="fw-semibold mb-3 text-secondary">
                Delivery Address
              </h5>
              {userDoc?.address ? (
                <div className="bg-light rounded-3 p-3">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-geo-alt-fill text-primary me-2 mt-1"></i>
                    <div>
                      <p className="mb-1 fw-semibold">{userDoc.address.city}</p>
                      <p className="mb-1 text-muted small">
                        {userDoc.address.address1}
                      </p>
                      {userDoc.address.address2 && (
                        <p className="mb-0 text-muted small">
                          {userDoc.address.address2}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="alert alert-warning border-0 rounded-3 d-flex align-items-center"
                  role="alert"
                >
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <span>Please complete your profile info before payment</span>
                </div>
              )}
            </div>

            {/* Delivery Date Selection */}
            <div className="mb-4">
              <h5 className="fw-semibold mb-3 text-secondary">
                Select Delivery Date
              </h5>
              <div className="dropdown w-100">
                <button
                  type="button"
                  className="btn btn-outline-primary w-100 d-flex justify-content-between align-items-center py-3 rounded-3"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className={deliveryDay ? "text-dark" : "text-muted"}>
                    <i className="bi bi-calendar-event me-2"></i>
                    {deliveryDay || "Choose a delivery date"}
                  </span>
                  <i className="bi bi-chevron-down"></i>
                </button>
                <ul className="dropdown-menu w-100 shadow-sm border-0 rounded-3 mt-2">
                  {Array.from({ length: 5 }).map((item, index) => {
                    const date = sub(new Date(), { days: -index - 1 });
                    return (
                      <li key={`delivery_days_list${index}`}>
                        <button
                          onClick={() => setDeliveryDay(format(date, "PPPP"))}
                          className="dropdown-item py-2 px-3 rounded-2"
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
              <div className="mb-4">
                <h5 className="fw-semibold mb-3 text-secondary">
                  Payment Details
                </h5>
                <div className="border rounded-3 p-3 bg-white shadow-sm">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
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
                <div className="d-flex align-items-center mt-2 text-muted small">
                  <i className="bi bi-shield-lock-fill me-2 text-success"></i>
                  <span>Your payment information is encrypted and secure</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="d-grid gap-2">
                <button
                  disabled={
                    cartItems?.length === 0 || !deliveryDay || !userDoc?.address
                  }
                  type="submit"
                  className="btn btn-primary btn-lg py-3 rounded-3 fw-semibold position-relative"
                  style={{
                    background:
                      "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                    border: "none",
                  }}
                >
                  {uploadingSpinner ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-lock-fill me-2"></i>
                      Pay ${totalPrice} Now
                    </>
                  )}
                </button>
              </div>

              {/* Security Badges */}
              <div className="text-center mt-3">
                <small className="text-muted">
                  <i className="bi bi-shield-check me-1"></i>
                  Secure SSL Encryption
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
