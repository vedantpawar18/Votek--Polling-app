

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Poll from '../components/Poll'
import LandingPage from './../pages/LandingPage';

function MainRoutes() {
  return (
    <Routes>
        <Route path="/poll" element={<Poll/>}/>
        <Route path='/' element={<LandingPage />} />
    </Routes>
  )
}

export default MainRoutes