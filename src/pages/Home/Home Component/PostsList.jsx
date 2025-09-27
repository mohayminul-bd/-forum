import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PostCard from "./PostCard";
import axios from "axios";

const PostsList = () => {
  const [viewMode, setViewMode] = useState("new"); // "new" or "popular"

  // ✅ Fetch posts
  const {
    data: posts = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["all-posts"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/posts");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading posts...</p>;
  if (isError) {
    console.error(error);
    return (
      <p className="text-center py-10 text-red-500">Failed to load posts.</p>
    );
  }

  if (posts.length === 0)
    return <p className="text-center py-10">No posts available.</p>;

  // ✅ Sort posts based on toggle
  const sortedPosts =
    viewMode === "popular"
      ? [...posts].sort(
          (a, b) =>
            (b.upVote + b.comments?.length || 0) -
            (a.upVote + a.comments?.length || 0)
        )
      : [...posts].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🔥 Forum Posts ({posts.length})
        </h1>

        {/* Toggle Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("new")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              viewMode === "new"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            New Posts
          </button>
          <button
            onClick={() => setViewMode("popular")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              viewMode === "popular"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Popular Posts
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostsList;
