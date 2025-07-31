import useAuth from '../../../Hooks/UseAuth';

const UserProfile = () => {
    const {user} = useAuth();
    return (
        <div className=" w-full p-14 ">
            {/* User Info */}
            <div className="flex flex-col justify-center items-center">
                <img
                    src={user?.photoURL}
                    alt={user?.displayName}
                    className="sm:w-32 sm:h-32 rounded-full border-4 border-gray-400 brightness-75 contrast-100"
                />
                <h2 className="text-xs sm:text-3xl font-bold mt-4 text-gray-500">
                    Hi, <span className="text-gray-700">{user?.displayName}</span> Welcome Back!
                </h2>
                <p className="text-xs sm:text-lg text-gray-500">{user?.email}</p>
            </div>

            {/* divider */}
            <div className="divider"></div>    
        </div>
    );
};

export default UserProfile;