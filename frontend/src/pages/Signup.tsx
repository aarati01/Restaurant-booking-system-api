import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

// Define the schema for validation
const schema = yup
  .object({
    username: yup.string().min(5).max(15).required("Username is required"),
    password: yup.string().min(4).required("Password is required"),
    email: yup.string().email().required("Email is required"),
  })
  .required();

// Define the form's data structure
interface SignUpFormData {
  username: string;
  password: string;
  email: string;
  phone?: string;
}

export const SignUpPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await axios.post("user/signup", data);
      if (response.status === 201) {
        alert("Registered successfully! please proceed to login");
      } else if (response.status === 409) {
        alert("User already exists");
      } else if (response.status === 422) {
        alert("Data validation error occurred");
      }
    } catch (error: any) {
      alert("Error: " + (error.response?.data?.errors || error.message));
    }
  };

  return (
    <>
      <Navigation />
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/image/background.jpg')" }}
      >
        <div className="bg-olive p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md m-auto">
          <img
            src="loginLogo.jpg"
            alt="logo of the signup"
            className="w-24 h-24 m-auto block bg-black-600 border"
          />
          <h1 className="text-center text-2xl font-semibold text-gray-800 mb-4">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register("username")}
                placeholder="Username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.username?.message}
              </p>
            </div>

            <div>
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.password?.message}
              </p>
            </div>

            <div>
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.email?.message}
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-background font-rufinab text-white rounded-md hover:bg-lime-800 transition duration-300"
            >
              Register
            </button>

            <p className="text-center text-gray-600 mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login here.
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
