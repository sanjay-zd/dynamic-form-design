import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import FormDesigner from './FormDesigner';

const DashboardPage = ({ user }) => {
  const location = useLocation();
  console.log('user',{user});
  return (
    <div className="dashboard-page">
      <Nav variant="pills" className="mt-3">
        <Nav.Item>
          {/* <Nav.Link href="#dashboard">Dashboard</Nav.Link> */}
          <Link to="/dashboard">Dashboard</Link>
        </Nav.Item>
        {user.role === 'admin' && (
          <Nav.Item>
            {/* <Nav.Link href="#form-designer">Form Designer</Nav.Link> */}
            <Link to="/form-Designer">Form Designer</Link>
          </Nav.Item>
        )}
        {user.role === 'regular' && (
          <Nav.Item>
          <Link to="/form">Form</Link>
          </Nav.Item>
        )}
      </Nav>
      {location.pathname === '/form-designer' ? (
        <FormDesigner/>
      ) : (
        <h2>Welcome, {user.role}!</h2>
      )}
    </div>
  );
};

export default DashboardPage;
