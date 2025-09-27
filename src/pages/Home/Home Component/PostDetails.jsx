import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaArrowUp, FaArrowDown, FaTrash } from "react-icons/fa";
import { useParams } from "react-router";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const PostDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");
  const { user } = useAuth(); // logged-in user

  // Fetch post details
  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/posts/${id}`);
      return res.data;
    },
  });

  // Vote handler
  const handleVote = async (type) => {
    try {
      await axios.post(`http://localhost:5000/posts/${id}/vote`, {
        userId: user?.email,
        type,
      });
      queryClient.invalidateQueries(["post", id]);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to vote");
    }
  };

  // Add comment
  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    await axios.post(`http://localhost:5000/posts/${id}/comments`, {
      userId: user?.email,
      userName: user?.displayName || user?.email?.split("@")[0],
      text: commentText,
    });

    setCommentText("");
    queryClient.invalidateQueries(["post", id]);
  };

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/posts/${id}/comments/${commentId}`,
        { data: { userId: user.email } }
      );
      queryClient.invalidateQueries(["post", id]);
    } catch (err) {
      console.log("Delete error:", err.response?.data);
      alert(err.response?.data?.error || "Failed to delete comment");
    }
  };

  if (isLoading)
    return <p className="text-center py-10 text-gray-500">Loading post...</p>;
  if (isError)
    return <p className="text-center py-10 text-red-500">{error.message}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Post title & description */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">{post.title}</h1>
        <div className="min-h-[4.5rem] bg-gray-100 p-3 rounded">
          <p className="text-gray-700">{post.description}</p>
        </div>
      </div>

      {/* Vote section */}
      <div className="flex items-center gap-6 mb-6">
        <button
          onClick={() => handleVote("up")}
          className="flex items-center gap-3 text-green-600 cursor-pointer hover:scale-110 transition"
        >
          <FaArrowUp /> {post.upVote || 0}
        </button>
        <button
          onClick={() => handleVote("down")}
          className="flex items-center gap-2 text-red-600 cursor-pointer hover:scale-110 transition"
        >
          <FaArrowDown /> {post.downVote || 0}
        </button>
      </div>

      {/* Comment form */}
      <form onSubmit={handleComment} className="mb-6">
        <textarea
          className="textarea textarea-bordered w-full mb-2 resize-none"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Add Comment
        </button>
      </form>

      {/* Comment list */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Comments</h2>
        {post.comments && post.comments.length > 0 ? (
          <ul className="space-y-3">
            {post.comments.map((c) => (
              <li
                key={c._id}
                className="p-4 rounded-lg bg-gray-50 flex justify-between items-start shadow-sm hover:shadow-md transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">{c.userName}</p>
                  <p className="text-gray-700 mt-1">{c.text}</p>
                  <span className="text-xs text-gray-500">
                    {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
                  </span>
                </div>

                {/* Delete button only for owner */}
                {c.userId === user?.email && (
                  <button
                    onClick={() => handleDeleteComment(c._id)}
                    className="text-red-500 hover:text-red-700 ml-2 cursor-pointer transition"
                  >
                    <FaTrash />
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
