import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function UserPrivateRoute() {

let token = localStorage.getItem("userToken")

  return (
    token ? <Outlet/>: <Navigate to="/signin" />
  )
}

export default UserPrivateRoute

