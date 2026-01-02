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
//   const userSchema = yup.object().shape({
//     email: yup
//       .string()
//       .email("your email is not valid")
//       .required("you must enter your email address"),
//     password: yup.string().min(4).max(30).required("enter password please"),
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: yupResolver(userSchema) });

//   const login = async ({ email, password }) => {
//     try {
//       const cartAndUserAfterSignin = await signInWithEmail(
//         email,
//         password,
//         cartItems
//       );
//       cartDispatch({
//         type: "SET_CART_ITEMS",
//         payload: cartAndUserAfterSignin.newCart,
//       });
//       setUserDoc(cartAndUserAfterSignin.userInfo);
//       // cartDispatch({ type: "CHANGING_IN_CART" })

//       navigate("/");
//     } catch (error) {
//       console.error(errors);
//     }
//   };

//   return (
//     <form className="container w-75" onSubmit={handleSubmit(login)}>
//       <span>email: </span>
//       <input className="form-control" type="email" {...register("email")} />
//       <span>password: </span>
//       <input
//         className="form-control"
//         type="password"
//         {...register("password")}
//       />
//       <div className="text-center mt-3">
//         <button className="btn btn-primary w-50" type="submit">
//           log in
//         </button>
//       </div>
//       {/* <button type="button" onClick={()=>signOutUser()}>signout</button> */}
//     </form>
//   );
// };

// export default Signin;

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmail } from "../../../firebase.config";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

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

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card shadow-sm border-0"
        style={{ width: "100%", maxWidth: 420 }}
      >
        <div className="card-body p-4">
          <h4 className="text-center fw-semibold mb-4">
            Sign in to your account
          </h4>

          <form onSubmit={handleSubmit(login)} noValidate>
            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="you@example.com"
                {...register("email")}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="btn btn-primary w-100 py-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Log in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
