
import { createBrowserRouter } from 'react-router-dom';

import Main from '../Layout/Main';
import Home from '../Pages/Home/Home';
import Menu from '../Pages/Menu/Menu';
import Order from '../Pages/Order/Order';
import PrivateForLogin from '../PrivateRoute/PrivateForLogin';
import Login from '../Pages/Login/Login';
import Register from './../Pages/Register/Register';
import Private from '../PrivateRoute/Private';
import Secret from '../Pages/Secret';

import Cart from '../Pages/Dashboard/Cart/Cart';
import Dashboard from '../Layout/Dashboard';
import AllUsers from '../Pages/Dashboard/AllUsers/AllUsers';
import AdminRoute from '../PrivateRoute/AdminRoute';
import AddItem from '../Pages/Dashboard/AddItem/AddItem';
import ManageItems from '../Pages/Dashboard/ManageItems/ManageItems';
import EditItem from '../Pages/Dashboard/EditItem/EditItem';
import Payment from '../Pages/Dashboard/Payment/Payment';
import PaymentHistory from '../Pages/Dashboard/PaymentHistory/PaymentHistory';
import UserHome from '../Pages/Dashboard/UserHome/UserHome';
import AdminHome from '../Pages/Dashboard/AdminHome/AdminHome';


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Menu></Menu>,
      },
      {
        path: "/order/:category",
        element: <Order></Order>,
      },
      {
        path: "/login",
        element: (
          <PrivateForLogin>
            <Login></Login>
          </PrivateForLogin>
        ),
      },
      {
        path: "/register",
        element: (
          <PrivateForLogin>
            <Register></Register>
          </PrivateForLogin>
        ),
      },
      {
        path: "/secret",
        element: (
          <Private>
            <Secret></Secret>
          </Private>
        ),
      },
      {
        path: "/contact",
        element: <h1 className='mt-56'>Soon</h1>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <Private>
        <Dashboard></Dashboard>
      </Private>
    ),
    children: [
      {
        path: "/dashboard/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/dashboard/user-home",
        element: <UserHome></UserHome>,
      },
      {
        path: "/dashboard/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "/dashboard/reservation",
        element: <h1>Reservation</h1>,
      },
      {
        path: "/dashboard/review",
        element: <h1>review</h1>,
      },
      {
        path: "/dashboard/user-booking",
        element: <h1>booking</h1>,
      },

      //admin routes
      {
        path: "/dashboard/admin-home",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/add-items",
        element: (
          <AdminRoute>
            <AddItem></AddItem>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-items",
        element: (
          <AdminRoute>
            <ManageItems></ManageItems>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/edit/:id",

        element: (
          <AdminRoute>
            <EditItem></EditItem>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-bookings",

        element: (
          <AdminRoute>
            <h1>Bookings</h1>
          </AdminRoute>
        ),
      },
    ],
  },
]);