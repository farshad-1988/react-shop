// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

// import { signUpWithEmail } from "../../../firebase.config";
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { CartContext } from "../context/CartContext";

// const RegisterUserData = () => {
//   const navigate = useNavigate();
//   const { cartDispatch, cartItems } = useContext(CartContext);

//   const userSchema = yup.object().shape({
//     name: yup.string().min(3).required("please enter a valid name"),
//     lastName: yup.string().min(3).required("please enter a valid family"),
//     email: yup
//       .string()
//       .email("you must enter valid email address")
//       .required("enter email address"),
//     phoneNumber: yup.number().min(10).required("enter phone number"),
//     address: yup.object({
//       address1: yup.string().max(30).required("please enter your address"),
//       address2: yup.string().max(30),
//       city: yup.string().max(20).required("please enter your city"),
//       district: yup
//         .string()
//         .max(20)
//         .required("please enter your district or state"),
//       zipCode: yup.string().max(10).required("please enter your zip code"),
//       country: yup.string().max(20).required("please enter your country"),
//     }),
//     password: yup.string().min(4).max(15).required("use a password"),
//     confirmPassword: yup
//       .string()
//       .oneOf([yup.ref("password"), "password is not match"])
//       .required("you must confirm pass"),
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: yupResolver(userSchema) });

//   const submitFormToDB = async ({
//     email,
//     name,
//     lastName,
//     password,
//     address,
//     phoneNumber,
//   }) => {
//     await signUpWithEmail(
//       email,
//       name,
//       lastName,
//       password,
//       address,
//       phoneNumber,
//       cartItems
//     );
//     cartDispatch({ type: "SET_CART_ITEMS", payload: cartItems });
//     // cartDispatch({ type: "CHANGING_IN_CART" });
//     // cartDispatch({type:"SET_SIGNING_TYPE" , payload:"signup"})
//     navigate("/");
//   };

//   return (
//     <form
//       className="container m-auto col-8 row"
//       onSubmit={handleSubmit(submitFormToDB)}
//     >
//       <div className="mt-2 col-6">
//         <span>first name:</span>
//         <input
//           className="form-control"
//           type="text"
//           placeholder="please enter your firstname..."
//           {...register("name")}
//         />
//         {errors.name?.message && (
//           <p className="text-danger">{errors.name.message}</p>
//         )}
//       </div>
//       <div className="mt-2 col-6">
//         <span>last name:</span>
//         <input
//           className="form-control"
//           type="text"
//           placeholder="please enter your lastname..."
//           {...register("lastName")}
//         />
//         {errors.lastName?.message && (
//           <p className="text-danger">{errors.lastName.message}</p>
//         )}
//       </div>
//       <div className="mt-2 col-6">
//         <span>email address:</span>
//         <input
//           className="form-control"
//           type="text"
//           placeholder="please enter your email..."
//           {...register("email")}
//         />
//         {errors.email?.message && (
//           <p className="text-danger">{errors.email.message}</p>
//         )}
//       </div>
//       <div className="mt-2 col-6">
//         <span>phone number:</span>
//         <input
//           className="form-control"
//           type="number"
//           placeholder="please enter your email..."
//           {...register("phoneNumber")}
//         />
//         {errors.phoneNumber?.message && (
//           <p className="text-danger">{errors.phoneNumber.message}</p>
//         )}
//       </div>

//       <div className="mt-2 col-6">
//         <span>address1:</span>
//         <input
//           className="form-control"
//           type="text"
//           placeholder="please enter your postal address..."
//           {...register("address.address1")}
//         />
//         {errors.address?.address1?.message && (
//           <p className="text-danger">{errors.address?.address1.message}</p>
//         )}
//       </div>
//       <div className="mt-2 col-6">
//         <span>address2:</span>
//         <input
//           className="form-control"
//           type="text"
//           placeholder="please enter your postal address..."
//           {...register("address.address2")}
//         />
//         {errors.address?.address2?.message && (
//           <p className="text-danger">{errors.address?.address2.message}</p>
//         )}
//       </div>
//       <div className="mt-2 col-3">
//         <span>city:</span>
//         <input
//           className="form-control"
//           type="text"
//           placeholder="please enter your postal address..."
//           {...register("address.city")}
//         />
//         {errors.address?.city?.message && (
//           <p className="text-danger">{errors.address?.city.message}</p>
//         )}
//       </div>
//       <div className="mt-2 col-3">
//         <span>district:</span>
//         <input
//           className="form-control"
//           type="text"
//           placeholder="please enter your postal address..."
//           {...register("address.district")}
//         />
//         {errors.address?.district?.message && (
//           <p className="text-danger">{errors.address?.district.message}</p>
//         )}
//       </div>
//       <div className="mt-2 col-3">
//         <span>zipCode:</span>
//         <input
//           className="form-control"
//           type="text"
//           placeholder="please enter your postal address..."
//           {...register("address.zipCode")}
//         />
//         {errors.address?.zipCode?.message && (
//           <p className="text-danger">{errors.address?.zipCode.message}</p>
//         )}
//       </div>
//       <div className="mt-2 col-3">
//         <span>country:</span>
//         <input
//           className="form-control"
//           type="text"
//           placeholder="please enter your postal address..."
//           {...register("address.country")}
//         />
//         {errors.address?.country?.message && (
//           <p className="text-danger">{errors.address?.country.message}</p>
//         )}
//       </div>
//       <div className="mt-2 col-6">
//         <span>password:</span>
//         <input
//           className="form-control"
//           type="password"
//           placeholder="please enter your password..."
//           {...register("password")}
//         />
//         {errors.password?.message && (
//           <p className="text-danger">{errors.password.message}</p>
//         )}
//       </div>
//       <div className="mt-2 col-6">
//         <span>repeat password:</span>
//         <input
//           className="form-control"
//           type="password"
//           placeholder="please confirm your password..."
//           {...register("confirmPassword")}
//         />
//         {errors.confirmPassword?.message && (
//           <p className="text-danger">{errors.confirmPassword.message}</p>
//         )}
//       </div>
//       <div className="text-center">
//         <button className="mt-3 btn btn-primary w-50" type="submit">
//           register
//         </button>
//       </div>
//     </form>
//   );
// };

