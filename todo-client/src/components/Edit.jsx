import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserDetails } from '../context/UserDetails';
import { useForm } from 'react-hook-form';
import { motion } from "framer-motion";
import { tasksAPI } from "../api/tasks";

const Edit = () => {
  const location = useLocation();
  const { value } = location.state || {};
  const navigate = useNavigate();
  const { userDetails } = useContext(UserDetails);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: value?.name || '',
      description: value?.description || '',
      status: value?.status || 'Pending',
    },
  });

  const onSubmit = async (data) => {
    try {
      const id = value?.id;
      await tasksAPI.update(id, data);
      navigate('/');
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Edit Task</h2>

          {isSubmitting && (
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                  errors.name ? 'border-red-500' : 'border-white/10'
                } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="Enter task title"
                {...register('name', { required: true, minLength: 3 })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">Title is required (min 3 chars)</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                rows="3"
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                  errors.description ? 'border-red-500' : 'border-white/10'
                } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="Enter task description"
                {...register('description', { required: true })}
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-sm text-red-400">Description is required</p>
              )}
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                {...register('status', { required: true })}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => navigate("/")}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Cancel
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Updating..." : "Update Task"}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Edit;
