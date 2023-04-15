import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import LandingPage from "../pages/LandingPage";
import AdminPrivateRoute from "./AdminPrivateRoute";
import UserPrivateRoute from "./UserPrivateRoute";
import CreatePoll from "../pages/CreatePoll";
import TemplatePage from "../pages/TemplatePage";
import TemplateDetailPage from "../pages/TemplateDetailPage";
import LiveChart from "../pages/LiveChart";
import RecentPolls from "../pages/RecentPolls";
import EndedPoll from "../pages/EndedPoll";
import EndedChart from "../pages/EndedChart";
import LivePoll from "../pages/LivePoll";
import PollPage from "../pages/PollPage";
import Participate from "../pages/Participate";
import UserVoted from "../pages/UserVoted";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<UserPrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user/recentpolls" element={<RecentPolls />} />
        <Route path="/event/:id" element={<PollPage />} />
        <Route path="/user/participate" element={<Participate />} />
      </Route>
      <Route element={<AdminPrivateRoute />}>
        <Route path="/create" element={<CreatePoll />} />
        <Route path="/template-page" element={<TemplatePage />} />
        <Route path="/template-page/:id" element={<TemplateDetailPage />} />
        <Route path="/live-polls" element={<LivePoll />} />
        <Route path="/user-voted" element={<UserVoted />} />
        <Route path="/live-polls/:id" element={<LiveChart />} />
        <Route path="/ended-polls" element={<EndedPoll />} />
        <Route path="/ended-polls/:id" element={<EndedChart />} />
      </Route>
    </Routes>
  );
}

export default MainRoutes;
