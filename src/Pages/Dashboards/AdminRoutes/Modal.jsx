import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrash, FaUsers } from "react-icons/fa6";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";


const Modal = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const usersPerPage = 5;

    useEffect(() => {
        setCurrentPage(0); // যখনই search change হবে, page reset হবে
    }, [search]);


    const { data: usersData = [], refetch } = useQuery({
        queryKey: ['users', search, currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}&page=${currentPage}&limit=${usersPerPage}`);
            return res.data;
        }
    })

    const users = usersData?.result || [];
    const totalPages = usersData?.totalPages || 1;
    console.log(users, 'all data to users ')

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
        // refetch();
    };

    const handleMakeAdmin = id => {
        axiosSecure.patch(`/users/admin/${id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'user is an Admin Now!',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
    }

    const handleDelete = (user) => {
        const confirmDelete = window.confirm("Are you sure? You won't be able to revert this!");
        if (!confirmDelete) {
            return;
        }

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
            });
    };

    // if (isLoading) return <p className="text-center">Loading...</p>;
    // if (isError) return <p className="text-center text-red-500">Something went wrong!</p>;

    console.log("Users Data:", usersData);
    console.log("Users Array:", users);

    return (
        <dialog id="user_modal" className="modal z-30">
            <div className="modal-box w-full max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
                <div className="overflow-x-auto">
                    <input
                        type="text"
                        placeholder=" Search by name..."
                        className="bg-black/70 border border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-gray-300 outline-none p-2 rounded-md w-[100%]  mx-auto block text-lg shadow-sm transition-all duration-300 mb-4"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <tr className="text-black py-2">All Users </tr>
                    <table className="table ">
                        {/* head */}
                        <thead className="bg-[#1D84B5] text-black/80">
                            <tr >
                                <th>
                                    #
                                </th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Make Admin</th>
                                {/* <th>Subscription Status</th> */}
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users?.map((user, index) =>
                                    <tr key={user._id} className="hover:bg-gray-50 text-black">
                                        <th>
                                            {currentPage * usersPerPage + index + 1}
                                        </th>
                                        <td>{user.name}</td>
                                        <td>
                                            {user.email}
                                        </td>
                                        <td>
                                            {
                                                user.role === 'admin' ?
                                                    <span className="text-green-500 font-medium sm:text-base text-xs ">Admin</span>
                                                    :
                                                    <button
                                                        onClick={() => handleMakeAdmin(user._id)}
                                                        className="btn btn-ghost text-lg bg-[#33B3CA] text-white">
                                                        <FaUsers />
                                                    </button>
                                            }
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDelete(user)}
                                                className="btn btn-ghost text-lg bg-[#EF433F] text-white">
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>)
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-gray-900 font-medium">
                                        No user found.
                                    </td>
                                </tr>
                            )

                            }

                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="flex justify-center items-end mt-4">
                    <ReactPaginate
                        previousLabel={"← Previous"}
                        nextLabel={"Next →"}
                        pageCount={totalPages}
                        onPageChange={handlePageClick}
                        containerClassName={"flex gap-3"}
                        pageClassName={"px-3 py-1  rounded-md cursor-pointer"}
                        activeClassName={"bg-[#EF433F] text-white"}
                        previousClassName={"px-3 py-1 rounded-md cursor-pointer"}
                        nextClassName={"px-3 py-1  rounded-md cursor-pointer"}

                        previousLinkClassName={"text-black"}  // ✅ black text for Previous
                        nextLinkClassName={"text-black"}

                        disabledClassName={"opacity-50 cursor-not-allowed"}
                    />
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-neutral btn-sm md:btn-md">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default Modal;
