

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Poll from '../components/Poll'

function MainRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Poll/>}/>
    </Routes>
  )
}

export default MainRoutes