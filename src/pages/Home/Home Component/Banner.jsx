import React, { useState, useEffect } from "react";
import axios from "axios";
import image1 from "../../../assets/New folder/281281428_513718586877519_3414020004454445116_n.jpg";
import image2 from "../../../assets/New folder/332362138_766945137758802_7249250261760929092_n.jpg";
import image3 from "../../../assets/New folder/360126642_784571939792181_4715482852895793888_n.jpg";
import PostCard from "./PostCard";
import { NavLink } from "react-router";

const Banner = () => {
  const images = [image1, image2, image3];
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
        className="hero min-h-screen transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay bg-black/50"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Forum</h1>
            <p className="mb-5">
              Browse posts by tags or add your own posts to get started.
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto p-6 flex gap-2">
              <input
                type="text"
                placeholder="Search by tag..."
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
                className="input text-black input-bordered w-full"
              />
              <button
                onClick={() => handleSearch()}
                className="btn btn-primary px-4"
              >
                Search
              </button>
            </div>

            {/* Tag buttons */}
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {tagOptions.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchTag(tag);
                    handleSearch(tag);
                  }}
                  className="px-3 py-1 bg-blue-950 rounded hover:bg-green-400"
                >
                  {tag}
                </button>
              ))}
            </div>

            <NavLink to="register" className="btn btn-primary p-4 py-5 mt-4">
              Log in and explore all features <br /> Get Started
            </NavLink>
          </div>
        </div>
      </div>

      {/* Posts */}
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
