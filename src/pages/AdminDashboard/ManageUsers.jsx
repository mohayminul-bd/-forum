import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("https://fourm-server.vercel.app/users");
      return res.data.users;
    },
  });

  // ✅ Make Admin function with SweetAlert
  const handleMakeAdmin = async (id) => {
    try {
      await axios.patch(
        `https://fourm-server.vercel.app/users/${id}/make-admin`
      );
      refetch();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User is now an Admin 🎉",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong!",
      });
    }
  };

  // ✅ Delete Admin Opportunity function with SweetAlert
  const handleDeleteAdmin = async (id) => {
    try {
      await axios.patch(
        `https://fourm-server.vercel.app/users/${id}/delete-admin`
      );
      refetch();
      Swal.fire({
        icon: "info",
        title: "Admin Disabled",
        text: "This user can no longer be an Admin.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong!",
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      <table className="table w-full bg-white border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Membership</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <tr key={user._id}>
              <td>{user.name || "N/A"}</td>
              <td>{user.email}</td>
              <td>{user.role || "user"}</td>
              <td>{user.isMember ? "Gold" : "Free"}</td>
              <td className="space-x-2">
                {/* ✅ Make Admin Button */}
                {user.role !== "admin" && !user.adminDisabled && (
                  <button
                    onClick={() => handleMakeAdmin(user._id)}
                    className="btn btn-sm bg-blue-600 text-white"
                  >
                    Make Admin
                  </button>
                )}

                {/* ✅ Delete Admin Opportunity Button */}
                {!user.adminDisabled && (
                  <button
                    onClick={() => handleDeleteAdmin(user._id)}
                    className="btn btn-sm bg-red-600 text-white"
                  >
                    Delete Admin
                  </button>
                )}

                {/* ✅ If already disabled */}
                {user.adminDisabled && (
                  <span className="text-red-500 font-semibold">
                    Admin Disabled
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
