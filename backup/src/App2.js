// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './pages/ProtectedRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to set isAuthenticated when the user logs in successfully
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login">
        <Login onLoginSuccess={handleLoginSuccess} />
      </Route>

      <ProtectedRoute
        path="/dashboard"
        component={Dashboard}
        isAuthenticated={isAuthenticated}
      />
    </Router>
  );
};

export default App;
