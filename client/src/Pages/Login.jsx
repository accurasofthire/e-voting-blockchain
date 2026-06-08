import { lazy } from "react";

import ClipboardAddress from "./ClipboardAddress";
const ElectionsList = lazy(() => import("./ElectionsList"));

const Login = () => {

  return (
    <>
      <ClipboardAddress />
      <ElectionsList />
    </>
  );
};

export default Login;
