import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import { useState } from "react";
import Settings from "./pages/Settings";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <AuthProvider>
      <Router>
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
        <Navbar showAlert={showAlert}/>
        <Routes>
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard showAlert={showAlert}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings showAlert={showAlert}/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
