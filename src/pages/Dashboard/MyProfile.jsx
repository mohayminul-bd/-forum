import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

// Badge components
const BronzeBadge = () => (
  <div className="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold shadow-sm text-sm sm:text-base">
    <span className="text-xl">🥉</span> <span>Bronze</span>
  </div>
);

const GoldBadge = () => (
  <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-semibold shadow-md text-sm sm:text-base">
    <span className="text-xl">🥇</span> <span>Gold</span>
  </div>
);

const MyProfile = () => {
  const { user } = useAuth(); // firebase user
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  // ✅ Get user info from DB
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `https://fourm-server.vercel.app/users/role/${user.email}`
        );

        setProfile(res.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    if (user?.email) fetchProfile();
  }, [user?.email]);

  // ✅ Get posts by this user
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/posts?email=${user.email}&limit=3&sort=desc`
        );
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to load posts:", err);
      }
    };

    if (user?.email) fetchPosts();
  }, [user?.email]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      {/* User Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
        <img
          src={user.photoURL || "/default-profile.png"}
          alt={user.displayName}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-yellow-200 shadow-sm"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {user.displayName}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">{user.email}</p>

          {/* ✅ Badge based on isMember */}
          <div className="mt-2 sm:mt-3 flex justify-center sm:justify-start space-x-3">
            {profile?.isMember ? <GoldBadge /> : <BronzeBadge />}
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div>
        {posts.length === 0 ? (
          <p className="text-gray-500 text-sm sm:text-base"></p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="border border-gray-200 p-4 rounded-lg shadow hover:shadow-lg transition duration-200 flex flex-col justify-between"
              >
                <h4 className="font-bold text-lg sm:text-xl text-gray-800">
                  {post.title}
                </h4>
                <p className="text-gray-700 mt-1 text-sm sm:text-base line-clamp-3">
                  {post.description}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mt-2">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
