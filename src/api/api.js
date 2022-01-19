import Axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "./token";

const api = Axios.create({
  baseURL: "http://localhost:8000",
  headers: { "content-type": "application/json", Accept: "application/json" },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = "bearer " + getToken();
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(null, (error) => {
  console.log(error);
  if (error.response?.status >= 500) {
    return toast.error("an unexpected error accured");
  }
  if (error.response?.status === 403) {
    return toast.error("Unauthorized!");
  }
  if (error.response?.status === 401 || error.response?.status === 419) {
    return toast.error("Unauthorized!");
  }
});

export default api;
