import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import FormPage from './components/FormPage';
import FormDesigner from './components/FormDesigner';
import axios from 'axios'

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    // Perform authentication logic
    axios.post(`http://localhost:8000/api/login`, { email, password })
    .then(res => {
      const data = res.data;
      if (data) {
        const role = data.roll_id === 1 ? 'admin' : 'regular';
        setUser({ email, role });
        navigate('/dashboard')
      } else {
        setUser(null);
      }
    }).catch((err)=>{
      console.log(err);
    })
  };

  return (
      <div>
        <Routes>
          <Route
            path="/"
            element={<LoginPage handleLogin={handleLogin} />}
          />
          <Route
          exact
            path="/dashboard"
            element={<PrivateRoute user={user} component={DashboardPage} />}
          />
          <Route
            path="/form-designer"
            element={<PrivateRoute user={user} component={FormDesigner} />}
          />
          <Route
            path="/form"
            element={<PrivateRoute user={user} component={FormPage} />}
          />
        </Routes>
      </div>
  );
};

const PrivateRoute = ({ user, component: Component }) => {

  if (!user) {
    return <Navigate to="/" />;
  }

  return <Component user={user} />;
};

export default App;

