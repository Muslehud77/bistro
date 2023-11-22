import useContextInfo from "../../../Hooks/useContextInfo";


const UserHome = () => {
    const {user} = useContextInfo()

    return (
        <div>
           <h2 className="text-3xl">
            <span>Hi, welcome  {user?.displayName ? user.displayName : 'Back'}</span>
           </h2>
        </div>
    );
};

export default UserHome;