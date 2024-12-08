import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useToast = () => {
  // Success notification
  const notifySuccess = (message, options = {}) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      ...options,
    });
  };

  // Error notification
  const notifyError = (message, options = {}) => {
    toast.error(message);
  };

  // Info notification
  const notifyInfo = (message, options = {}) => {
    toast.info(message);
  };

  // Warning notification
  const notifyWarning = (message, options = {}) => {
    toast.warn(message);
  };

  // Custom notification
  const notifyCustom = (message, options = {}) => {
    toast(message, {
      position: toast.POSITION.TOP_RIGHT,
      ...options,
    });
  };

  return {
    notifySuccess,
    notifyError,
    notifyInfo,
    notifyWarning,
    notifyCustom,
  };
};

export default useToast;
