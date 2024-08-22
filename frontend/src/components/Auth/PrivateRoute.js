import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { DataContext } from '../../state/Datacontext';

export const PrivateRoute = () => {
  const { accessToken } = useContext(DataContext);  

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};
