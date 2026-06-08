import { lazy } from "react";
import { Route } from "react-router-dom";
// const UserLogin = lazy(() => import("../Pages/UserLogin"));
// const UserRegister = lazy(() => import("../Pages/UserRegister"));
const Home = lazy(() => import("../Pages/Home"));
const Election = lazy(() => import("../Pages/Election"));
const Footer = lazy(() => import("../Components/User/Footer"));
const Navbar = lazy(() => import("../Components/User/Navbar"));
const ViewElection = lazy(() => import("../Pages/ViewElection"));
const ResultElection = lazy(() => import("../Pages/ResultElection"));
const ResultCandidate = lazy(() => import("../Pages/ResultCandidate"));
const Login = lazy(() => import("../Pages/Login"));

export const userRoutes = [
  <Route
    path="/"
    key="home"
    element={
      <>
        <Navbar />
        <Home />
        <Footer />
      </>
    }
  />,
  <Route
    path="/login"
    key="login"
    element={
      <>
        <Navbar />
        <Login />
        <Footer />
      </>
    }
  />,
  <Route path="/election" key="election">
    <Route
      index
      element={
        <>
          <Navbar />
          <Election />
          <Footer />
        </>
      }
    />
    <Route
      path=":id"
      element={
        <>
          <Navbar />
          <ViewElection />
          <Footer />
        </>
      }
    />
  </Route>,
  <Route path="/result" key="result">
    <Route
      index
      element={
        <>
          <Navbar />
          <ResultElection />
          <Footer />
        </>
      }
    />
    <Route
      path=":id"
      element={
        <>
          <Navbar />
          <ResultCandidate />
          <Footer />
        </>
      }
    />
    ,
  </Route>,
  // <Route path="/login" key="login" element={<UserLogin />} />,
  // <Route path="/register" key="register" element={<UserRegister />} />,
];