// export default RegisterUserData;
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpWithEmail } from "../../../firebase.config";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const RegisterUserData = () => {
  const navigate = useNavigate();
  const { cartDispatch, cartItems } = useContext(CartContext);

  const userSchema = yup.object({
    name: yup
      .string()
      .min(3, "First name is too short")
      .required("First name is required"),
    lastName: yup
      .string()
      .min(3, "Last name is too short")
      .required("Last name is required"),
    email: yup
      .string()
      .email("Email is not valid")
      .required("Email is required"),
    phoneNumber: yup
      .string()
      .min(10, "Phone number is not valid")
      .required("Phone number is required"),
    address: yup.object({
      address1: yup.string().max(30).required("Address is required"),
      address2: yup.string().max(30).nullable(),
      city: yup.string().max(20).required("City is required"),
      district: yup.string().max(20).required("State / District is required"),
      zipCode: yup.string().max(10).required("Zip code is required"),
      country: yup.string().max(20).required("Country is required"),
    }),
    password: yup.string().min(4).max(15).required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match")
      .required("Please confirm your password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const submitFormToDB = async ({
    email,
    name,
    lastName,
    password,
    address,
    phoneNumber,
  }) => {
    await signUpWithEmail(
      email,
      name,
      lastName,
      password,
      address,
      phoneNumber,
      cartItems
    );

    cartDispatch({ type: "SET_CART_ITEMS", payload: cartItems });
    navigate("/");
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-4">
      <div className="card shadow-sm border-0 w-100" style={{ maxWidth: 900 }}>
        <div className="card-body p-4">
          <h4 className="text-center fw-semibold mb-4">Create your account</h4>

          <form onSubmit={handleSubmit(submitFormToDB)} noValidate>
            {/* Personal Info */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">First name</label>
                <input
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  {...register("name")}
                />
                <div className="invalid-feedback">{errors.name?.message}</div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Last name</label>
                <input
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  {...register("lastName")}
                />
                <div className="invalid-feedback">
                  {errors.lastName?.message}
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  {...register("email")}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Phone number</label>
                <input
                  type="tel"
                  className={`form-control ${
                    errors.phoneNumber ? "is-invalid" : ""
                  }`}
                  {...register("phoneNumber")}
                />
                <div className="invalid-feedback">
                  {errors.phoneNumber?.message}
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Address line 1</label>
                <input
                  className={`form-control ${
                    errors.address?.address1 ? "is-invalid" : ""
                  }`}
                  {...register("address.address1")}
                />
                <div className="invalid-feedback">
                  {errors.address?.address1?.message}
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Address line 2</label>
                <input
                  className="form-control"
                  {...register("address.address2")}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">City</label>
                <input
                  className={`form-control ${
                    errors.address?.city ? "is-invalid" : ""
                  }`}
                  {...register("address.city")}
                />
                <div className="invalid-feedback">
                  {errors.address?.city?.message}
                </div>
              </div>

              <div className="col-md-3">
                <label className="form-label">State / District</label>
                <input
                  className={`form-control ${
                    errors.address?.district ? "is-invalid" : ""
                  }`}
                  {...register("address.district")}
                />
                <div className="invalid-feedback">
                  {errors.address?.district?.message}
                </div>
              </div>

              <div className="col-md-3">
                <label className="form-label">Zip code</label>
                <input
                  className={`form-control ${
                    errors.address?.zipCode ? "is-invalid" : ""
                  }`}
                  {...register("address.zipCode")}
                />
                <div className="invalid-feedback">
                  {errors.address?.zipCode?.message}
                </div>
              </div>

              <div className="col-md-3">
                <label className="form-label">Country</label>
                <input
                  className={`form-control ${
                    errors.address?.country ? "is-invalid" : ""
                  }`}
                  {...register("address.country")}
                />
                <div className="invalid-feedback">
                  {errors.address?.country?.message}
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  {...register("password")}
                />
                <div className="invalid-feedback">
                  {errors.password?.message}
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Confirm password</label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  {...register("confirmPassword")}
                />
                <div className="invalid-feedback">
                  {errors.confirmPassword?.message}
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary px-5 py-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterUserData;
