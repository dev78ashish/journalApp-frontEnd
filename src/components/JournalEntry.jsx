import React, { useState } from "react";
import axios from "axios";
import { SendIcon } from "lucide-react";

const JournalEntry = ({ showAlert, refreshEntries }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/journal`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      });

      // Clear form after successful submission
      setFormData({ title: "", content: "" });
      
      // Refresh the entries list
      if (refreshEntries) refreshEntries();
      showAlert("Entry created successfully.", "success");
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">New Journal Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="What's on your mind today?"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="Express yourself freely..."
            value={formData.content}
            onChange={handleChange}
            required
            rows="10"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
        >
          <span>Save Entry</span>
          <SendIcon size={16} />
        </button>
      </form>
    </div>
  );
};

export default JournalEntry;