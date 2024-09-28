/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ManageStaff from '../pages/dashboard/manageStaff/ManageStaff';
import Meeting from '../pages/dashboard/meeting/Index';
import Loader from '../common/loader/Index';

const ProtectedRoutes = ({ user, loading }) => {
  if (loading) {
    return <Loader />;
  }

  if (!user || (user.me.role !== 'company-owner' && user.me.role !== 'company-manager')) {
    return <Navigate to="/dashboard/mySide" />;
  }

  return (
    <Routes>
      <Route path="manage-staff" element={<ManageStaff />} />
      <Route path="meetings" element={<Meeting />} />
    </Routes>
  );
};

export default ProtectedRoutes;