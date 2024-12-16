import React from 'react';
import {jwtDecode} from 'jwt-decode';

import CoursesStudent from './CoursesStudent';
 import CoursesTeacher from './CoursesTeacher';
 import CoursesAdmin from './CoursesAdmin';

const Courses = () => {
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
      return <CoursesStudent />;
     case 'TEACHER':
       return <CoursesTeacher />;
    case 'ADMIN':
      return <CoursesAdmin />;
    default:
      return <p>Unauthorized: Role not recognized.</p>;
  }
};

export default Courses;
