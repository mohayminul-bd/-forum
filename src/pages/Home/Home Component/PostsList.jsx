import React from "react";
import { useQuery } from "@tanstack/react-query";
import PostCard from "./PostCard";
import axios from "axios";

const PostsList = () => {
  // ✅ React Query দিয়ে posts fetch
  const {
    data: posts = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["all-posts"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/posts"); // backend URL
      console.log("API response:", res.data);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading posts...</p>;
  if (isError) {
    console.error(error);
    return (
      <p className="text-center py-10 text-red-500">Failed to load Posts</p>
    );
  }

  if (posts.length === 0)
    return <p className="text-center py-10">No posts available.</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        🔥 Forum Posts ({posts.length})
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostsList;
