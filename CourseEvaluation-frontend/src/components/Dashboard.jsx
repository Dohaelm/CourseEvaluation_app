import React from 'react';
import {jwtDecode} from 'jwt-decode';

import DashboardStudent from './DashboardStudent';
 import DashboardTeacher from './DashboardTeacher';
 import DashboardAdmin from './DashboardAdmin';

const Dashboard = () => {
  const token = localStorage.getItem('jwtToken');

  if (!token) {
    return <p>Unauthorized: Please log in.</p>; // Handle cases where the user is not logged in
  }

  const decodedToken = jwtDecode(token);
  const role = decodedToken.role;

  if (!role) {
    return <p>Invalid token: No role found.</p>;
  }

  switch (role) {
    case 'STUDENT':
      return <DashboardStudent />;
      case 'TEACHER':
      return <DashboardTeacher />;
     case 'ADMIN':
       return <DashboardAdmin />;
    default:
      return <p>Unauthorized: Role not recognized.</p>;
  }
};

export default Dashboard;
