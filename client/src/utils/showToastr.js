import { toast, Bounce } from "react-toastify";

const showToastr = ({ message, type = "success", autoClose = 2000 }) => {
  switch (type) {
    case "success":
      toast.success(message, {
        autoClose: autoClose || 2000,
        transition: Bounce,
      });
      break;
    case "error":
      toast.error(message, {
        autoClose: autoClose || 2000,
        transition: Bounce,
      });
      break;
    case "info":
      toast.info(message, {
        autoClose: autoClose || 2000,
        transition: Bounce,
      });
      break;
    default:
      toast(message, {
        autoClose: autoClose || 2000,
        transition: Bounce,
      });
  }
};

export default showToastr;