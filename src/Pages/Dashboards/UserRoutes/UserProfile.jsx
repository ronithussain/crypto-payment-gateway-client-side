import useAuth from '../../../Hooks/UseAuth';

const UserProfile = () => {
    const {user} = useAuth();
    return (
        <div className="  max-w-7xl w-full mx-auto sm:py-8 px-2 sm:px-0">
            {/* User Info */}
            <div className="flex flex-col justify-center mb-4">
                <h2 className="text-xl sm:text-3xl font-bold text-gray-300">
                    Hi, <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{user?.displayName}</span> Welcome Back!
                </h2>
            </div>  
        </div>
    );
};

export default UserProfile;