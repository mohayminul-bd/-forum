import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MakeAnnouncement = () => {
  const { user } = useAuth(); // firebase login user
  const axios = useAxiosSecure();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch user role from backend
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`/users?email=${user.email}`)
        .then((res) => {
          // backend থেকে array return হলে
          const currentUser = res.data.users ? res.data.users[0] : res.data;
          setRole(currentUser?.role || "user");
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setRole("user");
          setLoading(false);
        });
    }
  }, [user?.email, axios]);

  const onSubmit = async (data) => {
    try {
      const announcement = {
        authorName: user.displayName || "Admin",
        authorImage: user.photoURL || "https://i.ibb.co/YWQ0mnc/avatar.png",
        title: data.title,
        description: data.description,
        createdAt: new Date().toISOString(),
      };

      await axios.post("/announcements", announcement);

      Swal.fire({
        icon: "success",
        title: "Announcement Added!",
        timer: 2000,
        showConfirmButton: false,
      });

      reset();
    } catch (error) {
      console.error("Error adding announcement:", error);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong!",
      });
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  if (role !== "admin") {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-500">❌ Access Denied</h2>
        <p className="text-gray-500 mt-2">Only admins can add announcements.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        📢 Make Announcement
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md"
      >
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full"
            placeholder="Enter announcement title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered w-full"
            placeholder="Write your announcement..."
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <button type="submit" className="btn btn-success w-full">
          Submit Announcement
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
