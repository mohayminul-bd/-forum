import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Swal from "sweetalert2";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const AdminProfile = () => {
  const [tagName, setTagName] = useState("");

  // ✅ Fetch stats
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axios.get(
        "https://fourm-server.vercel.app/admin/stats"
      );
      return res.data;
    },
  });

  // ✅ Add Tag
  const handleAddTag = async (e) => {
    e.preventDefault();
    if (!tagName) return;
    try {
      await axios.post("https://fourm-server.vercel.app/tags", {
        name: tagName,
      });
      Swal.fire("Success!", "New Tag Added", "success");
      setTagName("");
    } catch (error) {
      Swal.fire("Error", "Could not add tag", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  const chartData = [
    { name: "Posts", value: stats.posts },
    { name: "Comments", value: stats.comments },
    { name: "Users", value: stats.users },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>

      {/* Admin Info */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={stats.admin?.image || "https://via.placeholder.com/80"}
          alt="Admin"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h3 className="text-xl font-semibold">{stats.admin?.name}</h3>
          <p>{stats.admin?.email}</p>
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
