import useAuth from "../../../Hooks/UseAuth";


const AdminProfile = () => {
    const { user } = useAuth();

    // Default avatar image
    const defaultAvatar = "https://i.ibb.co/4pDNDk1/avatar.png"; // নিজের পছন্দমতো লিঙ্ক

    return (
        <div className="w-full sm:p-14">
            {/* User Info */}
            <div className="flex flex-col justify-center items-center">
                <img
                    src={user?.photoURL || defaultAvatar}
                    alt={user?.displayName || "Admin Avatar"}
                    className="sm:w-32 sm:h-32 w-24 h-24 rounded-full border-4 border-blue-500 brightness-80 contrast-100"
                />
                <h2 className="text-xs sm:text-3xl font-bold mt-4 text-blue-100">
                    Hi, <span className="text-blue-400">{user?.displayName || "Admin"}</span> Welcome Back!
                </h2>
                <p className="text-xs sm:text-lg text-blue-200">{user?.email || "No email found"}</p>
            </div>

            {/* divider */}
            <div className="divider"></div>
        </div>
    );
};

export default AdminProfile;