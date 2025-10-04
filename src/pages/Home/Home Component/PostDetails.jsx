import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaArrowUp, FaArrowDown, FaTrash } from "react-icons/fa";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const feedbackOptions = ["Spam", "Offensive", "Irrelevant"];

const PostDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [commentText, setCommentText] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState({});

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await axios.get(
        `https://fourm-server.vercel.app/posts/${id}`
      );
      return res.data;
    },
  });

  // Vote handler
  const handleVote = async (type) => {
    try {
      await axios.post(`https://fourm-server.vercel.app/posts/${id}/vote`, {
        userId: user?.email,
        type,
      });
      queryClient.invalidateQueries(["post", id]);
    } catch (err) {
      alert("Failed to vote", err);
    }
  };

  // Add comment
  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    await axios.post(`https://fourm-server.vercel.app/posts/${id}/comments`, {
      userId: user?.email,
      userName: user?.displayName || user?.email?.split("@")[0],
      text: commentText,
    });

    setCommentText("");
    queryClient.invalidateQueries(["post", id]);
  };

  // Delete comment (with SweetAlert confirm)
  const handleDeleteComment = async (commentId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `https://fourm-server.vercel.app/posts/${id}/comments/${commentId}`,
          {
            data: { userId: user.email },
          }
        );
        queryClient.invalidateQueries(["post", id]);
        Swal.fire("Deleted!", "Your comment has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error!", "Failed to delete comment.", err);
      }
    }
  };

  // Report comment
  const handleReport = async (commentId) => {
    const feedback = selectedFeedback[commentId];
    if (!feedback) return;

    try {
      await axios.post(
        `https://fourm-server.vercel.app/comments/${commentId}/report`,
        {
          feedback,
          reportedBy: user?.email,
          postId: id,
          commentText: post.comments.find((c) => c._id === commentId)?.text,
        }
      );

      Swal.fire("Reported!", "Comment has been reported.", "success");
      setSelectedFeedback((prev) => ({ ...prev, [commentId]: "" }));
      queryClient.invalidateQueries(["post", id]);
    } catch (err) {
      Swal.fire("Error!", "Failed to report comment.", err);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Post */}
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-700 mb-6">{post.description}</p>

      {/* Vote */}
      <div className="flex gap-6 mb-6">
        <button
          onClick={() => handleVote("up")}
          className="flex gap-2 items-center text-green-600"
        >
          <FaArrowUp /> {post.upVote || 0}
        </button>
        <button
          onClick={() => handleVote("down")}
          className="flex gap-2 items-center text-red-600"
        >
          <FaArrowDown /> {post.downVote || 0}
        </button>
      </div>

      {/* Add Comment */}
      <form onSubmit={handleComment} className="mb-6 space-y-2">
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Add Comment
        </button>
      </form>

      {/* Comment List */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Comments</h2>
        {post.comments?.length > 0 ? (
          <ul className="space-y-3">
            {post.comments.map((c) => (
              <li
                key={c._id}
                className="p-4 bg-gray-50 rounded flex justify-between items-start"
              >
                <div>
                  <p className="font-semibold">{c.userName}</p>
                  <p>{c.text}</p>
                  <span className="text-xs text-gray-500">
                    {c.createdAt && new Date(c.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  {/* Delete only for owner */}
                  {c.userId === user?.email && (
                    <button
                      onClick={() => handleDeleteComment(c._id)}
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>
                  )}

                  {/* Report for other users */}
                  {user && c.userId !== user.email && c._id && (
                    <div className="flex flex-col gap-1">
                      <select
                        className="select select-bordered w-full text-sm"
                        value={selectedFeedback[c._id] || ""}
                        onChange={(e) =>
                          setSelectedFeedback((prev) => ({
                            ...prev,
                            [c._id]: e.target.value,
                          }))
                        }
                      >
                        <option value="">Select Feedback</option>
                        {feedbackOptions.map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </select>
                      <button
                        className={`btn btn-sm btn-warning mt-1 ${
                          !selectedFeedback[c._id]
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={!selectedFeedback[c._id]}
                        onClick={() => handleReport(c._id)}
                      >
                        Report
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
