
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
      //admin routes
      {
        path: "/dashboard/users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
    ],
  },
]);