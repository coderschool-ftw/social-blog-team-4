import React from 'react';
import { useSelector } from 'react-redux';
const AdminPage = () => {
  const user = useSelector((state) => state.auth.user);
  if (user !== undefined) {
    console.log('user', user);
  }
  return (
    <div>
      <h1>This is Admin Page</h1>
    </div>
  );
};

export default AdminPage;
