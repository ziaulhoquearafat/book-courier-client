import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div>
      <h1>this is dashboard layout</h1>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
