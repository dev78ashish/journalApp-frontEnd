import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, AlertCircle, X } from "lucide-react";

const Signup = ({ showAlert }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [availability, setAvailability] = useState(null);

  const checkUsername = async (username) => {
    if (username.length < 3) {
      setAvailability(null);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/public/check-username?username=${username}`);
      const data = await response.json();
      setAvailability(data.available);
    } catch (error) {
      console.error("Error checking username:", error);
    }
  };

  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    const errors = {};

    // Username validation
    if (user.userName.length < 3) {
      errors.userName = "Username must be at least 3 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation - updated to 5 characters with one number
    if (user.password.length < 5) {
      errors.password = "Password must be at least 5 characters";
    } else if (!/[0-9]/.test(user.password)) {
      errors.password = "Password must contain at least one number";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/public/signup`, user, {
        headers: { "Content-Type": "application/json" },
      });
      showAlert(`Account created successfully! ${user.userName}`, "success");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      showAlert(
        error.response?.data?.message || "Signup failed. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Components for Terms and Privacy Policy modals
  const PrivacyPolicyModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
      <div className="w-full max-w-md max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-xl">
        <div className="flex justify-between items-center p-5 border-b">
          <h3 className="text-lg font-bold text-gray-900">Privacy Policy</h3>
          <button onClick={() => setShowPrivacyPolicy(false)} className="text-gray-400 hover:text-gray-500">
            <X size={20} />
          </button>
        </div>
        <div className="p-5 space-y-3 text-sm text-gray-600">
          <p><strong>1. Data Collection:</strong> We collect your provided details like name and email.</p>
          <p><strong>2. Usage:</strong> Your data helps improve our service and security.</p>
          <p><strong>3. Protection:</strong> We safeguard your information from unauthorized access.</p>
          <p><strong>4. Updates:</strong> We may revise this policy and notify you accordingly.</p>
        </div>
        <div className="p-5 border-t">
          <button onClick={() => setShowPrivacyPolicy(false)} className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Got it
          </button>
        </div>
      </div>
    </div>
  );

  const TermsOfServiceModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
      <div className="w-full max-w-md max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-xl">
        <div className="flex justify-between items-center p-5 border-b">
          <h3 className="text-lg font-bold text-gray-900">Terms of Service</h3>
          <button onClick={() => setShowTerms(false)} className="text-gray-400 hover:text-gray-500">
            <X size={20} />
          </button>
        </div>
        <div className="p-5 space-y-3 text-sm text-gray-600">
          <p><strong>1. Agreement:</strong> Using our service means you accept these terms.</p>
          <p><strong>2. Accounts:</strong> Keep your login details secure.</p>
          <p><strong>3. Restrictions:</strong> No unlawful or harmful activities allowed.</p>
          <p><strong>4. Termination:</strong> Violations may lead to account suspension.</p>
        </div>
        <div className="p-5 border-t">
          <button onClick={() => setShowTerms(false)} className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Accept
          </button>
        </div>
      </div>
    </div>
  );


  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4 py-12 sm:px-6 lg:px-8">
      {showPrivacyPolicy && <PrivacyPolicyModal />}
      {showTerms && <TermsOfServiceModal />}

      <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl">
        <div className="bg-indigo-600 py-6">
          <h2 className="text-center text-3xl font-bold text-white">Join Us</h2>
          <p className="mt-2 text-center text-indigo-200">Create your account</p>
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
                  className={`block w-full rounded-lg border ${formErrors.userName ? "border-red-500" : "border-gray-200"
                    } py-3 pl-10 pr-3 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200`}
                  placeholder="Username"
                  onChange={handleChange}
                  onKeyUp={(e) => checkUsername(e.target.value)}
                />
                {formErrors.userName && (
                  <p className="mt-1 text-xs text-red-500 flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {formErrors.userName}
                  </p>
                )}
              </div>
              {availability !== null && (
                  <p className={`text-sm ${availability ? "text-green-600" : "text-red-600"}`}>
                    {availability ? "✔ Username is available" : "✖ Username is taken"}
                  </p>
                )}

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`block w-full rounded-lg border ${formErrors.email ? "border-red-500" : "border-gray-200"
                    } py-3 pl-10 pr-3 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200`}
                  placeholder="Email address"
                  onChange={handleChange}
                />
                {formErrors.email && (
                  <p className="mt-1 text-xs text-red-500 flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {formErrors.email}
                  </p>
                )}
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
                  className={`block w-full rounded-lg border ${formErrors.password ? "border-red-500" : "border-gray-200"
                    } py-3 pl-10 pr-10 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200`}
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
                {formErrors.password && (
                  <p className="mt-1 text-xs text-red-500 flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {formErrors.password}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-500">Password requirements:</p>
              <ul className="text-xs space-y-1 text-gray-500">
                <li className="flex items-center">
                  <CheckCircle size={12} className={`mr-1 ${user.password.length >= 5 ? "text-green-500" : "text-gray-300"}`} />
                  At least 5 characters
                </li>
                <li className="flex items-center">
                  <CheckCircle size={12} className={`mr-1 ${/[0-9]/.test(user.password) ? "text-green-500" : "text-gray-300"}`} />
                  At least one number
                </li>
              </ul>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                I agree to the{" "}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowTerms(true);
                  }}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPrivacyPolicy(true);
                  }}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Privacy Policy
                </button>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || availability===false}
              className="group relative flex w-full justify-center rounded-lg bg-indigo-600 py-3 px-4 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="mr-2 h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;