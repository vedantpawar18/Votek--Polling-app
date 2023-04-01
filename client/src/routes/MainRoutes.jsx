import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'

import LandingPage from '../pages/LandingPage'

import AdminPrivateRoute from './AdminPrivateRoute'
import UserPrivateRoute from './UserPrivateRoute'


import Template from '../pages/Template'
import CreatePoll from '../pages/CreatePoll'
import TemplatePage from '../pages/TemplatePage'
import TemplateDetailPage from '../pages/TemplateDetailPage'


function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<UserPrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route element={<AdminPrivateRoute />}>
        <Route path="/create" element={<CreatePoll />}/>
        <Route path="/template" element={<Template />}/>
        <Route path="/template-page" element={<TemplatePage />}/>
        <Route path="/template-details" element={<TemplateDetailPage />}/>
      </Route>
    </Routes>
  )
}

export default MainRoutes



