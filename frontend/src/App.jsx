import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Weather from './components/Weather';
import Report from './components/Report';
import { AuthProvider, useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/weather" 
            element={
              <PrivateRoute>
                <Weather />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/report" 
            element={
              <PrivateRoute>
                <Report />
              </PrivateRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/weather" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

