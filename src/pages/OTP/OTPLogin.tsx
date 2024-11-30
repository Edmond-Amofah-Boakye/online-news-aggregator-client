// import React from 'react'
import { useNavigate } from "react-router-dom";
import otpIcon from "../../assets/otp-verify.png";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../api/interceptors";
import { toast } from "react-toastify";

const OTPLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [values, setValues] = useState(Array(5).fill(""));
  const inputRef = useRef<any>([]);

  const navigate = useNavigate();
  const userDetails = localStorage.getItem("user");
  const details = userDetails ? JSON.parse(userDetails) : {};

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current[0].focus();
    }
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (/^\d?$/.test(e.target.value)) {
      const data = [...values];
      data[index] = e.target.value;
      setValues(data);

      if (e.target.value && index < inputRef.current.length - 1) {
        inputRef.current[index + 1].focus();
      }
    } else {
      alert("should only be numbers");
    }
  };

  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const allFieldsAreValid = values.every((item: string) => item !== "");
    if (allFieldsAreValid) {
      try {
        setIsLoading(true);
        const response = await axiosInstance.post("/auth/verify-otp", "", {
          params: {
            otp: values.join("") ?? "",
            email: details?.email,
          },
        });
        const { access_token, refresh_token } = response.data
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        
        toast.success("Sucessfully logged in", { position: "bottom-right" });
        navigate("/dashboard");
      } catch (error: any) {
        toast.error(
          `${error?.response?.data?.detail ?? "Error occured, try again"}`,
          { position: "bottom-right" }
        );
        throw error;
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-200">
      <div className="flex flex-col justify-center items-center min-w-[550px] min-h-[400px] py-10 px-8 bg-[#302952] rounded-lg shadow-xl">
        <div className="mb-4">
          <img src={otpIcon} alt="otp-icon" className="w-[80px] h-[80px]" />
        </div>
        <div className="text-center text-[#dedcdc] mb-8">
          <h1 className="font-bold text-2xl">OTP</h1>
          <h3 className="font-bold text-xl">Verification Code</h3>
          <p>
            We have sent a verification code to your <br /> email address
          </p>
        </div>
        <div className="flex gap-4">
          {values.map((item: string, index: number) => (
            <div className="" key={index}>
              <input
                type="text"
                maxLength={1}
                ref={(element) => (inputRef.current[index] = element)}
                value={item}
                className="w-[65px] h-[55px] rounded border border-black text-center"
                onChange={(e) => onChange(e, index)}
                onKeyDown={(e) => onKeyDown(e, index)}
                disabled={isLoading}
              />
            </div>
          ))}
        </div>
        <button
          className="text-white bg-blue-800 py-3 w-[400px] rounded-md mt-10"
          onClick={handleVerify}
        >
          VERIFY
        </button>
        <p className="text-white text-left mt-6">
          Did not receive the verification OTP?{" "}
          <button className="text-red-600 pl-2">Resend</button>
        </p>
      </div>
    </div>
  );
};

export default OTPLogin;
