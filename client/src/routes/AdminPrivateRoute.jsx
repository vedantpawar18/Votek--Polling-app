import React from 'react';


import { Navigate, Outlet } from 'react-router-dom';


function AdminPrivateRoute() {

// let token = localStorage.getItem("adminToken");
let token = true
  return (
    token ? <Outlet/>: <Navigate to="/signin" />
  )
}

export default AdminPrivateRoute

