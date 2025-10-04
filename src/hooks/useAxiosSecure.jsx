import axios from "axios";
import React from "react";
import useAuth from "./useAuth";
const axiosSecure = axios.create({
  baseURL: `https://fourm-server.vercel.app/`,
});
const useAxiosSecure = () => {
  const { user } = useAuth();
  console.log(user);

  axiosSecure.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
