import axios from "axios";

const API_URL = "http://api.test/api";

const signup = (email, username, password) => {
  console.log(email, username, password);
  return axios
    .post(API_URL + "/signup", {
      email,
      username,
      password
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

// const login = (email, password) => {
//   return axios
//     .post(API_URL + "/login", {
//       email,
//       password,
//     })
//     .then((response) => {
//       if (response.data.accessToken) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//       }

//       return response.data;
//     });
// };

const login = async (email, password) => {
  const response = await fetch(API_URL + "/login", {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
