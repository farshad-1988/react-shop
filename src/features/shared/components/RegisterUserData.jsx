import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpWithEmail, signInWithGoogle } from "../../../firebase.config";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const RegisterUserData = () => {
  const navigate = useNavigate();
  const { setUserDoc } = useContext(UserContext);
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
      cartItems,
    );

    cartDispatch({ type: "SET_CART_ITEMS", payload: cartItems });
    navigate("/");
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
    !user.hasAddress && navigate(`/edituserdata/${user.user.uid}`);
    navigate("/");
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div
        className="card shadow-lg border-0 w-100 my-4"
        style={{
          maxWidth: 1000,
          borderRadius: "20px",
        }}
      >
        <div className="card-body p-4 p-md-5">
          {/* Header */}
          <div className="text-center mb-4">
            <h3 className="fw-bold mb-2" style={{ color: "#2C3E50" }}>
              Create Your Account
            </h3>
            <p className="text-muted mb-0">Join us and start shopping today</p>
          </div>

          {/* Google Sign In */}
          <div className="mb-4">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-light w-100 py-3 d-flex align-items-center justify-content-center gap-3 shadow-sm"
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
          </div>

          {/* Divider */}
          <div className="d-flex align-items-center mb-4">
            <hr className="flex-grow-1" style={{ borderColor: "#E8E8E8" }} />
            <span className="px-3 text-muted" style={{ fontSize: "0.85rem" }}>
              Or register with email
            </span>
            <hr className="flex-grow-1" style={{ borderColor: "#E8E8E8" }} />
          </div>

          <form onSubmit={handleSubmit(submitFormToDB)} noValidate>
            {/* Personal Info Section */}
            <div className="mb-4">
              <h6
                className="fw-semibold mb-3 d-flex align-items-center gap-2"
                style={{ color: "#2C3E50" }}
              >
                <FontAwesomeIcon icon={faUser} style={{ color: "#667eea" }} />
                Personal Information
              </h6>
              <div className="row g-3">
                <div className="col-md-6">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#2C3E50", fontSize: "0.9rem" }}
                  >
                    First Name
                  </label>
                  <input
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    placeholder="John"
                    {...register("name")}
                    style={{
                      height: "48px",
                      borderRadius: "10px",
                      border: "1px solid #E8E8E8",
                      fontSize: "0.95rem",
                    }}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </div>

                <div className="col-md-6">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#2C3E50", fontSize: "0.9rem" }}
                  >
                    Last Name
                  </label>
                  <input
                    className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                    placeholder="Doe"
                    {...register("lastName")}
                    style={{
                      height: "48px",
                      borderRadius: "10px",
                      border: "1px solid #E8E8E8",
                      fontSize: "0.95rem",
                    }}
                  />
                  <div className="invalid-feedback">
                    {errors.lastName?.message}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mb-4">
              <h6
                className="fw-semibold mb-3 d-flex align-items-center gap-2"
                style={{ color: "#2C3E50" }}
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{ color: "#667eea" }}
                />
                Contact Information
              </h6>
              <div className="row g-3">
                <div className="col-md-6">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#2C3E50", fontSize: "0.9rem" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="john.doe@example.com"
                    {...register("email")}
                    style={{
                      height: "48px",
                      borderRadius: "10px",
                      border: "1px solid #E8E8E8",
                      fontSize: "0.95rem",
                    }}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </div>

                <div className="col-md-6">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#2C3E50", fontSize: "0.9rem" }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
                    placeholder="+1 (555) 000-0000"
                    {...register("phoneNumber")}
                    style={{
                      height: "48px",
                      borderRadius: "10px",
                      border: "1px solid #E8E8E8",
                      fontSize: "0.95rem",
                    }}
                  />
                  <div className="invalid-feedback">
                    {errors.phoneNumber?.message}
                  </div>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="mb-4">
              <h6
                className="fw-semibold mb-3 d-flex align-items-center gap-2"
                style={{ color: "#2C3E50" }}
              >
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  style={{ color: "#667eea" }}
                />
                Address Information
              </h6>
              <div className="row g-3">
                <div className="col-md-6">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#2C3E50", fontSize: "0.9rem" }}
                  >
                    Address Line 1
                  </label>
                  <input
                    className={`form-control ${errors.address?.address1 ? "is-invalid" : ""}`}
                    placeholder="123 Main Street"
                    {...register("address.address1")}
                    style={{
                      height: "48px",
                      borderRadius: "10px",
                      border: "1px solid #E8E8E8",
                      fontSize: "0.95rem",
                    }}
                  />
                  <div className="invalid-feedback">
                    {errors.address?.address1?.message}
                  </div>
                </div>

                <div className="col-md-6">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#2C3E50", fontSize: "0.9rem" }}
                  >
                    Address Line 2{" "}
                    <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    className="form-control"
                    placeholder="Apt, Suite, Unit, etc."
                    {...register("address.address2")}
                    style={{
                      height: "48px",
                      borderRadius: "10px",
                      border: "1px solid #E8E8E8",
                      fontSize: "0.95rem",
                    }}
                  />
                </div>

                <div className="col-md-3">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#2C3E50", fontSize: "0.9rem" }}
                  >
                    City
                  </label>
                  <input
                    className={`form-control ${errors.address?.city ? "is-invalid" : ""}`}
                    placeholder="New York"
                    {...register("address.city")}
                    style={{
                      height: "48px",
                      borderRadius: "10px",
                      border: "1px solid #E8E8E8",
                      fontSize: "0.95rem",
                    }}
                  />
                  <div className="invalid-feedback">
                    {errors.address?.city?.message}
                  </div>
                </div>

                <div className="col-md-3">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#2C3E50", fontSize: "0.9rem" }}
                  >
                    State / District
                  </label>
                  <input
                    className={`form-control ${errors.address?.district ? "is-invalid" : ""}`}
                    placeholder="NY"
                    {...register("address.district")}
                    style={{
                      height: "48px",
                      borderRadius: "10px",
                      border: "1px solid #E8E8E8",
                      fontSize: "0.95rem",
                    }}
                  />
                  <div className="invalid-feedback">
                    {errors.address?.district?.message}
                  </div>
                </div>

                <div className="col-md-3">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#2C3E50", fontSize: "0.9rem" }}
                  >
                    Zip Code
                  </label>
                  <input
                    className={`form-control ${errors.address?.zipCode ? "is-invalid" : ""}`}
                    placeholder="10001"
                    {...register("address.zipCode")}
                    style={{
                      height: "48px",
                      borderRadius: "10px",
                      border: "1px solid #E8E8E8",
                      fontSize: "0.95rem",
                    }}
                  />
                  <div className="invalid-feedback">
                    {errors.address?.zipCode?.message}
                  </div>
                </div>

                <div className="col-md-3">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#2C3E50", fontSize: "0.9rem" }}
                  >
                    Country
                  </label>
                  <input
                    className={`form-control ${errors.address?.country ? "is-invalid" : ""}`}
                    placeholder="USA"
                    {...register("address.country")}
                    style={{
                      height: "48px",
                      borderRadius: "10px",
                      border: "1px solid #E8E8E8",
                      fontSize: "0.95rem",
                    }}
                  />
                  <div className="invalid-feedback">
                    {errors.address?.country?.message}
                  </div>
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div className="mb-4">
              <h6
                className="fw-semibold mb-3 d-flex align-items-center gap-2"
                style={{ color: "#2C3E50" }}
              >
                <FontAwesomeIcon icon={faLock} style={{ color: "#667eea" }} />
                Security
              </h6>
              <div className="row g-3">
                <div className="col-md-6">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#2C3E50", fontSize: "0.9rem" }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Create a password"
                    {...register("password")}
                    style={{
                      height: "48px",
                      borderRadius: "10px",
                      border: "1px solid #E8E8E8",
                      fontSize: "0.95rem",
                    }}
                  />
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                </div>

                <div className="col-md-6">
                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#2C3E50", fontSize: "0.9rem" }}
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                    placeholder="Confirm your password"
                    {...register("confirmPassword")}
                    style={{
                      height: "48px",
                      borderRadius: "10px",
                      border: "1px solid #E8E8E8",
                      fontSize: "0.95rem",
                    }}
                  />
                  <div className="invalid-feedback">
                    {errors.confirmPassword?.message}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="btn w-100 py-3 fw-semibold shadow-sm"
                disabled={isSubmitting}
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  borderRadius: "12px",
                  color: "#FFFFFF",
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  maxWidth: "400px",
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
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-4">
            <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-decoration-none fw-semibold"
                style={{ color: "#667eea" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUserData;
