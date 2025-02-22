import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Trash2, Mail, User, Lock, AlertCircle, Loader2, ShieldCheck, Info } from "lucide-react";
import axios from "axios";

const Settings = ({ showAlert }) => {
  const [email, setEmail] = useState("");
  const { logout } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState({
    email: false,
    password: false,
    delete: false
  });
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });


  const isPasswordMatch = newPassword === confirmPassword && newPassword.length > 0;

  const deleteUser = async () => {
    if(userData.username==="demouser"){
      setConfirmDelete(false);
      showAlert("Demo users cannot delete their account.", "error");
      return;
    }
    try {
      setLoading(prev => ({ ...prev, delete: true }));
      const token = localStorage.getItem("token");

      if (!token) return;

      await axios.delete(`${import.meta.env.VITE_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      logout();
      showAlert("Account deleted successfully.", "success");
    } catch (err) {
      showAlert("Failed to delete account. Please try again.", "error");
    } finally {
      setLoading(prev => ({ ...prev, delete: false }));
    }
  };

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setUserData(response.data);
    } catch (err) {
      showAlert("Failed to fetch user details.", "error");
    }
  };

  const emailUpdate = async (e) => {
    e.preventDefault();
    if(userData.username==="demouser"){
      showAlert("Demo users cannot update their email.", "error");
      return;
    }
    setErrors(prev => ({ ...prev, email: "" }));
    
    if (email === userData.email) {
      setErrors(prev => ({ ...prev, email: "Please enter a different email address" }));
      return;
    }

    try {
      setLoading(prev => ({ ...prev, email: true }));
      const token = localStorage.getItem("token");
      
      await axios.put(
        `${import.meta.env.VITE_API_URL}/user/emailUpdate`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showAlert("Email updated successfully!", "success");
      fetchUserDetails();
      setEmail("");
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        email: error.response?.data?.message || "Failed to update email"
      }));
    } finally {
      setLoading(prev => ({ ...prev, email: false }));
    }
  };

  const passwordUpdate = async (e) => {
    e.preventDefault();
    if(userData.username==="demouser"){
      showAlert("Demo users cannot update their email.", "error");
      return;
    }
    setErrors(prev => ({ ...prev, password: "" }));

    if (!isPasswordMatch) {
      setErrors(prev => ({ ...prev, password: "Passwords do not match" }));
      return;
    }

    try {
      setLoading(prev => ({ ...prev, password: true }));
      const token = localStorage.getItem("token");

      if (!token) {
        showAlert("Please log in again.", "error");
        return;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/user`,
        { userName: userData.username, password: newPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        localStorage.setItem("token", response.data);
        showAlert("Password updated successfully!", "warning");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        password: error.response?.data?.message || "Failed to update password"
      }));
    } finally {
      setLoading(prev => ({ ...prev, password: false }));
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Overview</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="text-indigo-600" size={24} />
                  <div>
                    <p className="text-sm text-gray-500">Username</p>
                    <p className="font-medium text-gray-900">{userData.username}</p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center">
                      <Info size={12} className="mr-1" />
                      Usernames cannot be changed
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-indigo-600" size={24} />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{userData.email}</p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center">
                      <ShieldCheck size={12} className="mr-1" />
                      Used for account recovery
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Update Email Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <Mail size={20} className="text-indigo-600" />
                <span>Update Email Address</span>
              </h3>
              <form onSubmit={emailUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading.email}
                  className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                  {loading.email && <Loader2 size={18} className="animate-spin" />}
                  <span>{loading.email ? 'Updating Email...' : 'Update Email'}</span>
                </button>
              </form>
            </div>

            {/* Update Password Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <Lock size={20} className="text-indigo-600" />
                <span>Change Password</span>
              </h3>
              <form onSubmit={passwordUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.password ? 'border-red-300' : 'border-gray-300'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.password ? 'border-red-300' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.password}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!isPasswordMatch || loading.password}
                  className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                  {loading.password && <Loader2 size={18} className="animate-spin" />}
                  <span>{loading.password ? 'Updating Password...' : 'Update Password'}</span>
                </button>
              </form>
            </div>

            {/* Delete Account Section */}
            <div className="bg-red-50 p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-red-800 flex items-center">
                <Trash2 size={20} className="mr-2" />
                Delete Account
              </h3>
              <p className="text-sm text-red-600 mb-4 flex items-center">
                <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                Deleting your account will permanently remove all your data. This action cannot be undone.
              </p>
              <button
                onClick={() => setConfirmDelete(true)}
                className="bg-red-600 text-white py-2.5 px-6 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center w-full"
              >
                <Trash2 className="mr-2" size={18} />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4 text-red-600 flex items-center">
              <AlertCircle size={24} className="mr-2" />
              Confirm Account Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you absolutely sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={deleteUser}
                disabled={loading.delete}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center disabled:opacity-70"
              >
                {loading.delete && <Loader2 size={18} className="animate-spin mr-2" />}
                {loading.delete ? 'Deleting...' : 'Delete Forever'}
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;