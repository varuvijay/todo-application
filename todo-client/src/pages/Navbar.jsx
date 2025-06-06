import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserDetails } from "../context/UserDetails";
import { motion } from "framer-motion";
import { logout } from "../api/auth";

const Navbar = () => {
  let { userDetails, setUserDetails, setLogin } = useContext(UserDetails);

  const onSubmit = async () => {
    try {
      const response = await logout();
      setUserDetails(response);
      setLogin(true);
    } catch (err) {
      console.error("Logout failed:", err);
      setUserDetails(null);
      setLogin(true);
    }
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-white/10 backdrop-blur-lg border-b border-white/20"
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavLink
              to="/"
              className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
            >
              TaskMaster
            </NavLink>
          </motion.div>

          <div className="flex items-center space-x-4">
            {userDetails?.status && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onSubmit}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="transform transition-transform group-hover:translate-x-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                  />
                </svg>
                <span>Logout</span>
              </motion.button>
            )}
          </div>
        </nav>
      </div>
    </motion.div>
  );
};

export default Navbar;
