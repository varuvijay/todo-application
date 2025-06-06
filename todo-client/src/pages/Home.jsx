import React, { useContext, useEffect, useState } from 'react';
import { UserDetails } from "../context/UserDetails.jsx";
import { NavLink } from 'react-router-dom';
import TaskList from '../components/TaskList.jsx';
import { motion } from "framer-motion";
import { tasksAPI } from "../api/tasks";

const Home = () => {
  const { userDetails } = useContext(UserDetails);
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await tasksAPI.getAll();
      setFetchedData(data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [userDetails]);

  return (
    <div className="min-h-screen py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">My Tasks</h1>
        <NavLink
          to="/create"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Create New Task
        </NavLink>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {fetchedData.length > 0 ? (
            fetchedData.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TaskList value={value} onDeleteSuccess={fetchTasks} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 py-12">
              No tasks found. Create your first task!
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Home;
