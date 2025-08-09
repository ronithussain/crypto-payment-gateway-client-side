// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import { FaTrash, FaUsers } from "react-icons/fa6";
// import Swal from "sweetalert2";
// import toast from "react-hot-toast";
// import { useEffect, useState } from "react";
// import ReactPaginate from "react-paginate";

// const Modal = () => {
//     const axiosSecure = useAxiosSecure();
//     const [search, setSearch] = useState('');
//     const [currentPage, setCurrentPage] = useState(0);
//     const usersPerPage = 5;

//     useEffect(() => {
//         setCurrentPage(0); // যখনই search change হবে, page reset হবে
//     }, [search]);

//     const { data: usersData = [], refetch } = useQuery({
//         queryKey: ['users', search, currentPage],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users?search=${search}&page=${currentPage}&limit=${usersPerPage}`);
//             return res.data;
//         }
//     });

//     const users = usersData?.result || [];
//     const totalPages = usersData?.totalPages || 1;

//     const handlePageClick = (data) => {
//         setCurrentPage(data.selected);
//     };

//     // রোল টগল করার ফাংশন
//     const handleToggleRole = (user) => {
//         const newRole = user.role === 'admin' ? 'user' : 'admin';

//         axiosSecure.patch(`/users/admin/${user._id}`, { role: newRole })
//             .then(res => {
//                 if (res.data.modifiedCount > 0) {
//                     refetch();
//                     Swal.fire({
//                         position: "top-end",
//                         icon: "success",
//                         title: `User role changed to ${newRole}!`,
//                         showConfirmButton: false,
//                         timer: 1500,
//                     });
//                 }
//             });
//     };

//     const handleDelete = (user) => {
//         const confirmDelete = window.confirm("Are you sure? You won't be able to revert this!");
//         if (!confirmDelete) return;

//         axiosSecure.delete(`/users/${user._id}`)
//             .then(res => {
//                 if (res.data.deletedCount > 0) {
//                     refetch();
//                     toast.success('User has been deleted successfully!', {
//                         duration: 4000,
//                         position: 'top-bottom',
//                     });
//                 }
//             })
//             .catch(error => {
//                 toast.error('Failed to delete user.', {
//                     duration: 4000,
//                     position: 'top-right',
//                 });
//                 console.log(error);
//             });
//     };

//     return (
//         <div>
//             <div className="modal-box w-full max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
//                 <div className="overflow-x-auto">
//                     <input
//                         type="text"
//                         placeholder=" Search by name..."
//                         className="bg-black/70 border border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-gray-300 outline-none p-2 rounded-md w-[100%]  mx-auto block text-lg shadow-sm transition-all duration-300 mb-4"
//                         onChange={(e) => setSearch(e.target.value)}
//                     />
//                     <h2 className="text-black py-2">All Users </h2>
//                     <table className="table ">
//                         <thead className="bg-[#1D84B5] text-black/80">
//                             <tr>
//                                 <th>#</th>
//                                 <th>User Name</th>
//                                 <th>User Email</th>
//                                 <th>Make Admin/User</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {users.length > 0 ? (
//                                 users.map((user, index) => (
//                                     <tr key={user._id} className="hover:bg-gray-50 text-black">
//                                         <th>{currentPage * usersPerPage + index + 1}</th>
//                                         <td>{user.name}</td>
//                                         <td>{user.email}</td>
//                                         <td>
//                                             <button
//                                                 onClick={() => handleToggleRole(user)}
//                                                 className={`btn btn-ghost text-lg ${user.role === 'admin' ? 'bg-green-600 text-white' : 'bg-[#33B3CA] text-white'}`}
//                                                 title={`Make ${user.role === 'admin' ? 'User' : 'Admin'}`}
//                                             >
//                                                 <FaUsers />
//                                                 <span className="ml-1">{user.role === 'admin' ? 'Make User' : 'Make Admin'}</span>
//                                             </button>
//                                         </td>
//                                         <td>
//                                             <button
//                                                 onClick={() => handleDelete(user)}
//                                                 className="btn btn-ghost text-lg bg-[#EF433F] text-white"
//                                             >
//                                                 <FaTrash />
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="5" className="text-center py-4 text-gray-900 font-medium">
//                                         No user found.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Pagination */}
//                 <div className="flex justify-center items-end mt-4">
//                     <ReactPaginate
//                         previousLabel={"← Previous"}
//                         nextLabel={"Next →"}
//                         pageCount={totalPages}
//                         onPageChange={handlePageClick}
//                         containerClassName={"flex gap-3"}
//                         pageClassName={"px-3 py-1  rounded-md cursor-pointer"}
//                         activeClassName={"bg-[#EF433F] text-white"}
//                         previousClassName={"px-3 py-1 rounded-md cursor-pointer"}
//                         nextClassName={"px-3 py-1  rounded-md cursor-pointer"}
//                         previousLinkClassName={"text-black"}
//                         nextLinkClassName={"text-black"}
//                         disabledClassName={"opacity-50 cursor-not-allowed"}
//                     />
//                 </div>

//                 <div className="modal-action">
//                     <form method="dialog">
//                         <button className="btn btn-neutral btn-sm md:btn-md">Close</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Modal;



import { useState, useEffect } from 'react';
import { Users, Plus, Mail, User, Shield, ChevronDown, Search, ChevronLeft, ChevronRight, Trash2, AlertCircle, CheckCircle } from 'lucide-react';

