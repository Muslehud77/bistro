import React from 'react';
import { FaBook, FaUsersCog } from 'react-icons/fa';
import { ImSpoonKnife } from 'react-icons/im';
import { IoMdHome } from 'react-icons/io';
import { IoCartOutline } from 'react-icons/io5';
import { MdHomeWork, MdMenu } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const AdminDashboard = () => {
    return (
      <ul className="menu space-y-2">
        <li>
          <NavLink className="" to={"/dashboard/admin-home"}>
            <MdHomeWork className="text-xl" />
            Admin Home
          </NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard/add-items"}>
            <ImSpoonKnife className="text-xl" />
            Add Items
          </NavLink>
        </li>
        <li>
          <NavLink className="" to={"/dashboard/cart"}>
            <IoCartOutline className="text-xl" />
            My Cart
          </NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard/manage-items"}>
            <MdMenu className="text-xl" />
            Manage Items
          </NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard/manage-bookings"}>
            <FaBook className="text-xl" />
            Manage Bookings
          </NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard/users"}>
            <FaUsersCog className="text-xl" />
            All users
          </NavLink>
        </li>
       <hr />
      </ul>
    );
};

export default AdminDashboard;