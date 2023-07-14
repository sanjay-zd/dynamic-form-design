import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import FormPage from './components/FormPage';
import FormDesigner from './components/FormDesigner';
// import Card from './components/FormDesigner';

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (username, password) => {
    // Perform authentication logic
    if (
      (username === 'admin@mail.com' && password === 'admin') ||
      (username === 'regular@mail.com' && password === 'regular')
    ) {
      const role = username === 'admin@mail.com' ? 'admin' : 'regular';
      setUser({ username, role });
      navigate('/dashboard')
    } else {
      setUser(null);
    }
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
          {/* <Route
            path="/form"
            component={<Form/>} 
          />
          <Route
            path="/from-Designer"
           component={<From-Designer/>}
          /> */}
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

