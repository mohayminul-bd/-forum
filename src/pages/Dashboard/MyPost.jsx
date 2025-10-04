import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaArrowAltCircleUp, FaArrowCircleDown } from "react-icons/fa";
import Swal from "sweetalert2";
import { NavLink } from "react-router";

const MyPost = () => {
  const { user } = useAuth(); // Logged-in user
  const axiosSecure = useAxiosSecure();

  const {
    data: posts = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["my-posts", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(
        `https://fourm-server.vercel.app/posts?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(
            `https://fourm-server.vercel.app/posts/${id}`
          );
          Swal.fire("Deleted!", "Your post has been deleted.", "success");
          refetch();
        } catch (error) {
          Swal.fire("Error!", "Something went wrong!", error);
        }
      }
    });
  };

  if (isLoading) return <p className="text-center py-10">Loading posts...</p>;
  if (isError)
    return (
      <p className="text-center py-10 text-red-500">Failed to load posts.</p>
    );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      <h2 className="text-2xl font-bold text-center">
        My Posts ({posts.length})
      </h2>

      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white md:w-150 shadow-md rounded-lg overflow-hidden border border-gray-200"
        >
          {/* Post Header */}
          <div className="flex items-center gap-4 p-4">
            <img
              src={post.authorImage || "https://i.ibb.co/YWQ0mnc/avatar.png"}
              alt={post.authorName}
              className="w-12 h-12 rounded-full border"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{post.authorName}</p>
              <span className="text-gray-400 text-sm">
                Date: {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Post Body */}
          <div className="px-4 pb-4">
            <h3 className="font-bold text-lg mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-2">{post.description}</p>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {post.tag}
            </span>
            <NavLink to={`/posts/${post._id}`}>
              <p className="py-2 cursor-pointer text-blue-500 hover:underline">
                See All
              </p>
            </NavLink>
          </div>

          {/* Post Footer */}
          <div className="flex items-center justify-between px-4 pb-4">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                <FaArrowAltCircleUp /> {post.upVote || 0}
              </button>
              <button className="flex items-center gap-1 text-gray-600 hover:text-red-600">
                <FaArrowCircleDown /> {post.downVote || 0}
              </button>
            </div>
            <div className="text-sm">
              <button
                onClick={() => handleDelete(post._id)}
                className="btn btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyPost;
