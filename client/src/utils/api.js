import axios from "axios";

const apiVersion = 1;
export const getUserDetails = () =>
  axios.get(`http://localhost:5000/api/v${apiVersion}/auth`, {
    withCredentials: true,
  });
