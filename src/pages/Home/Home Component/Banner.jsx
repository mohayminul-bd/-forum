import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import { NavLink } from "react-router";

const Banner = () => {
  const images = [
    "https://i.ibb.co.com/Qv37xmj4/istockphoto-1987788771-612x612.jpg",
    "https://i.ibb.co.com/3ykygVhq/one-text-to-many.png",
    "https://i.ibb.co.com/5xz6xXVx/premium-photo-1661329859712-76d8a4500fdb.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTag, setSearchTag] = useState("");
  const [tagOptions, setTagOptions] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Hero background slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Fetch all available tags from posts
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get("https://fourm-server.vercel.app/posts");
        const uniqueTags = [
          ...new Set(res.data.map((post) => post.tag).filter(Boolean)),
        ];
        setTagOptions(uniqueTags);
      } catch (err) {
        console.error("Failed to fetch tags:", err);
      }
    };
    fetchTags();
  }, []);

  // Function to fetch posts based on tag (only on search)
  const handleSearch = async (tag = null) => {
    const queryTag = tag || searchTag;
    if (!queryTag) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://fourm-server.vercel.app/posts?tag=${encodeURIComponent(
          queryTag
        )}`
      );
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Banner */}
      <div
        className="relative h-[90vh] w-full transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
          <h1 className="mb-5 text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
            Forum message
          </h1>
          <p className="mb-5 text-base md:text-lg max-w-xl">
            Browse posts by tags or add your own posts to get started.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl w-full flex gap-2">
            <input
              type="text"
              placeholder="Search by tag..."
              value={searchTag}
              onChange={(e) => setSearchTag(e.target.value)}
              className="input input-bordered w-full text-black rounded-lg"
            />
            <button
              onClick={() => handleSearch()}
              className="btn btn-primary px-6 rounded-lg"
            >
              Search
            </button>
          </div>

          {/* Tag buttons */}
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {tagOptions.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchTag(tag);
                  handleSearch(tag);
                }}
                className="px-4 py-2 bg-blue-700 text-white rounded-lg shadow hover:bg-green-500 transition"
              >
                {tag}
              </button>
            ))}
          </div>

          <NavLink
            to="register"
            className="btn btn-secondary px-6 py-3 mt-6 rounded-lg shadow-lg"
          >
            Log in and explore all features <br /> Get Started
          </NavLink>
        </div>
      </div>

      {/* Posts Section */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 pb-6 mt-6">
        {loading ? (
          <p className="col-span-full text-center">Loading posts...</p>
        ) : posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            {searchTag ? `No posts found for "${searchTag}".` : " "}
          </p>
        )}
      </div>
    </div>
  );
};

export default Banner;
