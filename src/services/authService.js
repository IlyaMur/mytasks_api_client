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

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
