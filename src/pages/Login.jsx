import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Eye, EyeOff, Lock, User } from "lucide-react";

const Login = ({ showAlert }) => {
  const [credentials, setCredentials] = useState({ userName: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/public/login`,
        credentials,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      localStorage.setItem("token", response.data);
      login();
      showAlert("Login successful!", "success");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      showAlert("Invalid credentials. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl">
        <div className="bg-indigo-600 py-6">
          <h2 className="text-center text-3xl font-bold text-white">Welcome Back</h2>
          <p className="mt-2 text-center text-indigo-200">Sign in to your account</p>
        </div>
        
        <div className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <User size={18} />
                </div>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  required
                  className="block w-full rounded-lg border border-gray-200 py-3 pl-10 pr-3 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  placeholder="Username"
                  onChange={handleChange}
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full rounded-lg border border-gray-200 py-3 pl-10 pr-10 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-lg bg-indigo-600 py-3 px-4 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="mr-2 h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>

            <div className="mt-4 flex items-center justify-center">
              <span className="border-b w-1/3 border-gray-200"></span>
              <p className="mx-4 text-center text-sm text-gray-500">or</p>
              <span className="border-b w-1/3 border-gray-200"></span>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;