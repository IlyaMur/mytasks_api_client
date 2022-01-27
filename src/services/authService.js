import axios from 'axios';
import { API_URL } from '../apiConfig';
import AuthService from "../services/authService";
import jwt_decode from "jwt-decode";

const signup = async (email, username, password) => {
  const response = await fetch(API_URL + "/signup", {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      username
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response;
};

const login = async (email, password) => {
  const response = await fetch(API_URL + "/login", {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response;
};

const logout = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  localStorage.removeItem("user");

  await fetch(API_URL + '/logout', {
    method: 'DELETE',
    body: JSON.stringify({
      refreshToken: user.refreshToken
    })
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const refreshAuthLogic = async (failedRequest) => {
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    const response = await axios.post(API_URL + '/refresh', { 'refreshToken': user.refreshToken });
    const tokens = response.data
    console.log('Got new access token and refresh token');

    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(tokens));

    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokens.accessToken;
    return Promise.resolve();
  } catch (error) {
    console.log(error)
  }
}

const isJWTExpired = () => {
  const user = AuthService.getCurrentUser();
  const decodedRefreshToken = jwt_decode(user.refreshToken);

  return decodedRefreshToken.exp * 1000 < Date.now();
}

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  refreshAuthLogic,
  isJWTExpired
};

export default authService;
