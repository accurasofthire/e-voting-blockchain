import React, { lazy } from "react";
import { Route } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
const ViewUser = lazy(() => import("../Pages/admin/User/ViewUser.jsx"));
const AddUser = lazy(() => import("../Pages/admin/User/AddUser"));
const ViewElection = lazy(() => import("../Pages/admin/Election/ViewElection"));
const AddElection = lazy(() => import("../Pages/admin/Election/AddElection"));
const ViewCandidate = lazy(() => import("../Pages/admin/Candidate/ViewCandidate"));
const AddCandidate = lazy(() => import("../Pages/admin/Candidate/AddCandidate"));
const ViewDashboard = lazy(() => import("../Pages/admin/Dashboard/ViewDashboard"));
const AdminLogin = lazy(() => import("../Pages/admin/AdminLogin"));
const AdminLogout = lazy(() => import("../Pages/admin/Logout/AdminLogout"));
const EditUser = lazy(() => import("../Pages/admin/User/EditUser"));
const ViewPhase = lazy(() => import("../Pages/admin/Phase/ViewPhase"));
const EditPhase = lazy(() => import("../Pages/admin/Phase/EditPhase"));
const ViewResult = lazy(() => import("../Pages/admin/Result/ViewResult"));
const ViewElectionResult = lazy(() => import("../Pages/admin/Result/ViewElectionResult"));

export const adminRoutes = [
  <Route path="/admin" exact element={<AdminLogin />} key="adminLogin" />,
  <Route path="/admin" element={<Sidebar />} key="adminData">
    <Route
      path="dashboard"
      element={<ViewDashboard />}
      key="adminDashboard"
    ></Route>
    <Route path="user">
      <Route index element={<ViewUser />} />
      <Route path="add" element={<AddUser />} />
      <Route path="edit/:id" element={<EditUser />} />
    </Route>
    <Route path="candidate">
      <Route index element={<ViewCandidate />} />
      <Route path="add" element={<AddCandidate />} />
    </Route>
    <Route path="election">
      <Route index element={<ViewElection />} />
      <Route path="add" element={<AddElection />} />
    </Route>
    <Route path="phase">
      <Route index element={<ViewPhase />} />
      <Route path="edit/:id" element={<EditPhase />} />
    </Route>
    <Route path="result">
      <Route index element={<ViewResult />} />
      <Route path=":id" element={<ViewElectionResult />} />
    </Route>
    <Route path="logout" element={<AdminLogout />}></Route>
  </Route>,
];
