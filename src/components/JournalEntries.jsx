import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Edit2, XCircle, BookOpen, PenTool } from "lucide-react";

const JournalEntries = ({ showAlert }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({ id: null, title: "", content: "" });
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized: No token found.");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/journal`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setEntries(response.data);
    } catch (err) {
      setError("Failed to fetch journal entries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this journal entry?");

    if (!isConfirmed) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized: No token found.");
        return;
      }

      await axios.delete(`${import.meta.env.VITE_API_URL}/journal/id/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setEntries(entries.filter((entry) => entry.id !== id));
      showAlert("Entry deleted successfully.", "warning");
    } catch (err) {
      setError("Failed to delete journal entry.");
    }
  };

  const openUpdateModal = (entry) => {
    setUpdateFormData({
      id: entry.id,
      title: entry.title,
      content: entry.content
    });
    setShowUpdateModal(true);
  };

  const handleUpdateChange = (e) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized: No token found.");
        return;
      }

      await axios.put(
        `${import.meta.env.VITE_API_URL}/journal/id/${updateFormData.id}`,
        { title: updateFormData.title, content: updateFormData.content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          withCredentials: true,
        }
      );

      // Refresh entries
      fetchEntries();
      setShowUpdateModal(false);
      showAlert("Entry updated successfully.", "success");
    } catch (err) {
      setError("Failed to update journal entry.");
    }
  };

  if (loading && entries.length === 0) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mt-4">
      <p>{error}</p>
    </div>
  );

  return (
    <div className="bg-gray-50 rounded-lg shadow-md p-6 h-full max-h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Journal Entries</h2>

      {entries.length > 0 ? (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-indigo-500">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-800">{entry.title}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openUpdateModal(entry)}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors p-1"
                    aria-label="Edit entry"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-1"
                    aria-label="Delete entry"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mt-2 whitespace-pre-line">{entry.content}</p>
              <p className="text-sm text-gray-400 mt-3">
                {new Date(entry.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-100 p-4 rounded-full">
              <BookOpen size={36} className="text-indigo-600" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Journal Entries Yet</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Your journal is waiting for your first entry. Start capturing your thoughts, ideas, and experiences today.
          </p>
          <div className="flex justify-center items-center space-x-2 text-indigo-600 font-medium">
            <PenTool size={18} />
            <span>Create your first entry using the form on the left</span>
          </div>
          <div className="mt-6 border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-500">
              Journaling helps with stress reduction, self-reflection, and tracking personal growth over time.
            </p>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Update Entry</h3>
              <button
                onClick={() => setShowUpdateModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle size={24} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label htmlFor="update-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="update-title"
                  name="title"
                  value={updateFormData.title}
                  onChange={handleUpdateChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="update-content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  id="update-content"
                  name="content"
                  value={updateFormData.content}
                  onChange={handleUpdateChange}
                  required
                  rows="8"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default JournalEntries;