export default function UserControl() {
  const [users, setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Pagination states
  const [currentUserPage, setCurrentUserPage] = useState(0);
  const itemsPerPage = 5;

  // Sample data for demonstration
  useEffect(() => {
    // Simulate loading users from API
    const sampleUsers = [
      { _id: '1', name: 'John Doe', email: 'john@example.com', role: 'user' },
      { _id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'admin' },
      { _id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'user' },
      { _id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', role: 'user' },
      { _id: '5', name: 'David Brown', email: 'david@example.com', role: 'admin' },
      { _id: '6', name: 'Lisa Davis', email: 'lisa@example.com', role: 'user' },
    ];
    setUsers(sampleUsers);
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = currentUserPage * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Simulate API call delay
  const simulateApiCall = async (action) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    return true;
  };

  useEffect(() => {
    setCurrentUserPage(0); // Reset page when search changes
  }, [userSearchTerm]);

  const handleAddUser = async () => {
    if (newUser.name && newUser.email) {
      await simulateApiCall('add');
      const newUserId = Date.now().toString();
      setUsers([...users, {
        _id: newUserId,
        ...newUser
      }]);
      setNewUser({ name: '', email: '', role: 'user' });
      setShowAddUser(false);
      showNotification('User added successfully!');
    }
  };

  const toggleUserRole = async (user) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    
    if (window.confirm(`Are you sure you want to make ${user.name} a ${newRole}?`)) {
      await simulateApiCall('role');
      setUsers(users.map(u => 
        u._id === user._id ? { ...u, role: newRole } : u
      ));
      showNotification(`User role changed to ${newRole}!`);
    }
    setOpenDropdown(null);
  };

  const handleDeleteUser = async (user) => {
    if (window.confirm("Are you sure? You won't be able to revert this!")) {
      await simulateApiCall('delete');
      setUsers(users.filter(u => u._id !== user._id));
      showNotification('User has been deleted successfully!');
    }
    setOpenDropdown(null);
  };

  // Close dropdown when clicking outside
  const handleOutsideClick = () => {
    setOpenDropdown(null);
  };

  // Reset to first page when search changes
  const handleUserSearch = (term) => {
    setUserSearchTerm(term);
    setCurrentUserPage(0);
  };

  const handlePageClick = (page) => {
    setCurrentUserPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100" onClick={handleOutsideClick}>
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          {notification.message}
        </div>
      )}

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span>Processing...</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-3 sm:px-6 sm:py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">User Control Panel</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage users and their permissions</p>
        </div>
      </div>

      <div className="p-3 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">User Management</h2>
            <button
              onClick={() => setShowAddUser(true)}
              className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center text-sm"
            >
              <Plus className="w-4 h-4 mr-1 sm:mr-2" />
              Add User
            </button>
          </div>

          {/* User Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={userSearchTerm}
              onChange={(e) => handleUserSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Add User Modal */}
          {showAddUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-lg font-semibold mb-4">Add New User</h3>
                <div className="space-y-3 sm:space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                  />
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddUser}
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 text-sm"
                    >
                      Add User
                    </button>
                    <button
                      onClick={() => setShowAddUser(false)}
                      className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users List - Both Mobile & Desktop */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Mobile Cards */}
            <div className="block lg:hidden space-y-3 p-4">
              {currentUsers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <User className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>No users found</p>
                </div>
              ) : (
                currentUsers.map((user, index) => (
                  <div key={user._id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">#{currentUserPage * itemsPerPage + index + 1}</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        {user.role === 'admin' && <Shield className="w-4 h-4 text-orange-500 mr-1" />}
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'admin' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                          {user.role}
                        </span>
                      </div>
                    </div>

                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === user._id ? null : user._id)}
                        className="w-full bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm font-medium hover:bg-gray-200 flex items-center justify-center"
                      >
                        Actions
                        <ChevronDown className="w-4 h-4 ml-1" />
                      </button>

                      {openDropdown === user._id && (
                        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                          <div className="py-1">
                            <button
                              onClick={() => toggleUserRole(user)}
                              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${user.role === 'user' ? 'text-orange-600' : 'text-blue-600'
                                }`}
                            >
                              {user.role === 'user' ? 'Make Admin' : 'Make User'}
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user)}
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                            >
                              Delete User
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )))}
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
                  {currentUsers.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                        <User className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                        <p>No user found.</p>
                      </td>
                    </tr>
                  ) : (
                    currentUsers.map((user, index) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {currentUserPage * itemsPerPage + index + 1}
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
                            onClick={() => toggleUserRole(user)}
                            className={`inline-flex items-center px-3 py-1 rounded text-xs font-medium ${user.role === 'admin' ? 'bg-green-600 text-white' : 'bg-blue-500 text-white'
                              } hover:opacity-80`}
                            title={`Make ${user.role === 'admin' ? 'User' : 'Admin'}`}
                          >
                            <Users className="w-3 h-3 mr-1" />
                            <span>{user.role === 'admin' ? 'Make User' : 'Make Admin'}</span>
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="inline-flex items-center px-3 py-1 rounded text-xs font-medium bg-red-600 text-white hover:bg-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    )))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageClick(Math.max(currentUserPage - 1, 0))}
                  disabled={currentUserPage === 0}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageClick(Math.min(currentUserPage + 1, totalPages - 1))}
                  disabled={currentUserPage === totalPages - 1}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{currentUserPage * itemsPerPage + 1}</span> to{' '}
                    <span className="font-medium">{Math.min((currentUserPage + 1) * itemsPerPage, filteredUsers.length)}</span> of{' '}
                    <span className="font-medium">{filteredUsers.length}</span> users
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => handlePageClick(Math.max(currentUserPage - 1, 0))}
                      disabled={currentUserPage === 0}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageClick(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === currentUserPage
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                      >
                        {page + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageClick(Math.min(currentUserPage + 1, totalPages - 1))}
                      disabled={currentUserPage === totalPages - 1}
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
  );
}