import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Notification function to show different types of toasts
const notification = (message, type = "success") => {
  const config = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  };

  // Show toast based on the type
  if (type === "success") {
    toast.success(message, config);
  } else if (type === "warning") {
    toast.warn(message, config);
  } else if (type === "info") {
    toast.info(message, config);
  } else {
    toast.error(message, config);
  }
};

// Export the notification function
export default notification;
