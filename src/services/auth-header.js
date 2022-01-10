export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    // return { Authorization: 'Bearer ' + user.accessToken };
    console.log(user.accessToken)
    return { "X-Api-Key": '2b7417ec8d5ca2b9343291fe0e085a01' };
  } else {
    return {};
  }
}
