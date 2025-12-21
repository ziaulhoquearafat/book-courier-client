import { Outlet } from "react-router";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const RootLayouts = () => {
  return (
    <div className="bg-gradient-to-br from-slate-200 via-white to-blue-200">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayouts;
