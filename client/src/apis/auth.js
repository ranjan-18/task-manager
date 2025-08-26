import axios from "axios";

const login = ({email, password}) =>
  axios.post("http://localhost:5000/api/user/login", {
    email,
    password,
  });

const logout = () => axios.delete("http://localhost:5000/api/user/logout");

const signup = ({ name, email, password }) =>
  axios.post("http://localhost:5000/api/user/register", {
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