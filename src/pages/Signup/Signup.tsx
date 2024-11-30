// import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import userIcon from "../../assets/user_icon.png";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authServiice } from "../../services/user.service";
import { toast } from "react-toastify";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(1, "An input is required")
    .required("Username is required"),
  email: Yup.string().email("invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password should not be less than 6 characters")
    .required("Password is required"),
});

const InitialValues = {
  username: "",
  email: "",
  password: "",
};

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: InitialValues,
    validationSchema: SignupSchema,
    onSubmit: async (values: any) => {
      try {
        const response = await authServiice.signUp(values);
        if (response) {
          toast.success("Signup successful", {
            position: "bottom-right",
          });
          navigate("/");
        }
      } catch (error: any) {
        toast.error(`${error?.response?.data?.detail}`, {
          position: "bottom-right",
        });
        throw error
      }
    },
  });

  const {
    touched,
    errors,
    isSubmitting,
    values,
    handleBlur,
    handleSubmit,
    handleChange,
  } = formik;

  return (
    <div className="flex items-center justify-center bg-slate-200 min-h-screen py-10">
      <div className="flex-col min-h-[400px] w-[450px] p-8 bg-white justify-center items-center mx-auto rounded shadow-md">
        <div className="flex flex-col justify-center items-center mb-4">
          <img src={userIcon} alt="user-icon" className="w-[80px] h-[80px]" />
        </div>
        <h1 className="text-center text-black text-xl mb-2 font-bold">
          Signup
        </h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block mb-3 font-bold text-base"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter user-name"
              className="w-full border border-black rounded py-2 pl-2"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            {touched.username && errors.username && (
              <div className="text-red-500 text-sm">
                {errors.username as string}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-3 font-bold text-base">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              className="w-full border border-black rounded py-2 pl-2"
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <div className="text-red-500 text-sm">
                {errors.email as string}
              </div>
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
              value={values.password}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && (
              <div className="text-red-500 text-sm">
                {errors.password as string}
              </div>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-blue-800 w-full py-2 rounded"
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </button>
          </div>
          <div className="mb-4 mt-2">
            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link to="/" className="text-blue-800 font-semibold">
                Login
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
            Signup with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
