import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
// import useAuth from "../hooks/useAuth"; // Firebase auth hook

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const AdminProfile = () => {
  const [tagName, setTagName] = useState("");
  const { user } = useAuth(); // Firebase user

  // ✅ Fetch stats with token
  const fetchStats = async () => {
    if (!user) return null;

    const token = await user.getIdToken(); // get Firebase ID token
    const res = await axios.get("https://fourm-server.vercel.app/admin/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };

  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: fetchStats,
    enabled: !!user, // only run if user exists
  });

  // ✅ Add Tag
  const handleAddTag = async (e) => {
    e.preventDefault();
    if (!tagName) return;
    try {
      const token = await user.getIdToken();
      await axios.post(
        "https://fourm-server.vercel.app/tags",
        { name: tagName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire("Success!", "New Tag Added", "success");
      setTagName("");
    } catch (error) {
      Swal.fire("Error", "Could not add tag", error.message);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!stats) return <p>No data available</p>;

  const chartData = [
    { name: "Posts", value: stats.posts || 0 },
    { name: "Comments", value: stats.comments || 0 },
    { name: "Users", value: stats.users || 0 },
  ];

  const admin = stats.admin || {};

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>

      {/* Admin Info */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={admin.image || "https://via.placeholder.com/80?text=Admin"}
          alt={admin.name || "Admin"}
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h3 className="text-xl font-semibold">{admin.name || "Admin"}</h3>
          <p>{admin.email || "admin@example.com"}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Site Statistics</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Add Tag Form */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Add New Tag</h3>
        <form onSubmit={handleAddTag} className="flex gap-2">
          <input
            type="text"
            placeholder="Enter tag name"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
