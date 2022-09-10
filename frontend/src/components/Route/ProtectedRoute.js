import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../layout/Loader/Loading';

const ProtectedRoute = () => {
  const { isLoading, user } = useSelector((state) => state.auth);

  if (isLoading) {
    return <Loading />;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
