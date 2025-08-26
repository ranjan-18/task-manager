import axios from "axios";
import showToastr from "../utils/showToastr";
import { setToLocalStorage, getFromLocalStorage } from "../utils/storage";

const DEFAULT_ERROR_NOTIFICATION = "Something went wrong!";

axios.defaults.baseURL = "http://localhost:5000/api/";

const setAuthHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      ?.getAttribute("content"),
  };
  const token = getFromLocalStorage("jwtToken");
  if (token) {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  }
};

const handleSuccessResponse = response => {
  if (response) {
    response.success = response.status === 200;
    if (response.data.notice) {
      showToastr({ message: response.data.notice, type: "success" });
    }
  }

  return response;
};

const handleErrorResponse = axiosErrorObject => {
  if (axiosErrorObject.response?.status === 401) {
    setToLocalStorage({
      jwtToken: null,
    });

    const skipReload =
      window.location.pathname.startsWith("/login") ||
      window.location.pathname.startsWith("/signup");

    if (!skipReload) {
      setTimeout(() => (window.location.href = "/"), 2000);
    }
  }

  showToastr({
    message:
      axiosErrorObject.response?.data?.error ||
      axiosErrorObject.response?.data?.message ||
      DEFAULT_ERROR_NOTIFICATION,
    type: "error",
  });

  if (axiosErrorObject.response?.status === 423) {
    window.location.href = "/";
  }

  return Promise.reject(axiosErrorObject);
};

const registerIntercepts = () => {
  axios.interceptors.response.use(handleSuccessResponse, error =>
    handleErrorResponse(error)
  );
};

const resetAuthTokens = () => {
  delete axios.defaults.headers["Authorization"];
};

export { setAuthHeaders, registerIntercepts, resetAuthTokens };