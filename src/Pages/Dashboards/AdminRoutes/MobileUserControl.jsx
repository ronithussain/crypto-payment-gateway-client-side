import { Mail, User, Shield, ChevronDown } from 'lucide-react';

const MobileUserControl = ({ users, currentPage, usersPerPage, openDropdown, setOpenDropdown, handleToggleRole, handleDelete, isFetching }) => {
    
    const Loader = () => (
        <div className="text-center py-8 text-gray-500">
            <svg className="animate-spin h-6 w-6 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <p>Loading...</p>
        </div>
    );

    if (isFetching) {
        return <Loader />;
    }

    if (users.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <User className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>No users found</p>
            </div>
        );
    }

    return (
        <>
            {users.map((user, index) => (
                <div key={user._id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                        {/* Avatar + Name + Email */}
                        <div className="flex items-center min-w-0">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="ml-3 min-w-0">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-xs text-gray-500 flex items-center max-w-[140px] truncate">
                                    <Mail className="w-3 h-3 mr-1 flex-shrink-0" />
                                    <span className="truncate">{user.email}</span>
                                </div>
                            </div>
                        </div>
                        <span className="text-xs text-gray-500">
                            #{currentPage * usersPerPage + index + 1}
                        </span>
                    </div>

                    {/* Role */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                            {user.role === 'admin' && (
                                <Shield className="w-4 h-4 text-orange-500 mr-1" />
                            )}
                            <span
                                className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'admin'
                                        ? 'bg-orange-100 text-orange-800'
                                        : 'bg-blue-100 text-blue-800'
                                    }`}
                            >
                                {user.role}
                            </span>
                        </div>
                    </div>

                    {/* Actions Dropdown */}
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() =>
                                setOpenDropdown(
                                    openDropdown === user._id ? null : user._id
                                )
                            }
                            className="w-full bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm font-medium hover:bg-gray-200 flex items-center justify-center"
                        >
                            Actions
                            <ChevronDown className="w-4 h-4 ml-1" />
                        </button>

                        {openDropdown === user._id && (
                            <div className="absolute left-0 right-0 bottom-full mb-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                <div className="py-1">
                                    <button
                                        onClick={() => handleToggleRole(user)}
                                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${user.role === 'user'
                                                ? 'text-orange-600'
                                                : 'text-blue-600'
                                            }`}
                                    >
                                        {user.role === 'user'
                                            ? 'Make Admin'
                                            : 'Make User'}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user)}
                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                                    >
                                        Delete User
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default MobileUserControl;