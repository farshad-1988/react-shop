import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App"
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import UserContextProvider from "./features/shared/context/UserContext";
import ShopContextProvider from "./features/shared/context/ShopContext";
import CartContextProvider from "./features/shared/context/CartContext";
const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_STRIPE_KEY)


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <UserContextProvider>
    <ShopContextProvider>
      <CartContextProvider>
        <Elements stripe={stripePromise}>
          <ToastContainer />
          <App />
        </Elements>
      </CartContextProvider>
    </ShopContextProvider>
  </UserContextProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
