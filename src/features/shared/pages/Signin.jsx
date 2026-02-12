// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { signInWithEmail } from "../../../firebase.config";
// import { useContext } from "react";
// import { CartContext } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../context/UserContext";

// const Signin = () => {
//   const { cartDispatch, cartItems } = useContext(CartContext);
//   const { setUserDoc } = useContext(UserContext);
//   const navigate = useNavigate();

//   const userSchema = yup.object({
//     email: yup
//       .string()
//       .email("Email is not valid")
//       .required("Email is required"),
//     password: yup
//       .string()
//       .min(4, "Password must be at least 4 characters")
//       .max(30)
//       .required("Password is required"),
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: yupResolver(userSchema),
//   });

//   const login = async ({ email, password }) => {
//     try {
//       const result = await signInWithEmail(email, password, cartItems);

//       cartDispatch({
//         type: "SET_CART_ITEMS",
//         payload: result.newCart,
//       });

//       setUserDoc(result.userInfo);
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
//       <div
//         className="card shadow-sm border-0"
//         style={{ width: "100%", maxWidth: 420 }}
//       >
//         <div className="card-body p-4">
//           <h4 className="text-center fw-semibold mb-4">
//             Sign in to your account
//           </h4>

//           <form onSubmit={handleSubmit(login)} noValidate>
//             {/* Email */}
//             <div className="mb-3">
//               <label className="form-label">Email</label>
//               <input
//                 type="email"
//                 className={`form-control ${errors.email ? "is-invalid" : ""}`}
//                 placeholder="you@example.com"
//                 {...register("email")}
//               />
//               {errors.email && (
//                 <div className="invalid-feedback">{errors.email.message}</div>
//               )}
//             </div>

//             {/* Password */}
//             <div className="mb-4">
//               <label className="form-label">Password</label>
//               <input
//                 type="password"
//                 className={`form-control ${
//                   errors.password ? "is-invalid" : ""
//                 }`}
//                 placeholder="••••••••"
//                 {...register("password")}
//               />
//               {errors.password && (
//                 <div className="invalid-feedback">
//                   {errors.password.message}
//                 </div>
//               )}
//             </div>

