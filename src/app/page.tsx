"use client";

import { useSelector } from "react-redux";
import { selectUserStatus, USER_STATUS } from "@/redux/slices/userSlice";
import Login from "./login/page";
import Register from "./register/page";
import Logout from "./logout/page";

export default function Home() {
  const status = useSelector(selectUserStatus);
  if ([USER_STATUS.LOGGED_OUT, USER_STATUS.REGISTER_FAILED].includes(status)) {
    return <Register />;
  }

  if (status === USER_STATUS.LOGGED_IN) {
    return <Logout />;
  }

  return <Login />;
}
