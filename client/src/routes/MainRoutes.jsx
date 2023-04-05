import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import LandingPage from '../pages/LandingPage'
import AdminPrivateRoute from './AdminPrivateRoute'
import UserPrivateRoute from './UserPrivateRoute'
import CreatePoll from '../pages/CreatePoll'
import TemplatePage from '../pages/TemplatePage'
import TemplateDetailPage from '../pages/TemplateDetailPage'
import PollHistory from '../pages/PollHistory'
import LiveChart from '../pages/LiveChart'
import History from '../pages/History'




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
        <Route path="/create" element={<CreatePoll />} />
        <Route path="/template-page" element={<TemplatePage />} />
        <Route path="/template-page/:id" element={<TemplateDetailPage />} />
        <Route path="/history" element={<History/>} />
        <Route path="/history/:id" element={<LiveChart/>} />
        <Route path="/poll-history" element={<PollHistory/>} />
        <Route path="/livedata" element={<LiveChart/>} />
      </Route>
    </Routes>
  )
}

export default MainRoutes