//             {/* Button */}
//             <button
//               type="submit"
//               className="btn btn-primary w-100 py-2"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Signing in..." : "Log in"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signin;
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmail, signInWithGoogle } from "../../../firebase.config";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const Signin = () => {
  const { cartDispatch, cartItems } = useContext(CartContext);
  const { setUserDoc } = useContext(UserContext);
  const navigate = useNavigate();

  const userSchema = yup.object({
    email: yup
      .string()
      .email("Email is not valid")
      .required("Email is required"),
    password: yup
      .string()
      .min(4, "Password must be at least 4 characters")
      .max(30)
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const login = async ({ email, password }) => {
    try {
      const result = await signInWithEmail(email, password, cartItems);

      cartDispatch({
        type: "SET_CART_ITEMS",
        payload: result.newCart,
      });

      setUserDoc(result.userInfo);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle(cartItems);
    setUserDoc(user.userInfo);
    user &&
      toast.success(
        `welcome ${user.user.displayName}! ${
          !user.hasAddress
            ? "you are successfully logged in but we need more info for complete your registeration"
            : ""
        }`,
      );
    user.newCart &&
      cartDispatch({ type: "SET_CART_ITEMS", payload: user.newCart });
    // user.newCart && cartDispatch({ type: "CHANGING_IN_CART" });
    navigate("/");
    !user.hasAddress && navigate(`/edituserdata/${user.user.uid}`);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div
        className="card shadow-lg border-0"
        style={{
          width: "100%",
          maxWidth: 480,
          borderRadius: "20px",
        }}
      >
        <div className="card-body p-5">
          {/* Header */}
          <div className="text-center mb-4">
            <h3 className="fw-bold mb-2" style={{ color: "#2C3E50" }}>
              Welcome Back
            </h3>
            <p className="text-muted mb-0">Sign in to continue shopping</p>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn btn-light w-100 py-3 mb-4 d-flex align-items-center justify-content-center gap-3 shadow-sm"
            style={{
              border: "1px solid #E8E8E8",
              borderRadius: "12px",
              fontSize: "0.95rem",
              fontWeight: "500",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M19.8055 10.2292C19.8055 9.55056 19.7499 8.86717 19.6305 8.19812H10.2V12.0492H15.6014C15.3773 13.2911 14.6571 14.3898 13.6025 15.0879V17.5866H16.825C18.7171 15.8449 19.8055 13.2728 19.8055 10.2292Z"
                fill="#4285F4"
              />
              <path
                d="M10.2 20C12.9605 20 15.2734 19.1045 16.8286 17.5866L13.6061 15.0879C12.7096 15.6979 11.5521 16.0433 10.2036 16.0433C7.54472 16.0433 5.30007 14.2832 4.51535 11.9169H1.19141V14.4927C2.79598 17.6894 6.30906 20 10.2 20Z"
                fill="#34A853"
              />
              <path
                d="M4.51187 11.9169C4.0923 10.6749 4.0923 9.32937 4.51187 8.08741V5.51172H1.19142C-0.201301 8.33737 -0.201301 11.6669 1.19142 14.4926L4.51187 11.9169Z"
                fill="#FBBC04"
              />
              <path
                d="M10.2 3.95671C11.6248 3.93451 13.0006 4.47422 14.0361 5.45949L16.8951 2.60052C15.1818 0.990498 12.9332 0.0808616 10.2 0.106927C6.30906 0.106927 2.79598 2.41756 1.19141 5.51169L4.51186 8.08738C5.29309 5.71672 7.54124 3.95671 10.2 3.95671Z"
                fill="#EA4335"
              />
            </svg>
            <span style={{ color: "#2C3E50" }}>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="d-flex align-items-center mb-4">
            <hr className="flex-grow-1" style={{ borderColor: "#E8E8E8" }} />
            <span className="px-3 text-muted" style={{ fontSize: "0.85rem" }}>
              Or sign in with email
            </span>
            <hr className="flex-grow-1" style={{ borderColor: "#E8E8E8" }} />
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(login)} noValidate>
            {/* Email */}
            <div className="mb-3">
              <label
                className="form-label fw-semibold"
                style={{ color: "#2C3E50", fontSize: "0.9rem" }}
              >
                Email Address
              </label>
              <div className="position-relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{
                    position: "absolute",
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#A0A0A0",
                    fontSize: "0.9rem",
                  }}
                />
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="you@example.com"
                  {...register("email")}
                  style={{
                    paddingLeft: "45px",
                    height: "50px",
                    borderRadius: "10px",
                    border: "1px solid #E8E8E8",
                    fontSize: "0.95rem",
                  }}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label
                  className="form-label fw-semibold mb-0"
                  style={{ color: "#2C3E50", fontSize: "0.9rem" }}
                >
                  Password
                </label>
                {/* <Link
                  to="/forgot-password"
                  className="text-decoration-none"
                  style={{
                    fontSize: "0.85rem",
                    color: "#667eea",
                    fontWeight: "500",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.textDecoration = "underline")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.textDecoration = "none")
                  }
                >
                  Forgot?
                </Link> */}
              </div>
              <div className="position-relative">
                <FontAwesomeIcon
                  icon={faLock}
                  style={{
                    position: "absolute",
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#A0A0A0",
                    fontSize: "0.9rem",
                  }}
                />
                <input
                  type="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  placeholder="Enter your password"
                  {...register("password")}
                  style={{
                    paddingLeft: "45px",
                    height: "50px",
                    borderRadius: "10px",
                    border: "1px solid #E8E8E8",
                    fontSize: "0.95rem",
                  }}
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-100 py-3 fw-semibold shadow-sm"
              disabled={isSubmitting}
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                borderRadius: "12px",
                color: "#FFFFFF",
                fontSize: "1rem",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(102, 126, 234, 0.4)";
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
              }}
            >
              {isSubmitting ? (
                <span>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-4">
            <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-decoration-none fw-semibold"
                style={{ color: "#667eea" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
