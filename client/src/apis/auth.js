import axios from "axios";

const login = ({email, password}) =>
  axios.post("/user/login", {
    email,
    password,
  });

const logout = () => axios.delete("/user/logout");

const signup = ({ name, email, password }) =>
  axios.post("/user/register", {
    name,
    email,
    password,
  });

const authApi = {
  login,
  signup,
  logout,
};

export default authApi;