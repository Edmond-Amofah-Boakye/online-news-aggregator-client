import { useState } from "react";
import userLoginIcon from "../../assets/user_login_image.png";
import { FcGoogle } from "react-icons/fc";
import OTPLogin from "../OTP/OTPLogin";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { authServiice } from "../../services/user.service";
import { toast } from "react-toastify";

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password should not be less than 8 characters")
    .required("Password is required"),
});

const InitialValues = {
  email: "",
  password: "",
};

const Signin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: InitialValues,
    validationSchema: SigninSchema,
    onSubmit: async (values) => {
      try {
        const response = await authServiice.signIn(values);
        setIsLoggedIn(true);
        toast.success("Successful, an invite otp has been sent to your email", {
          position: "bottom-right"
        });
        return response
        
      } catch (error: any) {
        toast.error(`${error?.response?.data?.detail ?? "Try again"}`, {
          position: "bottom-right",
        });
        throw error
      }
    },
  });

  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    handleBlur,
    handleChange,
    values,
  } = formik;
  return (
    <>
      {isLoggedIn ? (
        <OTPLogin />
      ) : (
        <div className="flex items-center justify-center bg-slate-200 min-h-screen py-10">
          <div className="flex-col min-h-[400px] w-[450px] p-8 bg-white justify-center items-center mx-auto rounded">
            <div className="flex flex-col justify-center items-center mb-4">
              <img
                src={userLoginIcon}
                alt="user-icon"
                className="w-[80px] h-[80px]"
              />
            </div>
            <h1 className="text-center text-black text-xl mb-2 font-bold">
              Signin
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-3 font-bold text-base"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  className="w-full border border-black rounded py-2 pl-2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block mb-3 font-bold text-base"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  className="w-full border border-black rounded py-2 pl-2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {touched.password && errors.password && (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-white bg-blue-800 w-full py-2 rounded"
                >
                  {isSubmitting ? "Signining in" : "Signin"}
                </button>
              </div>
              <div className="mb-4 mt-2">
                <p className="text-sm text-center">
                  Do not have an account?{" "}
                  <Link to="/signup" className="text-blue-800 font-semibold">
                    Signup
                  </Link>
                </p>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-full h-[0.1px] bg-black opacity-[0.2]"></div>
                <div className="">or</div>
                <div className="w-full h-[0.1px] bg-black opacity-[0.2]"></div>
              </div>
              <button className="flex items-center w-full py-2 pl-4 gap-10 mt-2 bg-slate-300 text-black rounded">
                <FcGoogle />
                Login with Google
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Signin;
