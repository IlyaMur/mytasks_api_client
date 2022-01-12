import axios from 'axios';

const API_URL = "http://api.test/api";

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
    method: 'POST',
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

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  refreshAuthLogic
};

export default authService;
