import useContextInfo from "../../../Hooks/useContextInfo";


const AdminHome = () => {
   const { user } = useContextInfo();

   return (
     <div className="mt-10">
       <h2 className="text-3xl">
        
           Hi, Welcome {user?.displayName ? user.displayName : "Back"}!
        
       </h2>
     </div>
   );
};

export default AdminHome;