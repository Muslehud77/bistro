import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaRegGrinStars } from "react-icons/fa";

import { IoCartOutline } from "react-icons/io5";
import { MdHomeWork, MdOutlinePayment } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { NavLink } from "react-router-dom";
import useCart from "../../Hooks/useCart";


const UserDashboard = () => {
      const [cart] = useCart();
    return (
      <ul className="menu space-y-2">
        <li>
          <NavLink className="" to={"/dashboard/home"}>
            <MdHomeWork className="text-xl" />
            User Home
          </NavLink>
        </li>
        <li>
          <NavLink className="" to={"/dashboard/cart"}>
            <IoCartOutline className="text-xl" />
            My Cart ({cart.length})
          </NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard/reservation"}>
            <BsFillCalendarDateFill className="text-xl" />
            Reservation
          </NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard/payment-history"}>
            <MdOutlinePayment className="text-xl" />
            Payment History
          </NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard/review"}>
            <FaRegGrinStars className="text-xl" />
            Add Review
          </NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard/user-booking"}>
            <SlCalender className="text-xl" />
            My Booking
          </NavLink>
        </li>
        <hr />
        
      </ul>
    );
};

export default UserDashboard;