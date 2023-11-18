
import useAdmin from "../Hooks/useAdmin";
import { Navigate } from "react-router-dom";
import useContextInfo from "../Hooks/useContextInfo";

const AdminRoute = ({ children }) => {
  const { user, loading  } = useContextInfo();
  const [isAdmin,isAdminLoading] = useAdmin();

  if (loading || isAdminLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  }
if (isAdmin && user) {
    return children;
  }
  return <Navigate to={"/"}></Navigate>;
};

export default AdminRoute;
