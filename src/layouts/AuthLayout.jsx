import { Outlet } from "react-router";
import Logo from "../components/Logo/Logo";

const AuthLayout = () => {
  return (
    <div>
      <Logo />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
