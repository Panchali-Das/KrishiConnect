import axios from "axios";

const UserAPI = axios.create({
  baseURL: "http://localhost:5000/api/user",
});

export default UserAPI;
