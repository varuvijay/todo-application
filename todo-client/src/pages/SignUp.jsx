import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserDetails } from "../context/UserDetails";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { register } from "../api/auth";

const SignUp = () => {
  let { setSignup } = useContext(UserDetails);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await register(data);
      setSignup(false);
      navigate("/");
    } catch (err) {
      console.error('Registration failed:', err.response?.data || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Create Account</h2>

          {isSubmitting && (
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                  errors.username ? 'border-red-500' : 'border-white/10'
                } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="Enter your username"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                  errors.email ? 'border-red-500' : 'border-white/10'
                } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                  errors.password ? 'border-red-500' : 'border-white/10'
                } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setSignup(false)}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Back to Login
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;





































// import React from "react";

// const SignUp = () => {







//   return (
//     <div
//       className="container-fluid  mh-100 d-flex justify-content-center align-items-center  "
//       style={{ height: "90vh " }}
//     >
//       <div className=" w-auto p-5 rounded-5 shadow-lg">
//         <form action="">
//           <div class="mb-3">
//             <label for="name" class="form-label">
//               Name
//             </label>
//             <input
//               type="text"
//               class="form-control"
//               name="name"
//               id="name"
//               aria-describedby="helpId"
//               placeholder="enter your name........"
//             />
//           </div>
//           <div class="mb-3">
//             <label for="password" class="form-label">
//               Password
//             </label>
//             <input
//               type="password"
//               class="form-control"
//               name="password"
//               id="password"
//               placeholder="enter your password ........"
//             />
//           </div>

//           <div class="mb-3">
//             <label for="email" class="form-label">
//               Email
//             </label>
//             <input
//               type="email"
//               class="form-control"
//               name="email"
//               id="email"
//               aria-describedby="emailHelpId"
//               placeholder="abc@mail.com"
//             />
//             <small id="emailHelpId" class="form-text text-muted">
//               Help text
//             </small>
//           </div>

//           <div class="d-flex justify-content-end mt-4">
//             <button
//               type="button"
//               name="submit"
//               id="submit"
//               class="btn btn-primary"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
