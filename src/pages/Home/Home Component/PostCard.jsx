import React, { useContext, useState } from "react";
import { Link } from "react-router";
import { FaArrowUp, FaArrowDown, FaRegCommentDots } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";

const PostCard = ({ post }) => {
  const { darkMode } = useContext(AuthContext);

  const [showFull, setShowFull] = useState(false);

  const toggleDescription = (e) => {
    e.preventDefault();
    setShowFull(!showFull);
  };

  return (
    <Link to={`/posts/${post._id}`} className="block">
      <div
        data-aos="zoom-in"
        className={`
    w-full max-w-xl mx-auto 
    h-auto md:h-64 lg:h-72      /* ✅ RESPONSIVE HEIGHT ADDED */
    rounded-xl shadow-md 
    hover:shadow-xl hover:-translate-y-1 
    transition-all duration-300 
    overflow-hidden 
    flex flex-col justify-between
    ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
  `}
      >
        <div className="p-5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img
              src={post.authorImage || "https://i.ibb.co/YWQ0mnc/avatar.png"}
              alt={post.authorName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-lg">
                {post.authorName || "Anonymous"}
              </h3>
              <p className="text-sm opacity-70">
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleString()
                  : ""}
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold">{post.title}</h2>

          <p
            className={`${
              showFull ? "line-clamp-none" : "line-clamp-2"
            } leading-relaxed`}
          >
            {post.description}

            {!showFull && post.description?.split(" ").length > 20 && (
              <span
                onClick={toggleDescription}
                className="text-blue-600 cursor-pointer ml-1"
              >
                ...see more
              </span>
            )}
          </p>
        </div>

        {/* ✅ FIXED TO BOTTOM USING mt-auto */}
        <div className="mt-auto p-5 pt-3 border-t border-gray-300/30 flex justify-between items-center">
          {post.tag && (
            <span className="badge badge-outline text-sm px-3 py-1">
              #{post.tag}
            </span>
          )}

          <div className="flex gap-4 text-sm">
            <span className="flex items-center gap-1 text-green-500">
              <FaArrowUp /> {post.upVote || 0}
            </span>
            <span className="flex items-center gap-1 text-red-500">
              <FaArrowDown /> {post.downVote || 0}
            </span>
            <span className="flex items-center gap-1 text-blue-500">
              <FaRegCommentDots /> {post.comments?.length || 0}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
