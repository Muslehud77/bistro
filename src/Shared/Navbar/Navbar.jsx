import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo/logo-white.png";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { IoCartOutline } from "react-icons/io5";
import useCart from "../../Hooks/useCart";
import useAdmin from './../../Hooks/useAdmin';
const Navbar = () => {

  const {user,logout} = useContext(AuthContext)
const [isAdmin] = useAdmin()

  const [cart] = useCart()
 
  const links = (
    <>
      <li>
        <NavLink className="hover:text-white" to={"/"}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="hover:text-white" to={"/menu"}>
          Menu
        </NavLink>
      </li>
      <li>
        <NavLink className="hover:text-white" to={"/order/All"}>
          Order
        </NavLink>
      </li>
      {user ? (
        isAdmin ? (
          <li>
            <NavLink className="hover:text-white" to={"/dashboard/admin-home"}>
              Dashboard
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink className="hover:text-white" to={"/dashboard/user-home"}>
             Profile
            </NavLink>
          </li>
        )
      ) : (
        ""
      )}
    </>
  );

  return (
    <div className="navbar absolute container bg-black bg-opacity-20 top-0 z-10 text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu gap-5 menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>
        <img src={logo} className="w-20" alt="" />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-5 px-1">{links}</ul>
      </div>
      {user ? (
        <div className="navbar-end gap-5">
          <Link to={'/dashboard/cart'} className="btn">
            <IoCartOutline className="text-xl" />
            {cart.length > 0 && (
              <div className="badge badge-secondary">{cart.length >9 ? '9+' : cart.length}</div>
            )}
          </Link>
          <button onClick={logout}>
            <a className="btn btn-sm">logout</a>
          </button>
        </div>
      ) : (
        <Link to={"/login"} className="navbar-end">
          <a className="btn btn-sm">Login</a>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
