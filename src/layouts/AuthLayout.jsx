import { Outlet } from "react-router";
import Logo from "../components/Logo/Logo";

const AuthLayout = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <Logo />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
