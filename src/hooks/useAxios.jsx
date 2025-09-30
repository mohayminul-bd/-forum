import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://fourm-server.vercel.app/`,
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
