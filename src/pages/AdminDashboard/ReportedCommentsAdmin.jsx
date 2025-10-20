import React, { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const ReportedCommentsAdmin = () => {
  const { darkMode } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Fetch reported comments
  const { data, isLoading } = useQuery({
    queryKey: ["reportedComments"],
    queryFn: async () => {
      const res = await axios.get("https://fourm-server.vercel.app/reports");
      return res.data;
    },
  });

  // Remove duplicate reports based on commentId
  const uniqueReports = React.useMemo(() => {
    const map = new Map();
    data?.forEach((report) => {
      if (!map.has(report.commentId)) {
        map.set(report.commentId, report);
      }
    });
    return Array.from(map.values());
  }, [data]);

  // Admin deletes comment
  const handleDeleteComment = async (commentId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This comment will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        // Use the actual comment _id instead of report._id if needed
        await axios.delete(
          `https://fourm-server.vercel.app/comments/${commentId}`
        );

        // Refresh caches
        queryClient.invalidateQueries(["reportedComments"]);
        queryClient.invalidateQueries({ queryKey: ["post"] });

        Swal.fire("Deleted!", "Comment has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error!", "Failed to delete comment.", err);
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div
      className={`max-w-6xl mx-auto p-6  rounded shadow ${
        darkMode
          ? " bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-lg rounded-lg"
          : "bg-base-100 text-gray-700"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">Reported Comments</h2>
      {uniqueReports.length === 0 ? (
        <p>No reported comments.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full min-w-[700px]">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Commenter Email</th>
                <th>Comment Text</th>
                <th>Feedback</th>
                <th>Post ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {uniqueReports.map((report) => (
                <tr key={report._id}>
                  <td>{report.userName || "-"}</td>
                  <td>{report.reportedBy}</td>
                  <td>{report.commentText}</td>
                  <td>{report.feedback}</td>
                  <td>{report.postId}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteComment(report.commentId)}
                      className="btn btn-sm btn-error flex items-center gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReportedCommentsAdmin;
