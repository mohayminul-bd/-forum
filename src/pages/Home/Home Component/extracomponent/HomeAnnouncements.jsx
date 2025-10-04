import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import useAxiosSecure from "../hooks/useAxiosSecure";

const HomeAnnouncements = () => {
  const axios = useAxiosSecure();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios
      .get("/announcements")
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.error("Error fetching announcements:", err));
  }, [axios]);

  if (!announcements.length) return null; // কোনো announcement না থাকলে দেখাবে না

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      <h2 className="text-2xl font-bold mb-4">📢 Announcements</h2>
      <div className="space-y-4">
        {announcements.map((a) => (
          <div
            key={a._id}
            className="border p-4 rounded-lg shadow-sm bg-white flex gap-4"
          >
            <img
              src={a.authorImage || "https://i.ibb.co/YWQ0mnc/avatar.png"}
              alt={a.authorName}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{a.title}</h3>
              <p className="text-gray-600 text-sm">{a.description}</p>
              <p className="text-gray-400 text-xs mt-1">
                By {a.authorName} | {new Date(a.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeAnnouncements;
