import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 10;

  // ✅ React Query v5+ style
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?page=${page}&limit=${limit}`);
      return res.data; // should return { users: [], totalPages: number }
    },
    keepPreviousData: true,
    staleTime: 1000 * 60, // 1 minute cache
  });

  if (isLoading) return <p className="text-center py-10">Loading users...</p>;
  if (isError)
    return (
      <p className="text-center py-10 text-red-500">Failed to load users.</p>
    );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>

      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.users.length > 0 ? (
            data.users.map((user) => (
              <tr key={user._id}>
                <td className="border px-2 py-1">{user.name}</td>
                <td className="border px-2 py-1">{user.email}</td>
                <td className="border px-2 py-1">Edit/Delete</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center py-4">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {data.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(data.totalPages).keys()].map((idx) => (
            <button
              key={idx}
              onClick={() => setPage(idx + 1)}
              className={`px-3 py-1 border rounded ${
                page === idx + 1 ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
