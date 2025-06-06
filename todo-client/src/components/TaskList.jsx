import React, { useContext } from "react";
import del from "./trash-solid.svg";
import edit from "./edit.svg";
import { UserDetails } from "../context/UserDetails";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { tasksAPI } from "../api/tasks";

const TaskList = ({ value, onDeleteSuccess }) => {
  const navigate = useNavigate();
  const { userDetails } = useContext(UserDetails);

  const onClickToDelete = async (value) => {
    try {
      const id = Number(value.id);
      await tasksAPI.delete(id);
      onDeleteSuccess();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-6 rounded-xl shadow-lg backdrop-blur-sm bg-white/10 border ${
        value.status === "Pending" ? "border-red-500" : "border-green-500"
      }`}
    >
      <div className="flex justify-end gap-3 mb-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/edit", { state: { value: value } })}
          className="p-2 hover:bg-blue-500/20 rounded-full transition-colors"
        >
          <img src={edit} alt="Edit" className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onClickToDelete(value)}
          className="p-2 hover:bg-red-500/20 rounded-full transition-colors"
        >
          <img src={del} alt="Delete" className="w-5 h-5" />
        </motion.button>
      </div>

      <h4 className="text-xl font-semibold text-white mb-2">{value.name}</h4>

      <p className="text-gray-300">
        {value.description?.length > 50
          ? value.description.slice(0, 50) + "..."
          : value.description}
      </p>

      <div className="mt-4 flex items-center">
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            value.status === "Pending"
              ? "bg-red-500/20 text-red-300"
              : "bg-green-500/20 text-green-300"
          }`}
        >
          {value.status}
        </span>
      </div>
    </motion.div>
  );
};

export default TaskList;
