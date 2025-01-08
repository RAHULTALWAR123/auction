import { useEffect } from "react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";

const Notification = () => {
  const { rtmNotifications, clearNotifications } = useUserStore();

  useEffect(() => {

    if (rtmNotifications.length > 0) {
      const timer = setTimeout(() => {
        clearNotifications();
      }, 10000);

      return () => clearTimeout(timer); 
    }
  }, [rtmNotifications, clearNotifications]);

  return (
    <div className="absolute top-5 right-5 z-50 w-96">
      {rtmNotifications.map((notification, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-t from-green-500 to-emerald-500 text-black text-xl font-extrabold p-4 mb-2 rounded shadow-xl"
        >
          <p className="font-bold">{notification.message}</p>
          <small className="text-gray-400 text-xs">
            {new Date(notification.timestamp).toLocaleTimeString()}
          </small>
        </motion.div>
      ))}
    </div>
  );
};

export default Notification;
