import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Users, Mail, User, Shield, ChevronDown, Search, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import MobileUserControl from "./MobileUserControl";

const UserControl = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [openDropdown, setOpenDropdown] = useState(null);
    const usersPerPage = 5;

    useEffect(() => {
        setCurrentPage(0);
    }, [search]);

    const { data: usersData = {}, refetch, isFetching } = useQuery({
        queryKey: ['users', search, currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}&page=${currentPage}&limit=${usersPerPage}`);
            return res.data;
        }
    });

    const users = usersData?.result || [];
    const totalPages = usersData?.totalPages || 1;
    const totalUsers = usersData?.totalUsers || 0;

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handleToggleRole = (user) => {
        const newRole = user.role === 'admin' ? 'user' : 'admin';

        axiosSecure.patch(`/users/admin/${user._id}`, { role: newRole })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `User role changed to ${newRole}!`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
    };

    const handleDelete = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            toast.success('User has been deleted successfully!', {
                                duration: 4000,
                                position: 'top-bottom',
                            });
                        }
                    })
                    .catch(error => {
                        toast.error('Failed to delete user.', {
                            duration: 4000,
                            position: 'top-right',
                        });
                        console.log(error);
                    });
            }
        });
    };

    const handleOutsideClick = () => {
        setOpenDropdown(null);
    };

    const Loader = () => (
        <div className="text-center py-8 text-gray-500">
            <svg className="animate-spin h-6 w-6 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <p>Loading...</p>
        </div>
    );

    return (
        <>
            <div className="min-h-screen bg-gray-100 rounded-2xl" onClick={handleOutsideClick}>
                {/* Header */}
                <div className="bg-white shadow-sm rounded-2xl">
                    <div className="px-4 py-3 sm:px-6 sm:py-4">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">User Control Panel</h1>
                        <p className="text-sm sm:text-base text-gray-600">Manage users and their permissions</p>
                    </div>
                </div>

                <div className="p-3 sm:p-6">
                    <div className="space-y-4 sm:space-y-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">User Management</h2>
                        </div>

                        {/* User Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder=" Search by name..."
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                        </div>

                        {/* Users List */}
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            {/* Mobile Cards */}
                          
                            <div className="block lg:hidden space-y-3 p-4">
                                <MobileUserControl
                                    users={users}
                                    currentPage={currentPage}
                                    usersPerPage={usersPerPage}
                                    openDropdown={openDropdown}
                                    setOpenDropdown={setOpenDropdown}
                                    handleToggleRole={handleToggleRole}
                                    handleDelete={handleDelete}
                                    isFetching={isFetching}
                                />
                            </div>

                            {/* Desktop Table */}
                            <div className="hidden lg:block">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Make Admin/User</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {isFetching ? (
                                            <tr>
                                                <td colSpan="5">
                                                    <Loader />
                                                </td>
                                            </tr>
                                        ) : users.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                                    <User className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                                                    <p>No user found.</p>
                                                </td>
                                            </tr>
                                        ) : (
                                            users.map((user, index) => (
                                                <tr key={user._id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {currentPage * usersPerPage + index + 1}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                                <User className="w-5 h-5 text-blue-600" />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900 flex items-center">
                                                            <Mail className="w-3 h-3 mr-1" />
                                                            {user.email}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <button
                                                            onClick={() => handleToggleRole(user)}
                                                            className={`inline-flex items-center px-4 py-1.5 rounded text-xs font-medium ${user.role === 'admin' ? 'bg-green-600 text-white' : 'bg-blue-500 text-white'
                                                                } hover:opacity-80`}
                                                            title={`Make ${user.role === 'admin' ? 'User' : 'Admin'}`}
                                                        >
                                                            <Users className="w-3 h-3 mr-1" />
                                                            <span>{user.role === 'admin' ? 'Make User' : 'Make Admin'}</span>
                                                        </button>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button
                                                            onClick={() => handleDelete(user)}
                                                            className="inline-flex items-center justify-center gap-1 px-4 py-1.5 rounded-md text-xs font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-200"
                                                            title="Delete User"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            <span>Delete</span>
                                                        </button>
                                                    </td>

                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow">
                                <div className="flex-1 flex justify-between sm:hidden">
                                    <button
                                        onClick={() => handlePageClick(Math.max(currentPage - 1, 0))}
                                        disabled={currentPage === 0}
                                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => handlePageClick(Math.min(currentPage + 1, totalPages - 1))}
                                        disabled={currentPage === totalPages - 1}
                                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">{currentPage * usersPerPage + 1}</span> to{' '}
                                            <span className="font-medium">{Math.min((currentPage + 1) * usersPerPage, totalUsers)}</span> of{' '}
                                            <span className="font-medium">{totalUsers}</span> users
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                            <button
                                                onClick={() => handlePageClick(Math.max(currentPage - 1, 0))}
                                                disabled={currentPage === 0}
                                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <ChevronLeft className="h-5 w-5" />
                                            </button>
                                            {Array.from({ length: totalPages }, (_, i) => i).map((page) => (
                                                <button
                                                    key={page}
                                                    onClick={() => handlePageClick(page)}
                                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === currentPage
                                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {page + 1}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => handlePageClick(Math.min(currentPage + 1, totalPages - 1))}
                                                disabled={currentPage === totalPages - 1}
                                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <ChevronRight className="h-5 w-5" />
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserControl;