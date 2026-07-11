import axios from "axios";

const UserAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api/user`
    : "/api/user",
});

export default UserAPI;
