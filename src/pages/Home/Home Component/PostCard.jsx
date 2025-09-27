import React from "react";
import { Link } from "react-router";
import { FaArrowUp, FaArrowDown, FaRegCommentDots } from "react-icons/fa";

const PostCard = ({ post }) => {
  return (
    <Link to={`/posts/${post._id}`}>
      <div className="card w-full bg-base-100 shadow-md border hover:shadow-lg transition">
        <div className="card-body">
          {/* Author Info */}
          <div className="flex items-center gap-3 mb-2">
            <img
              src={post.authorImage || "https://i.ibb.co/YWQ0mnc/avatar.png"}
              alt={post.authorName || "Anonymous"}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-semibold">
                {post.authorName || "Anonymous"}
              </h3>
              <p className="text-sm text-gray-500">
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleString()
                  : ""}
              </p>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold mb-2">{post.title}</h2>

          {/* Description */}
          <p className="text-gray-700 mb-2 line-clamp-2">{post.description}</p>

          {/* Tag */}
          <div className="mb-3">
            {post.tag && (
              <span className="badge badge-outline">#{post.tag}</span>
            )}
          </div>

          {/* Vote & Comment */}
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-green-600">
                <FaArrowUp /> {post.upVote || 0}
              </span>
              <span className="flex items-center gap-1 text-red-600">
                <FaArrowDown /> {post.downVote || 0}
              </span>
            </div>
            <div className="flex items-center gap-1 text-blue-600">
              <FaRegCommentDots /> {post.comments?.length || 0}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
