import React, { useEffect, useState } from 'react';
import JournalEntry from '../components/JournalEntry';
import JournalEntries from '../components/JournalEntries';
import axios from 'axios';

const Dashboard = ({ showAlert }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const refreshEntries = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const getName = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized: No token found.");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/greetings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setData(response.data);
    } catch (err) {
      setData("Failed to fetch username.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getName();
  },[]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold text-gray-700">
            {loading ? "Loading..." : `${data}`}
            {/* {data} */}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: New Entry Form */}
          <div className="md:sticky md:top-8 h-fit">
            <JournalEntry showAlert={showAlert} refreshEntries={refreshEntries} />
          </div>
          
          {/* Right Column: Entries List */}
          <div>
            <JournalEntries 
              showAlert={showAlert} 
              key={refreshTrigger} // Force re-render on refresh
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} My Journal App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;