import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";

import LandingPage from "../pages/LandingPage";
import AdminPrivateRoute from "./AdminPrivateRoute";
import UserPrivateRoute from "./UserPrivateRoute";

import LiveChart from "../pages/LiveChart";

import Template from "../pages/Template";
import CreatePoll from "../pages/CreatePoll";
import PollPage from "../pages/PollPage";
import TemplatePage from "../pages/TemplatePage";
import TemplateDetailPage from "../pages/TemplateDetailPage";
import RecentPolls from "../pages/RecentPolls";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<UserPrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recentpolls" element={<RecentPolls />} />
        <Route path="/pollpage" element={<PollPage />} />
      </Route>
      <Route element={<AdminPrivateRoute />}>
        <Route path="/create" element={<CreatePoll />} />
        <Route path="/template" element={<Template />} />
        <Route path="/template-page" element={<TemplatePage />} />
        <Route path="/template-details" element={<TemplateDetailPage />} />
        <Route path="/livedata" element={<LiveChart />} />
      </Route>
    </Routes>
  );
}

export default MainRoutes;
