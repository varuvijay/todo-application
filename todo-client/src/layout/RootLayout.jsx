import React, { useContext } from "react";
import Navbar from "../pages/Navbar";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";
import { UserDetails } from "../context/UserDetails";
import SignUp from "../pages/SignUp";
import { motion } from "framer-motion";

const RootLayout = () => {
  const { userDetails, signup, setSignup } = useContext(UserDetails);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <Navbar />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          {!userDetails?.status ? (
            signup ? (
              <SignUp />
            ) : (
              <Login />
            )
          ) : (
            <Outlet />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RootLayout;
