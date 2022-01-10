import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://api.test/api";

const getAllTasks = () => {
  return axios.get(API_URL + "/tasks", { headers: authHeader() });
};


const postService = {
  getAllTasks,
};

export default postService;
