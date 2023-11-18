import { NavLink, Outlet } from "react-router-dom";
import logo from "../../src/assets/logo/logo-black.png";
import { IoCartOutline } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import UserDashboard from "../Shared/DashboardNavigation/UserDashboard";
import AdminDashboard from "../Shared/DashboardNavigation/AdminDashboard";
import { FaEnvelope } from "react-icons/fa";
import useAdmin from "../Hooks/useAdmin";


const Dashboard = () => {

  // TODO: have to determine weather the user is admin or not from database
  const [isAdmin] = useAdmin()

  return (
    <div className="flex">
      <div className="w-72 fixed left-0 min-h-screen bg-[#D1A054]">
        <img src={logo} className="w-44 mx-auto my-10" alt="" />
        {isAdmin ? (
          <AdminDashboard></AdminDashboard>
        ) : (
          <UserDashboard></UserDashboard>
        )}

        <ul className="menu space-y-2">
          <li>
            <NavLink to={"/"}>
              <IoMdHome className="text-xl" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/menu"}>
              <IoCartOutline className="text-xl" />
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to={"/contact"}>
              <FaEnvelope className="text-xl" />
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="ml-72 px-10 flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
