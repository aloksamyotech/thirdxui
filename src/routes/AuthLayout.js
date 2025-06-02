import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function AuthLayout() {
  let userValidation = localStorage.getItem('token') == null ? true : false;
  return <>{userValidation ? <Outlet /> : <Navigate to="/dashboard/default" />};</>;
}
