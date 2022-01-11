export default function getJWT() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    return 'Bearer ' + user.accessToken;
  } else {
    return {};
  }
}
