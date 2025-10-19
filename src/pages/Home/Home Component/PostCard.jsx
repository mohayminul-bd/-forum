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
    <Link to={`/posts/${post._id}`}>
      <div
        data-aos="zoom-in"
        className={`card w-full max-w-md  shadow-blue-100 hover:shadow-xl hover:-translate-y-2 transition-transform duration-600 flex flex-col justify-between h-60 ${
          darkMode
            ? " bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-md rounded-lg text-white"
            : "bg-base-100 text-black"
        }`}
      >
        <div className="card-body flex flex-col justify-between h-full">
          {/* Top Section: Author, Title, Description */}
          <div>
            {/* Author Info */}
            <div className="flex items-center gap-3 mb-2">
              <img
                src={post.authorImage || "https://i.ibb.co/YWQ0mnc/avatar.png"}
                alt={post.authorName || "Anonymous"}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-xl">
                  {post.authorName || "Anonymous"}
                </h3>
                <p className="text-sm text-gray-300">
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleString()
                    : ""}
                </p>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-lg font-bold mb-2">{post.title}</h2>

            {/* Description */}
            <p className={` mb-2 ${showFull ? "" : "line-clamp-2"}`}>
              {post.description}
              {post.description?.split(" ").length > 20 && !showFull && (
                <span
                  onClick={toggleDescription}
                  className="text-blue-600 cursor-pointer ml-1"
                >
                  ...see more
                </span>
              )}
            </p>
          </div>

          {/* Bottom Section: Tag, Votes, Comments */}
          <div className="mt-2 flex flex-col gap-2">
            {/* Tag */}
            <div>
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
      </div>
    </Link>
  );
};

export default PostCard;
