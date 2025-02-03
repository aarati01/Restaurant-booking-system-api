import React, { useContext } from "react";
import Navigation from "./Navigation.tsx";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import {
  UserInfoContext,
  UserInformationInterface as UserInformation,
} from "../states/Contexts.tsx";
import axios from "axios";

const schema = yup
  .object({
    username: yup.string().min(5).max(15).required("Username is required"),
    password: yup.string().min(4).required("Password is required"),
  })
  .required();

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginApiResponse {
  userinfo: UserInformation;
}

export const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const userInformationConsumed = useContext(UserInfoContext);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post<LoginApiResponse>("user/login", data);
      if (response.status === 200) {
        const fetchedInfo = response.data.userinfo as UserInformation;
        if (userInformationConsumed === undefined) {
          console.error("user information context is undefined");
          return;
        }
        userInformationConsumed.setUserInformation(fetchedInfo);
        navigate("/home");
      } else if (response.status === 401) {
        alert("Incorrect credentials");
      } else {
        alert("Internal server error occurred");
      }
    } catch (error: any) {
      console.error(error);
      alert("Error: " + (error.response?.data?.errors || error.message));
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/image/background.jpg')" }}
      >
        <Navigation />

        <div className="bg-olive p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md m-auto  ">
          <img
            src="loginLogo.jpg"
            alt="logo of the login"
            className="w-24 h-24 m-auto block bg-black-600 border "
          ></img>
          <h1 className="text-center text-2xl font-semibold text-gray-800 mb-4">
            Login
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

            <button
              type="submit"
              className="w-full py-2 bg-background font-rufinab text-white rounded-md hover:bg-lime-800 transition duration-300"
            >
              Login
            </button>

            <p className="text-center text-gray-600 mt-2">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up here.
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
